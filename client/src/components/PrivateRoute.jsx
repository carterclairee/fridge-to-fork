import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";


export default function PrivateRoute({ children }) {
   
  
    const { isLoggedIn } = useContext(AuthContext);
  
    return isLoggedIn ? children : <Navigate to="/login" />;
  }
