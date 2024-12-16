import React, {useState, useContext } from 'react'
import Button from './Button'
import { useNavigate, Navigate } from "react-router-dom"
import { Context } from '../index.js'
import {observer} from 'mobx-react-lite'


const UserForm = ({formType}) => {
    const {store} = useContext(Context)
        if (store.isAuth) {
            return <Navigate to={'/'} />
        }

        if (formType === "login") {
            return <LoginForm />
        }

        return <RegisterForm />
}




function LoginForm () {
    const navigate = useNavigate();
    const {store} = useContext(Context)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isAuthLoading, setIsAuthLoading] = useState(false)
    
    
    const onLoginFormSubmit = (e) => {
        setIsAuthLoading(true)
        e.preventDefault();
        if (!isValidLoginForm()) {
            return
        }
        
        const response = store.loginUser(username, password)
        response.then(function(er) {
            setIsAuthLoading(false)
            if (er !== undefined) {
                setError("Incorrect username or password")
            }
            else {
                navigate('/')   
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
            <div className='text-danger text-center m-2'>{error}</div>
            <Button btnType={"violet"} type="submit" isloading={isAuthLoading ? 1 : 0}>Login</Button>        
        </form>
    )
}

function RegisterForm(){
    const navigate = useNavigate();
    const {store} = useContext(Context)
    const initialState = {username:'', email:'', password:'', password2:''};
    const [form, setForm] = useState({username:'', email:'', password:'', password2:''})
    const [error, setError] = useState(initialState)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const onRegisterFormSubmit = (e) => {
        setIsRegisterLoading(true)
        e.preventDefault();
        
        if (!isValidRegisterForm()) {
            return
        }

        const response = store.registerUser(form.username, form.email, form.password, form.password2)
        response.then(function(er) {
            setIsRegisterLoading(false)
            if (er !== undefined) {
                if (er.username !== undefined) {
                    setError({...error, username:er.username})
                }
                if (er.email !== undefined) {
                    setError({...error, email:er.email})
                }
            }
            else {
                navigate('/')   
            }
        })
          
        
    }

    const isValidRegisterForm = () => {
        
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
            <div className='text-danger text-center m-2'>{error.password2}</div>

            <Button btnType={"violet"} onClick={e => setError(initialState)} isloading={isRegisterLoading ? 1 : 0}>Register</Button>   
        </form>
    )
}

export default observer(UserForm)