import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import Navbar from '../components/Navbar'
import Chart from '../components/Chart'
import { Context } from '../index'
import Button from '../components/Button'

const ChartDetail = () => {
    const [keys, setKeys] = useState({x_key:"", y_key:""})
    const [error, setError] = useState({x_key:"", y_key:""})
    const params = useParams()
    const {store} = useContext(Context)
    const [chart, setChart] = useState({id:0, keys:0})
    const [point, setPoint] = useState("")
    const [isChangesLoading, SetChangesLoading] = useState(false)

    useEffect(() => {
        const response = store.getChart(params.id);
        response.then(function(data) {
            console.log(data)
            setChart(data)
        })
    }, []);

    const insert = (x, y, x_keys, y_keys, index=-1) => {
        if (index === -1) {
            index = findPoint(x);

            if (index === -1) {
                index++
            }

        }
        if (x === x_keys[index]) {
            y_keys[index] = y;
        }
        else {
            x_keys.splice(index,0,x);
            y_keys.splice(index,0,y);
        }

        return {x:x_keys, y:y_keys};
    }

    const addNewKey = (e) => {
        e.preventDefault()
        setChart({...chart, keys:insert(keys.x_key, keys.y_key, chart.keys.x, chart.keys.y)})
    }

    const editChart = () => {
        SetChangesLoading(true)
        const response = store.editChart(chart.id, chart.keys)
        response.then((e) => {
            SetChangesLoading(false)
        })
    }

    const findPoint = (point) => {
        let dist = Math.abs(chart.keys.x[0] - point)
        let found_index = chart.keys.x.length
        for (let i = 0; i < chart.keys.x.length; i++) {
            if (point < chart.keys.x[i]) {
                found_index = i - 1
                break
            }
        }
        return found_index
    }

    const extrapolation = (x, y, x1, y1) => {

        console.log(y1 + ((point - x1)/(x - x1)) * (y - y1))
        return y1 + ((point - x1)/(x - x1)) * (y - y1)
    }


    const pointHandler = () => {
        let index = findPoint(point);
        if (index === chart.keys.x.length) {
            let newPoint = extrapolation(chart.keys.x[index-1], chart.keys.y[index-1], chart.keys.x[index-2], chart.keys.y[index-2])
            setChart({...chart, keys:insert(point, newPoint, chart.keys.x, chart.keys.y, index)})
        }
        else if (index === -1) {
            let newPoint = extrapolation(chart.keys.x[index+2], chart.keys.y[index+2], chart.keys.x[index+1], chart.keys.y[index+1])
            setChart({...chart, keys:insert(point, newPoint, chart.keys.x, chart.keys.y, index+1)})
        }
        else {
            let newPoint = extrapolation(chart.keys.x[index+1], chart.keys.y[index+1], chart.keys.x[index], chart.keys.y[index])
            setChart({...chart, keys:insert(point, newPoint, chart.keys.x, chart.keys.y, index+1)})
        }

    }

    if (store.isLoading) {
        return (
            <>
                <Navbar />
                <div className='charts' style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
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
                    <Chart keys={chart.keys} index={chart.id} hidePoints={0}/>
                    <div className="card-body">
                        <h4 className="card-title">{chart.title}</h4>
                        <div className="card-text">
                            <input
                                type="number"
                                onChange={(event) => setPoint(event.target.value)}
                                value={point}
                            />
                            <Button onClick={pointHandler}>extrapolate</Button>
                        </div>
                        <div className='d-flex'>
                            <Button btnType="warning" aria-hidden="true"  data-bs-toggle="modal" href="#form_details__modal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                            </svg>
                            </Button>
                            
                            <Button onClick={editChart} btnType="success" style={{marginLeft:"15px"}} isloading={isChangesLoading ? 1 : 0}>
                                Save changes
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id='form_details__modal' aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-fullscreen-md-down modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel">Edit a chart</h5>
                            <button type="button" className="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            <form onSubmit={addNewKey}>
                                <h5>Edit/Add a key</h5>
                                <div className='d-flex justify-content-around min-h'>
                                    <div className=' form-floating min-h'>
                                        
                                        <input
                                            id='y_min'
                                            className={`short__form_item form-control ${error.x_key !== "" ? "is-invalid" : ""}`} 
                                            onChange={(event)=>{setKeys({...keys, x_key:Number(event.target.value)})}} 
                                            
                                            type="number"
                                            step="0.01" 
                                            placeholder='x_key'
                                            required/>
                                        <label htmlFor="x_key">Enter x key</label>
                                        
                                    </div>
                                    <div className=' form-floating min-h'>
                                        
                                        <input
                                            id='y_max' 
                                            className={`short__form_item form-control ${error.y_key !== "" ? "is-invalid" : ""}`}
                                            onChange={(event)=>{setKeys({...keys, y_key:Number(event.target.value)})}} 
                                            
                                            type="number"
                                            step="0.01" 
                                            placeholder='y_key'
                                            required/>
                                        <label htmlFor="y_key">Enter y key</label>
                                        
                                    </div>

                                </div>
                                <div className='text-danger text-center'>
                                    <h6>{error.x_key}</h6>
                                    <h6>{error.y_key}</h6>
                                    
                                </div>
                                
                                <Button btnType={"violet"} style={{marginTop:"10px"}} isloading={0}>Add</Button>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(ChartDetail)