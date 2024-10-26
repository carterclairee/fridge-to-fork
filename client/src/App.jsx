import { useState } from 'react'
import './App.css'
import {Register, Login} from './components/Login';
{/*import Home from './components/Home';*/}
import Profile from'./components/Profile' 
import Fridge from './components/Fridge'
import axios from "axios";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from './components/PrivateRoute.jsx';
import RecipeGallery from './components/RecipeGallery.jsx';


import { Routes, Route, Link } from 'react-router-dom';


function App() {

  const [isLoggedIn, setIsLoggedIn]= useState (!!localStorage.getItem("token"));

  const login = async (userData) => {
    try {
      const { data } = await axios("api/users/login", {
        method: "POST",
        data: userData,
      });

      
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const authObj = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authObj}>
      <Navbar />
      <div className="App container p-5">

      {/*<Link to="/">Home</Link>
      <Link to="/Login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/Profile">Profile</Link>
      <Link to="/Fridge">Fridge</Link>*/}
        
      

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile" element={ <PrivateRoute> <Profile /></PrivateRoute>} />
        <Route path="/Fridge" element={ <PrivateRoute><Fridge /> </PrivateRoute>} /> 
        <Route path="/RecipeGallery" element={ <PrivateRoute><RecipeGallery /> </PrivateRoute>} />
      </Routes>
      

      </div>
      </AuthContext.Provider>
    
  );
}

export default App
