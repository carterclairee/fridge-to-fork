import React from "react";
import AuthContext from "../context/AuthContext";
import veggies from "../assets/veggies.png"; 
import "./css/home.css"



export default function Home() {
    //const { isLoggedIn } = useContext(AuthContext);

return (
    <div className="home-container">
        <div className="text-field">
     
        <h1>Welcome to Fridge to Fork</h1>

        {/*isLoggedIn && <p className="greeting">Hello, welcome back!</p> */} 

        <p className="app-description">
          Make the most of what’s already in your fridge. Save money on your grocery budget, help the environment by reducing food waste, and do it all while eating delicious meals.
        </p>

        </div>
         <div className="image-container">
             <img src={veggies} alt="Home Background" className="home-image" />
      </div>
    </div>
  );
}




