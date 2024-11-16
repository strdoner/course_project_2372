import axios from 'axios'


let tokenRequest = axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 5000,
    headers: {
      
    }
})

tokenRequest.defaults.withCredentials = true

const loginUser = (username, password) => {
    const requestBody = {username:username, password:password}

    return tokenRequest.post("/api/token/", requestBody)
        .then((response)=> {
            
            window.localStorage.setItem('access_token', response.data.access)
            return Promise.resolve(response.data);
        }).catch((er) => {
            return Promise.reject(er)
        })
}

const logoutUser = () => {
    tokenRequest.post("api/logout/")
        .then((response) => {
            window.localStorage.removeItem('access_token');
            return Promise.resolve(response.data);
        }).catch((er) => {
            console.log(er)
            return Promise.reject(er)
        })
}

const refreshToken = () => {
    tokenRequest.post("/api/token/refresh/")
        .then((response) => {
            window.localStorage.setItem('access_token', response.data.access)
            return true
        }).catch((er) => {
            return false
        })
}

const registerUser = (username, email, password, password2) => {
    const requestBody = {username:username, email:email, password:password, password2:password2}
    return tokenRequest.post("/api/register/", requestBody)
        .then((response) => {
            return loginUser(username, password)
        }).catch((er) => {
            return Promise.reject(er)
        })
}

export {loginUser, logoutUser, refreshToken, registerUser}