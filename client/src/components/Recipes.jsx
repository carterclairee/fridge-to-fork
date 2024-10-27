// useLocation will get the state passed from navigate
import { useLocation } from "react-router-dom";

function Recipes () {
    const location = useLocation();
    const recipe = location.state ? location.state.recipe : {};

    console.log(recipe);

    return (
        <>
        <div className="row">
            <div className="col-md-6">

            </div>

            <div className="col-md-6">

            </div>
        </div>
        </>
    )
}

export default Recipes