import AddIngredientForm from './AddIngredientForm';
import { useEffect, useState } from 'react';
import axios from "axios";

function Fridge() {
    const [myFridge, setMyFridge] = useState([]);

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

    console.log(myFridge);

  return (
    <>
        <h2>User's Fridge</h2>

        {/* Button to open AddIngredientForm modal */}
        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#AddIngredientForm">Add Ingredient</button>

        {/* Render AddIngredientForm */}
        <AddIngredientForm onSubmit={handleAddIngredient}/>
    </>
  )
}

export default Fridge