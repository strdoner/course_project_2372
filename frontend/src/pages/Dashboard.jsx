import React, { useContext } from 'react'
import { UserContext } from '../contexts/userContext';
import { logoutUser, refreshToken } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import Chartitem from '../components/Chartitem';
import Button from '../components/Button';
import NewChartitem from '../components/NewChartItem';
import LoadChartForm from '../components/LoadChartForm'
function Dashboard() {
    const {user, setUser, isUserLoggedIn} = useContext(UserContext)
    const navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault()
        logoutUser()
        setUser(null)
        navigate('/login')
    }




    return (
        
        <div>
            <div className='text-center p-4 border-bottom'>
                <div className='d-flex justify-content-between'>
                    <h5>
                        Some dashboard name
                    </h5>
                    <div className='d-flex align-content-center'>
                        <h5>
                            {user.username}
                        </h5>
                        <a onClick={logout} className='text-danger'>logout</a>
                    </div>
                </div>
                
            </div>

            <div className='charts'>
            <LoadChartForm formId={'loadChartForm'}/>

                <div className='row'>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <NewChartitem />
                    </div>
                    
                    <div className='col-lg-4 col-md-6 col-12'>
                        <Chartitem />
                    </div>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <Chartitem />
                    </div>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <Chartitem />
                    </div>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <Chartitem />
                    </div>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <Chartitem />
                    </div>

                </div>
            </div>
        </div>


        
    )
}

export default Dashboard;