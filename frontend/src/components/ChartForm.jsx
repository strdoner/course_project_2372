import React, { useContext } from 'react'
import { useState } from 'react'
import Button from './Button'
import { Context } from '../index.js'

const ChartForm = ({formId, createChart, ...props}) => {
    const [error, setError] = useState("")
    const [form, setForm] = useState({title:"", min_x:"", min_y:"", max_x:"", max_y:""})
    const {store} = useContext(Context)
    
    const onChartFormSubmit = (e) => {
        e.preventDefault()
        const response = store.postChart(form.title, form.min_x, form.min_y, form.max_x, form.max_y)
        response.then((data) => {
            document.querySelector(`#${formId} .close`).click()
            createChart({id:data.id, title:data.title})
            
        })
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
            
            <h5>X min value</h5>
            <input 
                value={form.keyformatx}
                onChange={(event)=>{setForm({...form, min_x:event.target.value})}} 
                type="text" 
                placeholder='Enter X min value'
                required/>

            <h5>Y min value</h5>
            <input 
                onChange={(event)=>{setForm({...form, min_y:event.target.value})}} 
                type="text" 
                placeholder='Enter Y min value'
                required/>

            <h5>X max value</h5>
            <input 
                onChange={(event)=>{setForm({...form, max_x:event.target.value})}} 
                type="text" 
                placeholder='Enter X max value'
                required/>

            <h5>Y max value</h5>
            <input 
                onChange={(event)=>{setForm({...form, max_y:event.target.value})}} 
                type="text" 
                placeholder='Enter Y max value'
                required/>
            <div className='text-danger text-center'>{error}</div>

            <Button btnType={"violet"} type="submit">Create a chart</Button>        
        </form>
    )

}

export default ChartForm