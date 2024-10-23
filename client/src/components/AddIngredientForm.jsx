import { useState } from 'react';

function AddIngredientForm({ onSubmit }) {
    const [ingredient, setIngredient] = useState({
        Ingredient: "",
        ExpirationDate: "",
        Category: "",
        Quantity: "",
        Unit: ""
    })

    // For message that ingredient was added successfully
    const [success, setSuccess] = useState(false);

    const handleInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setIngredient(state => ({...state, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(ingredient);

        setSuccess(true);

        setIngredient({
            Ingredient: "",
            ExpirationDate: "",
            Category: "",
            Quantity: "",
            Unit: ""
        });

        // Clear success message after a delay
        setTimeout(() => {
            setSuccess(false);  // Hide success message after 3 seconds
        }, 5000);
    };

    return (
      <>
        <div className="modal fade modal-dialog-scrollable" id="AddIngredientForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add an ingredient to your fridge</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Ingredient */}
                        <div className="form-floating">
                            <input type="text" className="form-control mb-1" id="floatingInput1" placeholder="text"
                            // Value and name for 2-way binding
                            value={ingredient.Ingredient}
                            name="Ingredient"
                            // Event listener
                            onChange={e => handleInput(e)}/>
                            <label htmlFor="floatingInput1">Ingredient</label>
                        </div>

                        {/* Expiration Date */}
                        <div className="form-floating">
                            <input type="text" className="form-control mb-1" id="floatingInput2" placeholder="text"
                            value={ingredient.ExpirationDate}
                            name="ExpirationDate"
                            onChange={e => handleInput(e)}/>
                            <label htmlFor="floatingInput2">Expiration (yyyymmdd)</label>
                        </div>

                        {/* Category */}
                        <div className="form-floating">
                            <select 
                                className="form-select mb-2" 
                                id="floatingSelect3"
                                value={ingredient.Category}
                                name="Category" 
                                onChange={e => handleInput(e)}
                            >
                            {/* Options */}
                            <option value="">Select category</option>
                            <option value="bread, cereal, rice, pasta">bread, cereal, rice, pasta</option>
                            <option value="fruits and vegetables">fruits and vegetables</option>
                            <option value="meat, poultry, fish, beans, eggs">meat, poultry, fish, beans, eggs</option>
                            <option value="milk, yogurt, cheese">milk, yogurt, cheese</option>
                            <option value="fats, oils, sweets">fats, oils, sweets</option>
                            </select>
                            <label htmlFor="floatingSelect3">Category</label>
                        </div>

                        {/* Quantity */}
                        <div className="form-floating">
                            <input type="text" className="form-control mb-1" id="floatingInput4" placeholder="text"
                            value={ingredient.Quantity}
                            name="Quantity"
                            onChange={e => handleInput(e)}/>
                            <label htmlFor="floatingInput4">Quantity</label>
                        </div>

                        {/* Unit */}
                        <div className="form-floating">
                            <input type="text" className="form-control mb-1" id="floatingInput5" placeholder="text"
                            value={ingredient.Unit}
                            name="Unit"
                            onChange={e => handleInput(e)}/>
                            <label htmlFor="floatingInput5">Unit</label>
                        </div>

                        {/* Button */}
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="submit" className="btn btn-dark">Add</button>
                            
                            {/* Success message */}
                            {success && (
                                <div className="d-flex align-items-center">
                                    <i className="fa-solid fa-circle-check" style={{ color: '#0C1618', marginRight: '8px' }}></i>
                                    <p className="mb-0">Ingredient added!</p>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
      </>
    )
  }
  
  export default AddIngredientForm