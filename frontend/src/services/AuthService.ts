import $api from "../api/index.ts"
import { AxiosResponse } from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export default class AuthService {
    static async loginUser(username:string, password:string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('api/auth/token/', {username:username, password:password})
        .then(response => response)
    }

    static async registerUser(username:string, email:string, password:string, password2:string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('api/auth/register/', {username:username, email:email, password:password, password2:password2})
        .then(response => response)
    }

    static async logoutUser(): Promise<void> {
        return $api.post('api/auth/logout/')
        
    }
}

