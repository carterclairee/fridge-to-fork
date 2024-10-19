import { useState } from 'react'
import './App.css'
import {Register, Login} from './components/Login';



{/*import Home from './components/Home';*/}
{/*import Profile from'./components/Profile 
import Fridge from './components/fridge'*/}
import { Routes, Route, Link } from 'react-router-dom';


function App() {


  return (
    <>

      
      <h1>Fridge to fork</h1>
      <div className="navbar">
      

      {/*<Link to="/">Home</Link>*/}
      <Link to="/Login">Login</Link>
      <Link to="/register">  Register</Link>
      {/*<Link to="/Profile">Profile</Link>
      <Link to="/Fridge">Fridge</Link>*/}
        
      </div>

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/fridge" element={<Fridge />} /> */}
      </Routes>
      
    </>
    
  );
}

export default App
