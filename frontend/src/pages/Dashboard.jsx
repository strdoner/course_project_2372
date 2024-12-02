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
import Navbar from '../components/Navbar.jsx';


function Dashboard() {
    const {store} = useContext(Context)
    const navigate = useNavigate();
    
    


    return (
        
        <div>
            <Navbar />

            <ChartsList />
        </div>


        
    )
}

export default observer(Dashboard);