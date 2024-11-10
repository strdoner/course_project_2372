
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {Route, Routes, Navigate} from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'
import Register from './pages/Register'
import React, {useContext, useState} from 'react';
import {UserContext} from './contexts/userContext.js';
import { refreshToken } from './api/auth.js';

function RequireAuth({children, redirectTo, isAuthenticated}) {
  
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

function App() {



  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(refreshToken().access)
  const isUserLoggedIn = () => {
    console.log(accessToken !== null)
    return accessToken !== null;
  }

  

  return ( 
      <UserContext.Provider value={{user, setUser, isUserLoggedIn, accessToken, setAccessToken}}>
        <Routes>
          <Route path="/" element={
            <RequireAuth redirectTo="/login" isAuthenticated={isUserLoggedIn()}>
              <Dashboard />
            </RequireAuth>
          } /> 
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </UserContext.Provider>
  );
}

export default App;



