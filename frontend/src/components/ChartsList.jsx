import React, { useContext, useEffect, useState} from 'react'
import { Context } from '../index.js'
import Chartitem from '../components/Chartitem';
import NewChartitem from '../components/NewChartItem';
import LoadChartForm from '../components/LoadChartForm'
import {observer} from 'mobx-react-lite'
import {Toast} from 'react-bootstrap'


const ChartsList = () => {
    const {store} = useContext(Context)
    const [charts, setCharts] = useState([])
    const [failedToastShow, setFailedToastShow] = useState(false)
    const [successToastShow, setSuccessToastShow] = useState(false)
    const [toastText, setToastText] = useState("")
    useEffect(() => {
        updateChartsList()
      }, []);

    if (store.isLoading) {
    return (
        <div className='charts' style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div className="spinner-grow text-muted"></div>
        </div>
    );
    }

    const updateChartsList = () => {
        const response = store.getCharts();
        response.then(function(data) {
            setCharts(data)
        })
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

    const toastHandler = (type, text="") => {
        if (type === "FAILURE") {
            setToastText(text === "" ? "There was an unexpected error!" : text)
            setFailedToastShow(true)
        }
        else {
            setToastText(text === "" ? "File has been loaded successfully!" : text)
            setSuccessToastShow(true)
        }
    }
    


    return (
            <div className='charts'>
            <LoadChartForm formId={'loadChartForm'} createChart={createChart} updateChartsList={updateChartsList} toastHandler={toastHandler}/>
                <Toast onClose={() => setFailedToastShow(false)} show={failedToastShow} delay={5000} autohide className="toast__excel bg-danger text-light">

                    <Toast.Body><h5>{toastText}</h5></Toast.Body>
                </Toast>
                <Toast onClose={() => setSuccessToastShow(false)} show={successToastShow} delay={5000} autohide className="toast__excel bg-success text-light">

                    <Toast.Body><h5>{toastText}</h5></Toast.Body>
                </Toast>
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