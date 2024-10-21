
export default function CategoryTable ({ categoryTitle, ingredients })

{
    return (
        <>
        <h3>{categoryTitle}</h3>
        {ingredients.length > 0 ? 
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
                    {ingredients.map(ingredient => (
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
        </>
    )
}