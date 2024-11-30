
import './styles/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Route, Routes, Navigate, useNavigate} from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'
import Register from './pages/Register'
import React, {useContext, useState, useEffect} from 'react';
import { Context } from './index.js';
import { observer } from 'mobx-react-lite'



function App() {
  const {store} = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      store.checkAuth()
      
      
    }
  }, [])


  return ( 
      <Routes>
        <Route path="/" element={store.isAuth ? <Dashboard /> : <Navigate to="/login" />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
  );
}

export default observer(App);



