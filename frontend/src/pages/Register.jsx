import React from 'react'
import UserForm from '../components/UserForm'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        
        <div className='main d-flex justify-content-center align-items-center'>
            <div className='header w-100 d-flex justify-content-between p-4'>
                <h1>Griph</h1>
                <div className='btn-group'>
                    <Link to="/login" className="btn btn-outline-primary" style={{padding:'12px', height:'min-content'}}><h5 className='m-0' style={{height:'min-content'}}>Log In</h5></Link>
                    <Link to="/register" className="btn btn-primary" style={{padding:'12px', height:'min-content'}}><h5 className='m-0' style={{height:'min-content'}}>Sign Up</h5></Link>
                </div>
            </div>
            <div className='login__block bg-light'>
                <h3 className='text-center p-3'>Sign up</h3>
                <UserForm formType={"register"}/>
                <p className='text__help'>Already have an account? <Link to="/login">Log In</Link></p>
            </div>
        </div>
        
    )
}

export default Register;