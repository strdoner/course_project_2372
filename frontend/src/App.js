
import './styles/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Route, Routes, Navigate, useNavigate, BrowserRouter} from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'
import Register from './pages/Register'
import ChartDetail from './pages/ChartDetail'
import React, {useContext, useState, useEffect} from 'react';
import { Context } from './index.js';
import { observer } from 'mobx-react-lite'
import PrivateRoute from './components/PrivateRoute.jsx';



function App() {
  const {store} = useContext(Context)
  useEffect(() => {
      store.checkAuth()
      
  }, [])

  return ( 
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={<PrivateRoute />}>
          <Route path='' element={<Dashboard />} />           
          <Route path='/charts/:id' element={<ChartDetail />} />
        </Route>

        <Route path="*" element={<div>404... not found </div>} />
      </Routes>

    </BrowserRouter>
  );
}

export default observer(App);



