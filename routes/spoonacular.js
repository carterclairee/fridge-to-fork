var express = require('express');
var router = express.Router();
const axios = require('axios');
const db = require("../model/helper");

// For protecting endpoints
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

// Full url: http://localhost:4000/api/spoonacular

// Get the key from the .env file
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

// Call Spoonacular to match recipes
router.get('/', userShouldBeLoggedIn, async (req, res) => {
    const { ingredients } = req.query;
    // User id from guard
    const user_id = req.user_id

    // Check if ingredients are provided
    if (!ingredients) {
        return res.status(400).send({error: 'Ingredients are required.'});
    }

    try {
        // format ingredients for search
        // DOUBLE CHECK ON WHAT IS COMING FROM FRONT END TO SEE IF SPLIT IS NEEDED
    
        // Params for the API call
        const params = {
            query: ingredients,
            apiKey: SPOONACULAR_API_KEY,
            addRecipeInformation: true,
            number: 9,
            instructionsRequired: true,
            addRecipeInstructions: true,
            fillIngredients: true,
        }

        // Fetch user's diet from the database
        const dietResult = await db(
            `SELECT Preference FROM User WHERE id = ${user_id};`
        );
        // CHECK ON HOW DIET COMES FROM FRONT END IF IT'S EMPTY
        const diet = dietResult.data[0].Preference || null;

        if (diet) {
            params.diet = diet;
        }

        // Call the Spoonacular API
        const { data } = await axios.get('https://api.spoonacular.com/recipes/complexSearch', { params });

        // check if there are any results and send them back
        if (data.results.length) {
            res.send(data.results);
        } else {
            res.send({message: 'No recipes found for your selection.'})
        }

    }  catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;