import React, { useContext, useEffect, useState, memo, useMemo } from 'react'
import { Context } from '../index.js'
import Chartitem from '../components/Chartitem';
import NewChartitem from '../components/NewChartItem';
import LoadChartForm from '../components/LoadChartForm'
import {observer} from 'mobx-react-lite'


const ChartsList = () => {
    const {store} = useContext(Context)
    const [charts, setCharts] = useState([])
    useEffect(() => {
        const response = store.getCharts();
        response.then(function(data) {
            setCharts(data)
            
            
        })
      }, []);

    if (store.isLoading) {
    return (
        <div className='charts'style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div className="spinner-grow text-muted"></div>
        </div>
    );
    }

    const createChart = (newChart) => {
        setCharts([newChart, ...charts])
    }

    const deleteChart = (chart) => {
        setCharts(charts.filter((el) => el.id !== chart.id))
        store.deleteChart(chart.id)
        .then((e) => {
            
        })
    }
    


    return (
            <div className='charts'>
            <LoadChartForm formId={'loadChartForm'} createChart={createChart}/>

                <div className='row justify-content-center'>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <NewChartitem />
                    </div>
                    {charts.map(chart => 
                        <div className='col-lg-4 col-md-6 col-12' key={chart.id}>
                            <Chartitem chart={chart} deleteChart={deleteChart} key={chart.id}/>
                        </div>
                    )}
                    
                    

                </div>
            </div>
    
    )
}

export default observer(ChartsList);