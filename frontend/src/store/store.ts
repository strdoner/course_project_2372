import { makeAutoObservable } from "mobx"
import $api from "../api/index.ts"
import AuthService from "../services/AuthService.ts";
import { jwtDecode } from "jwt-decode";
import { JwtResponse } from "../models/response/JwtResponse.ts";

import { AuthResponse } from "../models/response/AuthResponse.ts";



export default class Store {
    username = "";
    isAuth = false;
    isLoading = false;
    constructor() {
        makeAutoObservable(this)
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

    async loginUser(username:string, password:string) {
        try {
            const response = await AuthService.loginUser(username, password)
            localStorage.setItem('access_token', response.data.access)
            this.setAuth(true)
            const decoded = jwtDecode<JwtResponse>(response.data.access).username
            this.setUser(decoded)
        } catch (e) {
            return e?.response?.data
        }
    }

    async registerUser(username:string, email:string, password:string, password2:string) {
        try {
            const response = await AuthService.registerUser(username, email, password, password2)
            this.loginUser(username, password)
            
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
        this.setLoading(true)
        try {
            
            const response = await $api.post<AuthResponse>('http://127.0.0.1:8000/api/token/refresh/', {withCredentials: true})
            
            localStorage.setItem('access_token', response.data.access)
            this.setAuth(true)
            const decoded = jwtDecode<JwtResponse>(response.data.access).username
            this.setUser(decoded)
        } catch (e) {
            console.log(e)

        } finally {
            this.setLoading(false);
        }
    }
}