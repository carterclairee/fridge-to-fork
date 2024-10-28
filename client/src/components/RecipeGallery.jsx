import { useEffect, useState } from "react";
import axios from "axios";
import './RecipeGallery.css';
import cutlery from '../assets/cutlery.png';
import { useNavigate } from "react-router-dom";

// useLocation will get the state passed from navigate
import { useLocation } from "react-router-dom";

export default function RecipeGallery() {
    const [recipes, setRecipes] = useState([]);
    // Setting up location hook
    const location = useLocation();
    // Access the data from navigate
    const chooseIngredientNames = location.state ? location.state.chooseIngredientNames : [];
    const diet = location.state ? location.state.diet : "";
    
    // Set up navigate
    const navigate = useNavigate();

    // If there are no matches
    const [noMatches, setNoMatches] = useState('');

    // WILL NEED TO PROTECT THIS LATER
    const apiKey = "e6ffc9aee98e4b79a29885d21e3e7077";

    // Fetch the recipes from Spoonacular
    const fetchRecipes = async () => {
        // Only call api if there are ingredients available
        if (chooseIngredientNames.length === 0) return;

        // Format ingredients into string for Spoonacular
        const ingredientsString = chooseIngredientNames.join(",");

        // Create a params object to manage params more easily
        const params = {
            query: ingredientsString,
            apiKey: apiKey,
            addRecipeInformation: true,
            number: 1,
            instructionsRequired: true,
            addRecipeInstructions: true,
            fillIngredients: true,
        };

        // Add diet to params if it is available
        if (diet) {
            params.diet = diet;
        };

        // Can easily add more params conditionally for other filters in future (new component that would be displayed on fridge)

        // Call Spoonacular
        try {
            const {data} = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {params});

            // Check if there are any matches
            if (data.results.length) {
                setRecipes(data.results);
                setNoMatches("");
            } else {
                setRecipes([]);
                setNoMatches("No recipes found for your selections.")
            }

        } catch (error) {
            console.log("Error fetching recipes: ", error);
        }
    };

    // Send user to Recipes and make data availabe there
    const handleRecipeClick = (recipe) => {
        navigate("/Recipes", {state: {recipe}});
    }

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <>
            {/* Display no matches message */}
            {noMatches ? (<>
                <div className="message-container pt-5">
                    <p className="gallery-message">{noMatches}</p>
                    <img className="cutlery-image pt-3" src={cutlery}></img>
                </div>
                </>) : (<>

            <h1 className="text-center">Your Recipes</h1>
            {/* Make sure the user entered in some ingredients */}
            {chooseIngredientNames.length ? (
                <div className="row container">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="col-lg-4 mt-4">
                            <div 
                            className="card" 
                            onClick={() => handleRecipeClick (recipe)} 
                            role="button">
                                <div className="image-container">
                                    <img src={recipe.image} className="recipe-image" alt="recipe image"></img>
                                </div>

                                <div className="card-body">
                                    <h5 className="card-title">{recipe.title}</h5>
                                    <div>
                                    <p className="card-text">Ready in {recipe.readyInMinutes} minutes</p>
                                    <p>{recipe.diets.join(", ")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) 

            : <>
                <div className="message-container pt-5">
                    <p className="gallery-message">Please select ingredients from your fridge to get recipes.</p>
                    <img className="cutlery-image pt-3" src={cutlery}></img>
                </div>
            </>}
            </>)}
        </>
    )
}