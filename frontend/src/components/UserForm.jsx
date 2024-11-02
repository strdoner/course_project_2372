import React from 'react'
import Button from './Button'

const UserForm = ({formType}) => {
    if (formType === "login") {
        return <LoginForm />
    }
    return <RegisterForm />
}

const LoginForm = () => {
    return (
        <form action="POST">
            <h5>Username</h5>
            <input type="text" placeholder='Enter Username'/>
            <h5>Email</h5>
            <input type="email" placeholder='Enter Email'/>
            <h5>Password</h5>
            <input type="password" placeholder='Enter Password'/>
            <Button btnType={"primary"}>Login</Button>        
        </form>
    )
}

const RegisterForm = () => {
    return (
        <form action="POST">
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