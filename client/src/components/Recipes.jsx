// useLocation will get the state passed from navigate
import { useLocation } from "react-router-dom";
import './css/Recipes.css';

function Recipes () {
    const location = useLocation();
    const recipe = location.state ? location.state.recipe : {};

    console.log(recipe);

    return (
        <>
        <div className="row d-flex">
            <div className="col-md-4">
                <div className="recipe-image-container">
                <img className="full-recipe-image" src={recipe.image}></img>
                </div>
            </div>

            <div className="col-md-8 align-self-center">
            <h1>{recipe.title}</h1>
                <p className="mt-4 recipe-info">Ready in {recipe.readyInMinutes} minutes</p>
                <p className="recipe-info">Servings: {recipe.servings}</p>
                <p className="recipe-info">{recipe.diets.join(", ")}</p>
            </div>
        </div>

        <div className="row mt-5">
            <div className="col-md-4">
                <div className="custom-separator">
                <h4 className="mb-3">Ingredients</h4>
                {recipe.extendedIngredients.map(ingredient => (
                    <p key={ingredient.id}>{ingredient.measures.metric.amount} {ingredient.measures.metric.unitLong} {ingredient.name}</p>
                ))}
                {/* Metric gets messed up, can go with ingredient.original for a cleaner look but won't be able to convert */}
                </div>
            </div>

            <div className="col-md-8">
                <div className="custom-separator">
                <h4 className="mb-3">Instructions</h4>
                {recipe.analyzedInstructions[0].steps.map(step => (
                    <div key={step.number}>
                        <h5>Step {step.number}</h5>
                        <p>{step.step}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default Recipes