
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {Route, Routes, Navigate} from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'
import Register from './pages/Register'

function RequireAuth({children, redirectTo}) {
  const isAuthenticated = false;
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

function App() {


  return ( 
      <Routes>
        <Route path="/" element={
          <RequireAuth redirectTo="/login">
            <Dashboard />
          </RequireAuth>
        } /> 
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
  );
}

export default App;



