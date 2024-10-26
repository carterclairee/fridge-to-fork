import { useEffect, useState } from "react";
import axios from "axios";

// useLocation will get the state passed from navigate
import { useLocation } from "react-router-dom";

export default function RecipeGallery() {
    const [recipes, setRecipes] = useState([]);
    // Setting up location hook
    const location = useLocation();
    // Access the data from navigate
    const chooseIngredientNames = location.state ? location.state.chooseIngredientNames : [];
    const diet = location.state ? location.state.diet : "";
    console.log(chooseIngredientNames)
    console.log(diet);


    return (
        <>
            <h1>Your Recipes</h1>

        </>
    )
}