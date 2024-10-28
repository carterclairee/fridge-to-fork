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
          Fridge to Fork helps you make the most of what’s already in your fridge, 
          connecting you with recipes that use up ingredients you have on hand. By matching 
          your available ingredients with creative meal ideas, our app encourages resourcefulness, 
          saves you money, and reduces food waste—all while making meal planning easier. Whether 
          you’re looking to save on your grocery budget or make environmentally conscious choices, 
          Fridge to Fork turns what you have into delicious, sustainable meals.
        </p>



        </div>
         <div className="image-container">
             <img src={veggies} alt="Home Background" className="home-image" />
      </div>
    </div>
  );
}




