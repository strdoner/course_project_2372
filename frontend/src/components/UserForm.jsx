import React, { isValidElement, useState, useContext } from 'react'
import Button from './Button'
import { loginUser, refreshToken } from '../api/auth.js'
import { UserContext } from '../contexts/userContext.js'
import { useNavigate } from "react-router-dom"

const UserForm = ({formType}) => {
        if (formType === "login") {
            return <LoginForm />
        }
        return <RegisterForm />
}




function LoginForm () {
    const navigate = useNavigate();
    const {user, setUser, isUserLoggedIn, accessToken, setAccessToken} = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    
    
    const onLoginFormSubmit = (e) => {
        e.preventDefault();
        if (!isValidForm()) {
            return
        }
        loginUser(username, password).then((data) => {
            setUser({username:username})
            setAccessToken(data.access)
            navigate('/')


        }).catch((error)=> {
            if (error.status === 401) {
                setError("Incorrect login or password!")
            }
        })
        
            
    }

    const isValidForm = () => {
        setError("")
        if (username === "" || password === ""){
          setError("username and password can't be empty")
          return false;
        }
        return true;
      }



    
    return (
        <form onSubmit={onLoginFormSubmit} method="POST">
            <h1>{accessToken}</h1>
            <h5>Username</h5>
            <input 
                onChange={(event)=>{setUsername(event.target.value)}} 
                type="text" 
                placeholder='Enter Username'
            />
            
            <h5>Password</h5>
            <input 
                onChange={(event)=>{setPassword(event.target.value)}} 
                type="password" 
                placeholder='Enter Password'
            />
            <div className='text-danger text-center'>{error}</div>
            <Button btnType={"primary"} type="submit">Login</Button>        
        </form>
    )
}

function RegisterForm(){
    return (
        <form method="POST">
            <h5>Username</h5>
            <input type="text" placeholder='Enter Username'/>
            <h5>Email</h5>
            <input type="email" placeholder='Enter Email'/>
            <h5>Password</h5>
            <input type="password" placeholder='Enter Password'/>
            <h5>Repeat Password</h5>
            <input type="password" placeholder='Repeat Password'/>
            <Button btnType={"primary"}>Register</Button>   
        </form>
    )
}

export default UserForm