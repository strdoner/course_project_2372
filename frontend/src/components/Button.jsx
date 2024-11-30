import React, { useContext } from 'react'
import { Context } from '..'
import {observer} from 'mobx-react-lite'


const Button = ({children, btnType, ...props}) => {
    const {store} = useContext(Context)
    
    if (store.isLoading) {
        return (
            <button {...props} className={`btn btn-${btnType} disabled d-flex justify-content-center`}>
                <h5>{children}</h5>
                <h5 style={{paddingLeft:"10px"}}><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></h5> 
            </button>
        )
    }
    else {
        return (
            <button {...props} className={`btn btn-${btnType}`}>
                <h5>{children}</h5>
            </button>
        )
    }
}

export default observer(Button)