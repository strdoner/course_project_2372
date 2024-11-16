import React from 'react'
import { useState } from 'react'
import Button from './Button'
const ChartForm = () => {
    const [error, setError] = useState("")
    const [form, setForm] = useState({title:"", keyformatx:"", keyformaty:""})
    const onChartFormSubmit = (e) => {
        e.preventDefault()
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
            
            <h5>X key format</h5>
            <input 
                value={form.keyformatx}
                onChange={(event)=>{setForm({...form, title:event.target.value})}} 
                type="text" 
                placeholder='Enter X key format'
                required/>
            <div className='text-danger text-center'>{error}</div>

            <h5>Y key format</h5>
            <input 
                onChange={(event)=>{setForm({...form, title:event.target.value})}} 
                type="text" 
                placeholder='Enter Y key format'
                required/>
            <div className='text-danger text-center'>{error}</div>

            <h5>Something</h5>
            <input 
                onChange={(event)=>{setForm({...form, title:event.target.value})}} 
                type="text" 
                placeholder='Enter Password'
                required/>
            <div className='text-danger text-center'>{error}</div>
            <Button btnType={"violet"} type="submit">Create a chart</Button>        
        </form>
    )

}

export default ChartForm