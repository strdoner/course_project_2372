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
            
            // window.localStorage.setItem('access_token', response.data.access)
            return Promise.resolve(response.data);
        }).catch((error) => {
            return Promise.reject(error)
        })
}

const logoutUser = () => {
    // window.localStorage.removeItem('access_token');
}

const refreshToken = () => {
    return tokenRequest.post("/api/token/refresh/")
        .then((response) => {
            return Promise.resolve(response.data);
        }).catch((error) => {
            console.log(error)
        })
}

export {loginUser, logoutUser, refreshToken}