import {Navigate, Outlet, Route} from "react-router-dom"

import {observer} from "mobx-react-lite"
import { useContext } from "react"
import { Context } from "../index.js"

const PrivateRoute = (props) => {
    const {store} = useContext(Context)
    
    if (store.isAuthLoading) {
        return (
            <div className='charts'style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <div className="spinner-grow text-muted"></div>
            </div>
        )
    }

    if (store.isAuth) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}

export default observer(PrivateRoute)