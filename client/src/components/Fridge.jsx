import AddIngredientForm from './AddIngredientForm';
import { useEffect } from 'react';
// Import Axios

function Fridge() {

    const handleAddIngredient = (ingredient) => {
        // Add the ingredient to the database using axios (will be protected)
    }

  return (
    <>
        <h1>User's Fridge</h1>

        {/* Button to open AddIngredientForm modal */}
        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#AddIngredientForm">Add Ingredient</button>

        {/* Render AddIngredientForm */}
        <AddIngredientForm />
    </>
  )
}

export default Fridge