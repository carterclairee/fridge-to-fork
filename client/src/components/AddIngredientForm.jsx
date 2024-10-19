

function AddIngredientForm() {


    return (
      <>
        <div className="modal fade modal-dialog modal-dialog-centered modal-dialog-scrollable" id="AddIngredientForm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add an ingredient to your fridge</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    
                    Form info will go here

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-primary">Add Ingredient</button>
                </div>
                </div>
            </div>
        </div>
      </>
    )
  }
  
  export default AddIngredientForm