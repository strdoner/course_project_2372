import React, { useContext } from 'react'
import { useState } from 'react'
import Button from './Button'
import { Context } from '../index.js'
import {observer} from 'mobx-react-lite'
import Pair from './Pair.jsx'

const ChartForm = ({formId, createChart, ...props}) => {
    const [error, setError] = useState({title:"", range_x:"", range_y:"", keys:""})
    const [form, setForm] = useState({title:"", min_x:0, min_y:0, max_x:0, max_y:0})
    const [pairs, setPairs] = useState([])
    const {store} = useContext(Context)
    
    const onChartFormSubmit = (e) => {
        
        e.preventDefault()
        let prev = pairs[0].x
        let data = {x:[], y:[]}
        for (let i = 0; i < pairs.length; i++) {
            let curr_x = Number(pairs[i].x)
            let curr_y = Number(pairs[i].y)

            if (curr_x > form.max_x || curr_x < form.min_x || curr_y < form.min_y || curr_y > form.max_y) {
                setError({...error, keys:"Incorect keys input"})
                return
            }
            if (curr_x < prev) {
                setError({...error, keys:"X key can`t be less than previous"})
                return
            }
            prev = curr_x
            data.x.push(curr_x)
            data.y.push(curr_y)
        }
        if (form.min_x > form.max_x) {
            setError({...error, range_x:"min x can`t be more then max x"})
            return
        }
        if (form.min_y > form.max_y) {
            setError({...error, range_y:"min y can`t be more then max y"})
            return
        }
        const response = store.postChart(form.title, form.min_x, form.min_y, form.max_x, form.max_y, data)
        response.then((data) => {
            
            document.querySelector(`#${formId} .close`).click()
            createChart(data)
            
        })

    }

    const addNewPair = () => {
        setPairs([...pairs, { x: '', y: '' }]);
        
    }
    const removePair = () => {
        let newPairs = pairs
        newPairs.pop()
        setPairs([...newPairs])
    }

    const handleChange = (index, newValue, key) => {
        
        let newPairs = pairs
        
        if (key === "x") {
            newPairs[index].x = newValue
        }
        else {
            newPairs[index].y = newValue
        }
        setPairs([...newPairs]);
    }

    return (
        <form onSubmit={onChartFormSubmit} method="POST" className='chart__form'>   
            <h5>Enter title</h5>
            <input 
                value={form.title}
                onChange={(event)=>{setForm({...form, title:event.target.value})}} 
                type="text" 
                placeholder='Enter chart name'
                required/>
            
            <div className='d-flex justify-content-around min-h'>
                <div className=' form-floating min-h'>
                    
                    <input
                        id='x_min'
                        className={`short__form_item form-control ${error.range_x !== "" ? "is-invalid" : ""}`} 
                        value={form.keyformatx}
                        onChange={(event)=>{setForm({...form, min_x:Number(event.target.value)})}} 
                        type="number"
                        step="0.01" 
                        placeholder='min'
                        required/>
                    <label htmlFor="x_min">X min value</label>
                </div>
                <div className=' form-floating min-h'>
                    
                    <input
                        id='x_max'
                        className={`short__form_item form-control ${error.range_x !== "" ? "is-invalid" : ""}`}  
                        onChange={(event)=>{setForm({...form, max_x:Number(event.target.value)})}} 
                        type="number"
                        step="0.01" 
                        placeholder='max'
                        required/>
                    <label htmlFor="x_max">X max value</label>
                </div>
            </div>
            <div className='d-flex justify-content-around min-h'>
                <div className=' form-floating min-h'>
                    
                    <input
                        id='y_min'
                        className={`short__form_item form-control ${error.range_y !== "" ? "is-invalid" : ""}`} 
                        onChange={(event)=>{setForm({...form, min_y:Number(event.target.value)})}} 
                        type="number"
                        step="0.01" 
                        placeholder='min'
                        required/>
                    <label htmlFor="y_min">Y min value</label>
                    
                </div>
                <div className=' form-floating min-h'>
                    
                    <input
                        id='y_max' 
                        className={`short__form_item form-control ${error.range_y != "" ? "is-invalid" : ""}`} 
                        onChange={(event)=>{setForm({...form, max_y:Number(event.target.value)})}} 
                        type="number"
                        step="0.01" 
                        placeholder='max'
                        required/>
                    <label htmlFor="y_max">Y max value</label>
                    
                </div>

            </div>
            
            <div className='manual_input__block'>
                {pairs.map((pair, index) => (
                    <Pair pair={pair} index={index} key={index} handleChange={handleChange}/>
                ))}
                <Button btnType={"outline-secondary"} onClick={addNewPair} type="button">
                    add new pair
                </Button>
                {pairs.length > 0 ?
                    <Button btnType={"outline-secondary"} onClick={removePair} type="button">
                        remove a pair
                    </Button>
                :
                <></>
                }
            </div>
            <p>or</p>

            <div className="input-group">
                <input className="form-control form-control-lg" id="formFileLg" type="file" />
            </div>
            <div className='text-danger text-center'>
                <h6>{error.range_x}</h6>
                <h6>{error.range_y}</h6>
                <h6>{error.title}</h6>
                <h6>{error.keys}</h6>
            </div>

            <Button btnType={"violet"} type="submit" onClick={e => setError({title:"", range_x:"", range_y:"", keys:""})}>Create a chart</Button>        
        </form>
    )

}

export default ChartForm