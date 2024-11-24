import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index.js'
import { useNavigate } from 'react-router-dom';
import Chartitem from '../components/Chartitem';
import Button from '../components/Button';
import NewChartitem from '../components/NewChartItem';
import LoadChartForm from '../components/LoadChartForm'
import { jwtDecode } from 'jwt-decode';
import {observer} from 'mobx-react-lite'
import ChartsList from '../components/ChartsList.jsx';


function Dashboard() {
    const {store} = useContext(Context)
    const navigate = useNavigate();
    
    


    return (
        
        <div>
            <div className='text-center p-4 border-bottom'>
                <div className='d-flex justify-content-between'>
                    <h5>
                        Some dashboard name
                    </h5>
                    <div className='d-flex align-content-center'>
                        <h5 className='nav__username'>
                            {store.username}
                        </h5>
                        <a onClick={() => store.logoutUser()} className='text-danger'>logout</a>
                    </div>
                </div>
                
            </div>

            <ChartsList />
        </div>


        
    )
}

export default observer(Dashboard);