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

    // If there are no matches
    const [noMatches, setNoMatches] = useState('');

    // WILL NEED TO PROTECT THIS LATER
    const apiKey = "dbb4ce340e4d4777a5966302b1e6b98d";

    // Fetch the recipes from Spoonacular
    const fetchRecipes = async () => {
        // Only call api if there are ingredients available
        if (chooseIngredientNames.length === 0) return;

        // Format ingredients into string for Spoonacular
        const ingredientsString = chooseIngredientNames.join(",");

        // Create a params object to manage params better
        const params = {
            query: ingredientsString,
            apiKey: apiKey,
        };

        // Add diet to params if it is available
        if (diet) {
            params.diet = diet;
        }

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
    }

    console.log(recipes);

    useEffect(() => {
        fetchRecipes();
    }, [chooseIngredientNames]);

    return (
        <>
            {/* Display no matches message */}
            {noMatches ? (<p>{noMatches}</p>) : (<>

            <h1>Your Recipes</h1>
            {chooseIngredientNames.length ? 

            (<p>recipes will go here</p>) 

            : <p>Please select ingredients from your fridge to get recipes.</p>}
            </>)}
        </>
    )
}