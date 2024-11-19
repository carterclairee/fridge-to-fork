import { useEffect, useState } from "react";
import axios from "axios";
import './css/RecipeGallery.css';
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
    
    // Set up navigate
    const navigate = useNavigate();

    // If there are no matches
    const [noMatches, setNoMatches] = useState('');

    // Fetch the recipes from Spoonacular
    const fetchRecipes = async () => {
        // Only call api if there are ingredients available
        if (chooseIngredientNames.length === 0) return;

        // Format ingredients into string for Spoonacular
        const ingredientsString = chooseIngredientNames.join(",");

        // Call Spoonacular endpoint
        try {
            const {data} = await axios.get("/api/spoonacular", {
                params: {
                    ingredients: ingredientsString
                },
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            // Check if there are any matches
            if (data.length) {
                setRecipes(data);
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
    }, [chooseIngredientNames]);

    return (
        <>
            {/* Display no matches message */}
            {noMatches ? (<>
                <div className="message-container pt-5">
                    <p className="gallery-message">{noMatches}</p>
                    <img className="cutlery-image pt-3" src={cutlery}></img>
                </div>
                </>) : (<>

            <h1 className="text-center">Let's make...</h1>
            {/* Make sure the user entered in some ingredients */}
            {chooseIngredientNames.length ? (
                <div className="row container">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="col-lg-4 mt-4">
                            <div 
                            className="custom-card" 
                            onClick={() => handleRecipeClick (recipe)} 
                            role="button">
                                <div className="img-container">
                                    <img src={recipe.image} className="card-image" alt="recipe image"></img>
                                </div>

                                <div className="card-content">
                                    <h4>{recipe.title}</h4>
                                    <div>
                                    <p>Ready in {recipe.readyInMinutes} minutes</p>
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