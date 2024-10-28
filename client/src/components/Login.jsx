import React, {useState, useContext}from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Login.css"; 
{/*import { use } from "../../../routes/users"; */}


function Login() {
    const [credentials, setCredentials] = useState({
      UserName: "",
      Password: "",
    });
  
  
    const { UserName, Password } = credentials;

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCredentials({ ...credentials, [name]: value });
    };
  
    const login = () => {
      auth.login(credentials);
      navigate("/")

    };

    const logout = () => {
      auth.logout();
    };





return (
  <div className="login-form-container">
      <form>
        <input
          value={UserName}
          onChange={handleChange}
          name="UserName"
          type="text"
          placeholder="User"
          className="form-control mb-2"
        />
        <input
          value={Password}
          onChange={handleChange}
          name="Password"
          type="password"
          placeholder="Password"
          className="form-control mb-2"
        />
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-primary" onClick={login}>
            Log in
          </button>

          
        </div>
      </form>
      
    

    </div>
  );




}
export { Login }; 