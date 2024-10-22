import AddIngredientForm from './AddIngredientForm';
import { useEffect, useState } from 'react';
import axios from "axios";
import CategoryTable from './CategoryTable';
import './Fridge.css';

function Fridge() {
    const [myFridge, setMyFridge] = useState([]);

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
        } catch (error) {
            console.log(error);
        }
    };

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

  return (
    <>
    <div className="fridge-outer">
        {/* Needed to have something while data was loading, otherwise the app would crash */}
        <h2 className="text-center fridge-name mb-3">{myFridge.length > 0 ? `${myFridge[0].FirstName}'s Fridge` : "Loading..."}</h2>

        <div className="equal-buttons">
            {/* Button to open AddIngredientForm modal */}
            <button type="button" className="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#AddIngredientForm">Add Ingredient</button>

            {/* Button to go to Recipes */}
            <button type="button" className="btn btn-outline-light">Match Recipes</button>
        </div>

        <div className="fridge-inner">
        {/* Using CategoryTable for display */}
        <CategoryTable categoryTitle="Bread, Cereal, Rice, and Pasta" ingredients={breadIngredients} onEdit={handleEditIngredient} onDelete={handleDeleteIngredient}/>

        <CategoryTable categoryTitle="Fruits and Vegetables" ingredients={fruitsIngredients} onEdit={handleEditIngredient} onDelete={handleDeleteIngredient}/>

        <CategoryTable categoryTitle="Meat, Poultry, Fish, Beans, and Eggs" ingredients={meatIngredients} onEdit={handleEditIngredient} onDelete={handleDeleteIngredient}/>

        <CategoryTable categoryTitle="Milk, Yogurt, and Cheese" ingredients={milkIngredients} onEdit={handleEditIngredient} onDelete={handleDeleteIngredient}/>

        <CategoryTable categoryTitle="Fats, Oils, and Sweets" ingredients={fatsIngredients} onEdit={handleEditIngredient} onDelete={handleDeleteIngredient}/>
        </div>

        {/* Render AddIngredientForm */}
        <AddIngredientForm onSubmit={handleAddIngredient} />
    </div>
    </>
  )
}

export default Fridge