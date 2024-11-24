import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index.js'
import Chartitem from '../components/Chartitem';
import NewChartitem from '../components/NewChartItem';
import LoadChartForm from '../components/LoadChartForm'
import {observer} from 'mobx-react-lite'


const ChartsList = () => {
    const {store} = useContext(Context)
    const [charts, setCharts] = useState([
        {id:1, title:"hello"},
        {id:2, title:"world"},
        {id:3, title:"1234"},
    ])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const response = store.getCharts();
        response.then(function(data) {
            setCharts(data)
            setIsLoading(false);
            
        })
      }, []);

    if (isLoading) {
    return (
        <div className='charts'style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div className="spinner-grow text-muted"></div>
        </div>
    );
    }
    


    return (
            <div className='charts'>
            <LoadChartForm formId={'loadChartForm'}/>

                <div className='row justify-content-center'>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <NewChartitem />
                    </div>
                    {charts.map(chart => 
                        <div className='col-lg-4 col-md-6 col-12' key={chart.id}>
                            <Chartitem chart={chart}/>
                        </div>
                    )}
                    
                    

                </div>
            </div>
    
    )
}

export default observer(ChartsList);