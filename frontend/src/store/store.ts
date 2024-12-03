import { makeAutoObservable } from "mobx"
import $api from "../api/index.ts"
import AuthService from "../services/AuthService.ts";
import { jwtDecode } from "jwt-decode";
import { JwtResponse } from "../models/response/JwtResponse.ts";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse.ts";
import UserService from "../services/UserService.ts";



export default class Store {
    username = "";
    isAuth = false;
    isLoading = false;
    isAuthLoading = true;
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(username:string) {
        this.username = username;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setAuthLoading(bool: boolean) {
        this.isAuthLoading = bool;
    }

    async loginUser(username:string, password:string) {
        this.isLoading = true;
        try {
            const response = await AuthService.loginUser(username, password)
            localStorage.setItem('access_token', response.data.access)
            this.setAuth(true)
            const decoded = jwtDecode<JwtResponse>(response.data.access).username
            this.setUser(decoded)
        } catch (e) {
            return e?.response?.data;
        } finally {
            this.isLoading = false;
        }
    }

    async registerUser(username:string, email:string, password:string, password2:string) {
        
        try {
            const response = await AuthService.registerUser(username, email, password, password2)
            await this.loginUser(username, password)
            
        } catch (e) {
            return e?.response?.data
        }

    }

    async logoutUser() {
        try {
            const response = await AuthService.logoutUser()
            localStorage.removeItem('access_token')
            this.setAuth(false)
            this.setUser("")
        } catch (e) {
            console.log(e)
        }
    }

    async checkAuth() {
        this.setAuthLoading(true)
        try {
            axios.defaults.withCredentials = true
            const response = await axios.post<AuthResponse>('http://127.0.0.1:8000/api/auth/token/refresh/', {withCredentials: true})
            
            localStorage.setItem('access_token', response.data.access)
            this.setAuth(true)
            const decoded = jwtDecode<JwtResponse>(response.data.access).username
            this.setUser(decoded)
        } catch (e) {
            console.log(e)

        } finally {
            this.setAuthLoading(false);
            console.log("loaded")
        }
    }

    async getCharts() {
        this.setLoading(true);
        try {
            const response = await UserService.getCharts()
            return response.data
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false);
        }
    }

    async postChart(title:string, min_x:number, min_y:number, max_x:number, max_y:number, data:object) {
        try {
            const response = await UserService.postChart(title, min_x, min_y, max_x, max_y, data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async deleteChart(id:number) {
        try {
            const response = await UserService.deleteChart(id)
            
        } catch (e) {
            console.log(e)
        }
    }

    async getChart(id:number) {
        this.setLoading(true)
        try {
            const response = await UserService.getChart(id)
            return response.data
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false);
        }
    }

    async editChart(id:number, data:object) {      
        try {
            const response = await UserService.editChart(id, data);
            return response
        } catch (e) {
            console.log(e);

        }
    }
}
