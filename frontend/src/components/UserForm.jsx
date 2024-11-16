import React, { isValidElement, useState, useContext } from 'react'
import Button from './Button'
import { loginUser, registerUser, refreshToken } from '../api/auth.js'
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
    const {user, setUser, isUserLoggedIn} = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    
    
    const onLoginFormSubmit = (e) => {
        e.preventDefault();
        if (!isValidLoginForm()) {
            return
        }
        loginUser(username, password).then((data) => {
            setUser({username:username})
            navigate('/')


        }).catch((error)=> {
            if (error.status === 401) {
                setError("Incorrect login or password!")
            }
        })      
    }

    

    const isValidLoginForm = () => {
        setError("")
        if (username === "" || password === ""){
            setError("username and password can't be empty")
            return false;
        }
        return true;
    }



    
    return (
        <form onSubmit={onLoginFormSubmit} method="POST">   

            <h5>Username</h5>
            <input 
                onChange={(event)=>{setUsername(event.target.value)}} 
                type="text" 
                placeholder='Enter Username'
                required/>
            
            <h5>Password</h5>
            <input 
                onChange={(event)=>{setPassword(event.target.value)}} 
                type="password" 
                placeholder='Enter Password'
                required/>
            <div className='text-danger text-center'>{error}</div>
            <Button btnType={"violet"} type="submit">Login</Button>        
        </form>
    )
}

function RegisterForm(){
    const navigate = useNavigate();
    const {user, setUser, isUserLoggedIn} = useContext(UserContext)
    const [form, setForm] = useState({username:'', email:'', password:'', password2:''})
    const [error, setError] = useState({username:'', email:'', password:'', password2:''})

    const onRegisterFormSubmit = (e) => {
        e.preventDefault();
        
        if (!isValidRegisterForm()) {
            return
        }

        registerUser(form.username, form.email, form.password, form.password2).then((data) => {
            setUser({username:form.username})
            navigate('/')
        }).catch((error)=> {
            if (error.response.data["username"] !== undefined) {
                setError({...error, username:error.response.data["username"]})
            }
        })    
        
    }

    const isValidRegisterForm = () => {
        setError({username:'', email:'', password:'', password2:''})
        if (form.password !== form.password2){
            setError({...error, password2:"Passwords don`t match"})
            return false;
        }
        
        return true;
    }

    return (
        <form onSubmit={onRegisterFormSubmit} method="POST">
            <h5>Username</h5>
            <input
                value={form.username} 
                type="text" 
                placeholder='Enter Username' 
                required
                onChange={e => setForm({...form, username: e.target.value})}
            />
            <div className='text-danger text-center'>{error.username}</div>

            <h5>Email</h5>
            <input
                value={form.email}
                type="email" 
                placeholder='Enter Email' 
                required
                onChange={e => setForm({...form, email: e.target.value})}
            />
            <div className='text-danger text-center'>{error.email}</div>

            <h5>Password</h5>
            <input
                value={form.password} 
                type="password" 
                placeholder='Enter Password' 
                required
                onChange={e => setForm({...form, password: e.target.value})} 
            />
            <div className='text-danger text-center'>{error.password}</div>

            <h5>Repeat Password</h5>
            <input
                value={form.password2} 
                type="password" 
                placeholder='Repeat Password' 
                required
                onChange={e => setForm({...form, password2: e.target.value})}
            />
            <div className='text-danger text-center'>{error.password2}</div>

            <Button btnType={"violet"}>Register</Button>   
        </form>
    )
}

export default UserForm