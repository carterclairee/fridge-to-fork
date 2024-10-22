import { useState } from "react";

export default function CategoryTable ({ categoryTitle, ingredients, onEdit, onDelete }) {
    const [selectedIngredient, setSelectedIngredient] = useState({
        id: '',
        Quantity: '',
        Unit: ''
    });


    // For editing functionality
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setSelectedIngredient(state => ({...state, [name]: value})) 
    };

    const handleEditClick = (ingredient) => {
        setSelectedIngredient({
            id: ingredient.id,
            Quantity: ingredient.Quantity,
            Unit: ingredient.Unit
        });
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (selectedIngredient) {
            onEdit(selectedIngredient)
            setSelectedIngredient({
                id: '',
                Quantity: '',
                Unit: ''
            })
        }
    };
    
    return (
        <>
        <div className="container">
        <h3 className="mt-4">{categoryTitle}</h3>
        {ingredients.length > 0 ? 
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Ingredient</th>
                        <th scope="col">Expiration Date</th>
                        <th scope="col">Quantity</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map(ingredient => (
                        <tr key={ingredient.id}>
                            <td>{ingredient.Ingredient}</td>
                            <td>{ingredient.ExpirationDate.split('T')[0]}</td>
                            {/* If ingredient is being edited, show input fields */}
                            {selectedIngredient.id === ingredient.id ? (
                                <>
                                <td>
                                <div className="form-floating">
                                    <input type="text" className="form-control me-1" id="floatingInput1" placeholder="text"
                                    value={selectedIngredient.Quantity}
                                    name="Quantity"
                                    onChange={handleInputChange}/>
                                    <label htmlFor="floatingInput1">Quantity</label>
                                </div>
                                </td>

                                <td>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingInput2" placeholder="text"
                                    value={selectedIngredient.Unit}
                                    name="Unit"
                                    onChange={handleInputChange}/>
                                    <label htmlFor="floatingInput2">Quantity</label>
                                </div>
                                </td>

                                <td>
                                    <button type="submit" className="btn btn-outline-primary btn-sm" onClick={handleEditSubmit}>Save</button>
                                </td>

                                <td>
                                    <button className="btn btn-outline-dark btn-sm" onClick={() => setSelectedIngredient({
                                        id: '',
                                        Quantity: '',
                                        Unit: ''
                                    })}>Cancel</button>
                                </td>
                                </>
                            ) : (
                                <>
                                <td>{ingredient.Quantity} {ingredient.Unit}</td>
                                <td>
                                {/* Edit */}
                                <div>
                                    <i 
                                    onClick={() => handleEditClick(ingredient)}
                                    role="button" 
                                    className="fa-regular fa-pen-to-square"></i>
                                </div>
                                </td>
                                <td>
                                {/* Delete */}
                                <div>
                                    <i 
                                    onClick={() => onDelete(ingredient.id)}
                                    role="button" 
                                    className="fa-regular fa-trash-can"></i>
                                </div>
                                </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        : <p>No ingredients in this food group</p>}
        </div>
        </>
    )
}