import React from 'react'
import UserForm from '../components/UserForm'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import {observer} from 'mobx-react-lite'

const Login = () => {
    
    return (
        
        <div className='main d-flex justify-content-center align-items-center'>
            <div className='header w-100 d-flex justify-content-between p-4'>
                <h1>Griph</h1>
                <div className='btn-group'>
                <Link to="/login" className="btn btn-violet" style={{padding:'12px', height:'min-content'}}><h5 className='m-0' style={{height:'min-content'}}>Log In</h5></Link>
                    <Link to="/register" className="btn btn-outline-violet" style={{padding:'12px', height:'min-content'}}><h5 className='m-0' style={{height:'min-content'}}>Sign Up</h5></Link>
                </div>
            </div>
            <div className='login__block'>
                <h3 className='text-center p-3'>Log In</h3>
                <UserForm formType={"login"}/>
                <p className='text__help'>Don't have an account? <Link to="/register">Sign Up</Link></p>
            </div>
        </div>
        
    )
}

export default observer(Login);
