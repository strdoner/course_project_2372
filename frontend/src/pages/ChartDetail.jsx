import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import Navbar from '../components/Navbar'
import Chart from '../components/Chart'
import { Context } from '../index'

const ChartDetail = () => {
    const params = useParams()
    const {store} = useContext(Context)
    const [chart, setChart] = useState({id:0, keys:0})
    useEffect(() => {
        const response = store.getChart(params.id);
        response.then(function(data) {
            console.log(data)
            setChart(data)
            
        })
      }, []);

    if (store.isLoading) {
        return (
            <>
                <Navbar />
                <div className='charts'style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <div className="spinner-grow text-muted"></div>
                </div>
            </>
        )
    }
    return (
        <>
            <Navbar />
            <div className='container'>
                <div className="card m-2">
                    <Chart keys={chart.keys} index={chart.id}/>
                    <div className="card-body">
                        <h4 className="card-title">{chart.title}</h4>
                        <p className="card-text">Some example text.</p>
                        <a href="#" className="btn btn-primary">Save changes</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(ChartDetail)