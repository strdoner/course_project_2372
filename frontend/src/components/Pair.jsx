import React from 'react'
import {observer} from 'mobx-react-lite'
const Pair = ({pair, index, handleChange}) => {
    return (
        <div className='d-flex justify-content-around'>
            <div className=' form-floating min-h'>
                
                <input
                    id={`x_pair_${index}`}
                    value={pair.x}
                    className={`short__form_item form-control`} 
                    onChange={(event)=>{handleChange(index, event.target.value, "x")}} 
                    type="number"
                    step="0.01" 
                    placeholder='min'
                    required/>
                <label htmlFor={`x_pair_${index}`}>X value</label>
                
            </div>
            <div className=' form-floating min-h'>
                
                <input
                    id={`y_pair_${index}`}
                    value={pair.y}
                    className={`short__form_item form-control`} 
                    onChange={(event)=>{handleChange(index, event.target.value, "y")}} 
                    type="number"
                    step="0.01" 
                    placeholder='max'
                    required/>
                <label htmlFor={`y_pair_${index}`}>Y value</label>
                
            </div>
        </div>
    )
}


export default observer(Pair)