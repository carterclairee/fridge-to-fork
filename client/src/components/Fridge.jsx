import AddIngredientForm from './AddIngredientForm';
import { useEffect, useState } from 'react';
import axios from "axios";

function Fridge() {
    const [myFridge, setMyFridge] = useState([]);

    // Category filters
    const breadIngredients = myFridge.filter(i => i.Category === "bread, cereal, rice, pasta");
    const meatIngredients = myFridge.filter(i => i.Category === "meat, poultry, fish, beans, eggs");

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

  return (
    <>
        {/* Needed to have something while data was loading, otherwise the app would crash */}
        <h2>{myFridge.length > 0 ? `${myFridge[0].FirstName}'s Fridge` : "Loading..."}</h2>

        {/* Button to open AddIngredientForm modal */}
        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#AddIngredientForm">Add Ingredient</button>

        <h3>Bread, cereal, rice, and pasta</h3>
        {breadIngredients.length > 0 ? 
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Ingredient</th>
                        <th scope="col">Expiration Date</th>
                        <th scope="col">Quantity</th>
                        {/* Will have edit and delete icons */}
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {breadIngredients.map(ingredient => (
                        <tr key={ingredient.id}>
                            <td>{ingredient.Ingredient}</td>
                            <td>{ingredient.ExpirationDate.split('T')[0]}</td>
                            <td>{ingredient.Quantity} {ingredient.Unit}</td>
                            <td>edit</td>
                            <td>delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        : <p>No ingredients in this food group</p>}

        <h3>Fruits and vegetables</h3>

        <h3>Meat, poultry, fish, beans, and eggs</h3>
        {meatIngredients.length > 0 ? 
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Ingredient</th>
                        <th scope="col">Expiration Date</th>
                        <th scope="col">Quantity</th>
                        {/* Will have edit and delete icons */}
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {meatIngredients.map(ingredient => (
                        <tr key={ingredient.id}>
                            <td>{ingredient.Ingredient}</td>
                            <td>{ingredient.ExpirationDate.split('T')[0]}</td>
                            <td>{ingredient.Quantity} {ingredient.Unit}</td>
                            <td>edit</td>
                            <td>delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        : <p>No ingredients in this food group</p>}

        <h3>Milk, yogurt, and cheese</h3>

        <h3>Fats, oils, and sweets</h3>

        {/* Render AddIngredientForm */}
        <AddIngredientForm onSubmit={handleAddIngredient}/>
    </>
  )
}

export default Fridge