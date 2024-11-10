import React from 'react'

const Button = ({children, btnType, ...props}) => {
    return (
        <button {...props} className={`btn btn-${btnType}`}>
            <h5>{children}</h5>
        </button>
    )
}

export default Button