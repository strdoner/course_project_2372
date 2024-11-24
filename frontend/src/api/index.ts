import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'


let $api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 5000,
    headers: {
      
    }
})
$api.defaults.withCredentials = true

$api.interceptors.request.use((config) => {
    if (localStorage.getItem('access_token') !== null) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
        return config
    }
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (er) => {
    const originalRequest = er.config;
    if (er.response.status == 401 && er.config && !er.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await $api.post<AuthResponse>('http://127.0.0.1:8000/api/auth/token/refresh/', {withCredentials: true})
            localStorage.setItem('token_access', response.data.access)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('not logged in')
        }
    }
    throw er
})

export default $api;


