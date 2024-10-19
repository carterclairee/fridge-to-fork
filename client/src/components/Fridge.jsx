import AddIngredientForm from './AddIngredientForm';

function Fridge() {


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