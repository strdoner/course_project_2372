
import './styles/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import {Route, Routes, BrowserRouter} from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'
import Register from './pages/Register'
import ChartDetail from './pages/ChartDetail'
import Page404 from './pages/404page.jsx';
import React, {useContext, useEffect} from 'react';
import { Context } from './index.js';
import { observer } from 'mobx-react-lite'
import PrivateRoute from './components/PrivateRoute.jsx';


function App() {
  const {store} = useContext(Context)
  useEffect(() => {
      store.checkAuth()
      
  }, [store])

  return ( 
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/' element={<PrivateRoute />}>
          <Route path='' element={<Dashboard />} />           
          <Route path='/charts/:id' element={<ChartDetail />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>

    </BrowserRouter>
  );
}

export default observer(App);



