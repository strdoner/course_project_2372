import React, {useContext, useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import Navbar from '../components/Navbar'
import Chart from '../components/Chart'
import { Context } from '../index'
import Button from '../components/Button'
import {Breadcrumb} from "react-bootstrap";

const ChartDetail = () => {
    const navigate = useNavigate()
    const [keys, setKeys] = useState({x_keys:[], y_keys:[]})
    const [error, setError] = useState({x_key:"", y_key:""})
    const params = useParams()
    const {store} = useContext(Context)
    const [chart, setChart] = useState({id:0, keys: {x:[], y:[]}})
    const [point, setPoint] = useState("")
    const [isChangesLoading, SetChangesLoading] = useState(false)
    const [isChanged, setIsChanged] = useState(false)
    const [extrapolatedValue, setExtrapolatedValue] = useState({x:"", y:""})
    useEffect(() => {
        const response = store.getChart(params.id);
        response.then(function(data) {
            console.log(data)
            setChart(data)
        })
    }, [store, params.id]);

    useEffect(() => {
        setKeys({x_keys: chart.keys.x, y_keys: chart.keys.y})
    }, [chart])

    const insert = (x, y, x_keys, y_keys) => {
        x_keys.push(Number(x));
        y_keys.push(Number(y));

        return sortingKeys(x_keys, y_keys);
    }

    const sortingKeys = (x_keys, y_keys) => {
        let pairs = x_keys.map((value, index) => {
            return [value, y_keys[index]];
        });

        // Сортировка по первому элементу каждой пары
        pairs.sort((a, b) => a[0] - b[0]);

        // Разделение обратно на массивы x и y
        return {x:pairs.map(pair => pair[0]), y:pairs.map(pair => pair[1])}

    }

    const addNewKey = (e) => {
        setError({x_key: "", y_key: ""})
        e.preventDefault()

        setIsChanged(true)
        if (keys.x_keys.length !== keys.y_keys.length) {
            setError({y_key: "", x_key:"The number of keys doesn't match!"})
            return
        }
        let x_keys = keys.x_keys.map(Number)
        let y_keys = keys.y_keys.map(Number)

        if (x_keys.some(isNaN)) {
            setError({y_key: "", x_key: "Incorrect input in x keys"})
            return
        }
        if (y_keys.some(isNaN)) {
            setError({x_key: "", y_key: "Incorrect input in y keys"})
            return
        }
        let tempKeys = sortingKeys(keys.x_keys.map(Number), keys.y_keys.map(Number))

        setChart({...chart, keys:{...tempKeys}})

    }

    const editChart = () => {
        SetChangesLoading(true)
        const response = store.editChart(chart.id, chart.keys)
        response.then(() => {
            SetChangesLoading(false)
            setIsChanged(false)
        })
    }

    const findPointIndex = (point) => {
        let index = chart.keys.x.findIndex(x => x === point);
        if (index !== -1) return index; // Точка уже существует

        if (point < chart.keys.x[0]) return -1; // Перед первой точкой
        if (point > chart.keys.x[chart.keys.x.length - 1]) return chart.keys.x.length; // За последней точкой

        for (let i = 0; i < chart.keys.x.length - 1; i++) {
            if (point > chart.keys.x[i] && point < chart.keys.x[i + 1]) {
                return i; // Между двумя точками
            }
        }
        return -2;
    };

    const extrapolateOrInterpolate = (point, index) => {
        let newPoint;

        if (index === -1) {
            // Экстраполяция перед первой точкой
            const [x1, y1] = [chart.keys.x[0], chart.keys.y[0]];
            const [x2, y2] = [chart.keys.x[1], chart.keys.y[1]];
            newPoint = y1 + ((point - x1) * (y2 - y1)) / (x2 - x1);
        } else if (index === chart.keys.x.length) {
            // Экстраполяция за последней точкой
            const [x1, y1] = [chart.keys.x[index - 2], chart.keys.y[index - 2]];
            const [x2, y2] = [chart.keys.x[index - 1], chart.keys.y[index - 1]];
            newPoint = y2 + ((point - x2) * (y2 - y1)) / (x2 - x1);
        } else {
            // Интерполяция между точками
            const [x1, y1] = [chart.keys.x[index], chart.keys.y[index]];
            const [x2, y2] = [chart.keys.x[index + 1], chart.keys.y[index + 1]];
            newPoint = y1 + ((point - x1) * (y2 - y1)) / (x2 - x1);
        }
        newPoint = Number(newPoint.toFixed(2))
        setChart({ ...chart, keys: insert(point, newPoint, chart.keys.x, chart.keys.y) });
        return newPoint
    };

    const pointHandler = () => {
        const parsedPoint = Number(point);
        if (isNaN(parsedPoint)) {
            //alert("Invalid input. Please enter a valid number.");
            return;
        }

        const index = findPointIndex(parsedPoint);

        if (index >= 0 && chart.keys.x[index] === parsedPoint) {
            setExtrapolatedValue({x:parsedPoint, y:chart.keys.x[index]})
            return
        }

        const newPoint = extrapolateOrInterpolate(parsedPoint, index);
        setExtrapolatedValue({x:parsedPoint, y:newPoint})
    };

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
                    <Breadcrumb style={{padding:"10px"}}>
                        <Breadcrumb.Item onClick={() => {navigate(`/`)}}>
                            Dashboard
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{chart.title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Chart keys={chart.keys} index={chart.id} hidePoints={0}/>
                    <div className="card-body">
                        <h4 className="card-title">{chart.title}</h4>
                        <div className="card-text align-content-center">
                            <div className=' form-floating min-h'>
                                <input
                                    id='x_key'
                                    className={`short__form_item form-control ${error.y_key !== "" ? "is-invalid" : ""}`}
                                    onChange={(event) => setPoint(event.target.value)}
                                    value={point}
                                    type="number"

                                    placeholder='x_key'
                                    required
                                />
                                <label htmlFor="x_key">Enter x key</label>
                            </div>

                            <Button btnType="violet" onClick={pointHandler}>extrapolate</Button>
                            <div className="d-flex">
                                {extrapolatedValue.x !== "" ? <h5 style={{height:"min-content", alignSelf:"center", margin:"0 20px"}}>X: {extrapolatedValue.x} Y: {Number(extrapolatedValue.y.toFixed(2))}</h5>: <></>}
                            </div>
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
                        {isChanged ? <p className="text-danger">The changes have not been saved!</p> : <></>}
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
                                        
                                        <textarea
                                            id='y_min'
                                            className={`short__form_item form-control ${error.x_key !== "" ? "is-invalid" : ""}`} 
                                            onChange={(event)=>{setKeys({...keys, x_keys:event.target.value.split(`\n`)})}}
                                            value={keys.x_keys.join(`\n`)}
                                            style={{minHeight:"300px"}}

                                            placeholder='x_key'
                                            required/>
                                        <label htmlFor="x_key">Enter x keys</label>
                                        
                                    </div>
                                    <div className=' form-floating min-h'>
                                        
                                        <textarea
                                            id='y_max' 
                                            className={`short__form_item form-control ${error.y_key !== "" ? "is-invalid" : ""}`}
                                            onChange={(event)=>{setKeys({...keys, y_keys:[...event.target.value.split(`\n`)]})}}
                                            value={keys.y_keys.join(`\n`)}
                                            style={{minHeight:"300px"}}

                                            placeholder='y_key'
                                            required/>
                                        <label htmlFor="y_key">Enter y keys</label>
                                        
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