import React from "react";
import AuthContext from "../context/AuthContext";
import veggies from "../assets/veggies.png"; 
import "./home.css"



export default function Home() {
    //const { isLoggedIn } = useContext(AuthContext);

return (
    <div className="home-container">
      <img src={veggies} alt="Home Background" className="home-image" />
      <div className="text-field">
        <h1>Welcome to Fridge to Fork</h1>


        {/*isLoggedIn && <p className="greeting">Hello, welcome back!</p> */} 
      </div>
    </div>
  );
}
