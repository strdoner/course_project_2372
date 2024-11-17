import axios from 'axios'


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

export default $api;


