import AddIngredientForm from './AddIngredientForm';
import { useEffect, useState } from 'react';
import axios from "axios";
import CategoryTable from './CategoryTable';
import './css/Fridge.css';
import { useNavigate } from "react-router-dom";

function Fridge() {
    const [myFridge, setMyFridge] = useState([]);
    // State to track toggled ingredients
    const [chooseIngredients, setChooseIngredients] = useState([]);
    // Get selected ingredient names for matching recipes
    const [chooseIngredientNames, setChooseIngredientNames] = useState([]);
    // Save diet info
    const [diet, setDiet] = useState("");
    // Set up navigate
    const navigate = useNavigate();

    // Category filters
    const breadIngredients = myFridge.filter(i => i.Category === "bread, cereal, rice, pasta");
    const fruitsIngredients = myFridge.filter(i => i.Category === "fruits and vegetables");
    const meatIngredients = myFridge.filter(i => i.Category === "meat, poultry, fish, beans, eggs");
    const milkIngredients = myFridge.filter(i => i.Category === "milk, yogurt, cheese");
    const fatsIngredients = myFridge.filter(i => i.Category === "fats, oils, sweets");

    useEffect(() => {getFridgeContents()}, []);

    const getFridgeContents = async () => {
        try {
            const {data} = await axios("/api/fridge", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                }
            });
            setMyFridge(data);
            setDiet(data[0].Preference.toLowerCase());
        } catch (error) {
            console.log(error);
        }
    };

    const handleIngredientChoose = (ingredientId, ingredientName) => {
        // When ingredient is clicked, update the selectedIngredients state
        // if the previous state does include the selected id, filter it out to deselect. If it wasn't already included, add it to the array to select
        setChooseIngredients((state) => state.includes(ingredientId) ? state.filter(id => id !== ingredientId) : [...state, ingredientId]);

        // Also need to get the ingredient names for matching recipes
        setChooseIngredientNames((state) => state.includes(ingredientName) ? state.filter(name => name !== ingredientName) : [...state, ingredientName]);
    }

    const handleAddIngredient = async (ingredient) => {
        try {
            // "data" here is the response we expect from the endpoint
            const { data } = await axios("/api/fridge", {
                method: "POST",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
                // "data" here is the payload to the backend; just the ingredient added by form
                data: ingredient
            });
            // Setting to the data response from the endpoint (updated version of fridge contents)
            setMyFridge(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditIngredient = async (ingredient) => {
        try {
            const { data } = await axios(`api/fridge/${ingredient.id}`, {
                method: "PUT",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
                data: ingredient
            });
            setMyFridge(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteIngredient = async (itemId) => {
        try {
            const { data } = await axios(`api/fridge/${itemId}`, {
                method: "DELETE",
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            setMyFridge(data);
        } catch (error) {
            console.log(error);
        }
    }

    // Send user to RecipeGallery and make data (ingredient names, diet) available there
    const handleMatchRecipes = () => {
        navigate("/RecipeGallery", {state: {chooseIngredientNames, diet}});
    }

  return (
    <>
    <div className="fridge-background">
    <div className="fridge-outer">
        {/* Needed to have something while data was loading, otherwise the app would crash */}
        <h1 className="text-center fridge-name mb-3">Check the Fridge</h1>

        <div className="equal-buttons">
            {/* Button to open AddIngredientForm modal */}
            <button type="button" className="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#AddIngredientForm">Add Ingredient</button>

            {/* Button to go to RecipeGallery */}
            <button type="button" className="btn btn-outline-light" onClick={handleMatchRecipes}>Match Recipes</button>
        </div>

        <div className="fridge-inner">
        {/* Using CategoryTable for display */}
        <CategoryTable 
            categoryTitle="Bread, Cereal, Rice, and Pasta" 
            ingredients={breadIngredients} 
            onEdit={handleEditIngredient} 
            onDelete={handleDeleteIngredient} 
            onIngredientChoose={handleIngredientChoose} 
            chooseIngredients={chooseIngredients}/>

        <CategoryTable 
            categoryTitle="Fruits and Vegetables" 
            ingredients={fruitsIngredients} 
            onEdit={handleEditIngredient} 
            onDelete={handleDeleteIngredient} 
            onIngredientChoose={handleIngredientChoose} 
            chooseIngredients={chooseIngredients}/>

        <CategoryTable 
            categoryTitle="Meat, Poultry, Fish, Beans, and Eggs" 
            ingredients={meatIngredients} 
            onEdit={handleEditIngredient} 
            onDelete={handleDeleteIngredient} 
            onIngredientChoose={handleIngredientChoose} 
            chooseIngredients={chooseIngredients}/>

        <CategoryTable 
            categoryTitle="Milk, Yogurt, and Cheese" 
            ingredients={milkIngredients} 
            onEdit={handleEditIngredient} 
            onDelete={handleDeleteIngredient} 
            onIngredientChoose={handleIngredientChoose} 
            chooseIngredients={chooseIngredients}/>

        <CategoryTable 
            categoryTitle="Fats, Oils, and Sweets" 
            ingredients={fatsIngredients} 
            onEdit={handleEditIngredient} 
            onDelete={handleDeleteIngredient} 
            onIngredientChoose={handleIngredientChoose} 
            chooseIngredients={chooseIngredients}/>
        </div>

        {/* Render AddIngredientForm */}
        <AddIngredientForm onSubmit={handleAddIngredient} />
    </div>
    </div>
    </>
  )
}

export default Fridge