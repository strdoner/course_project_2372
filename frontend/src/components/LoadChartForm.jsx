import React from 'react'
import ChartForm from './ChartForm'


const LoadChartForm = ({formId, createChart, updateChartsList, toastHandler}) => {
    
    return (
        <div>
            <div className="modal fade" id={formId} aria-hidden="true" aria-labelledby={`${formId}_label`} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-fullscreen-md-down modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`${formId}_label`}>Create a new chart</h5>
                            <button type="button" className="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            <ChartForm formId={formId} createChart={createChart} updateChartsList={updateChartsList} toastHandler={toastHandler}/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadChartForm
