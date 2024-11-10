import React, { useContext } from 'react'
import { UserContext } from '../contexts/userContext';
import { logoutUser, refreshToken } from '../api/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const {user, setUser, isUserLoggedIn, accessToken, setAccessToken} = useContext(UserContext)
    const navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault()
        logoutUser()
        setUser(null)
        setAccessToken(null)
        navigate('/login')
    }

    


    return (
        <div>
            <h1>
                hello world its dashboard
            </h1>
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default Dashboard;