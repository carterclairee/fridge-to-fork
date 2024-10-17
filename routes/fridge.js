var express = require('express');
var router = express.Router();
const db = require("../model/helper");
// Require axios for api calls
const axios = require('axios');
// For protecting endpoints
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

// Full url: http://localhost:4000/api/fridge

// API Key
const apiKey = "dbb4ce340e4d4777a5966302b1e6b98d";

// Helper function to get fridge contents the same way each time; function takes the user's id as parameter
// Joined with users to get user's first name and preferences
async function getFridgeContents(user_id) {
  try {
    const result = await db(
      `SELECT f.*, u.FirstName, u.Preference FROM Fridge as f LEFT JOIN User as u on f.UserId = u.id WHERE f.UserId = ${user_id};`
    );
    return result.data;
  } catch (error) {
    throw new Error("Error fetching fridge contents: " + error.message);
  }
}

// Home/login view: likely all endpoints will come from users.js
// Profile view: likely all endpoints will come from users.js 

// Fridge view
// POST ingredients
router.post("/", userShouldBeLoggedIn, async (req, res) => {
  const { Ingredient, ExpirationDate, Category, Quantity, Unit } = req.body;

  // req.user_id will come from guard
  const user_id = req.user_id

  try {await db(
    `INSERT INTO Fridge (Ingredient, ExpirationDate, Category, Quantity, Unit, UserId) VALUES ('${Ingredient}', ${ExpirationDate}, '${Category}', ${Quantity}, '${Unit}', '${user_id}');`
  );

  // Call helper function with user_id as parameter
  const fridgeContents = await getFridgeContents(user_id);
  res.status(201).send(fridgeContents);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET ingredients
router.get("/", userShouldBeLoggedIn, async (req, res) => {
  const user_id = req.user_id;

  try {
    const fridgeContents = await getFridgeContents(user_id);
    res.status(200).send(fridgeContents);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// DELETE ingredients by id
router.delete("/:id", userShouldBeLoggedIn, async (req, res) => {
  const { id } = req.params;
  const user_id = req.user_id;

  try {
    await db(
      `DELETE FROM Fridge WHERE id = ${id};`
    );
    const fridgeContents = await getFridgeContents(user_id);
    res.send(fridgeContents);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// PUT ingredients to edit quantity
router.put("/:id", userShouldBeLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { Quantity } = req.body;
  const user_id = req.user_id;

  try {
    await db(
      `UPDATE Fridge SET Quantity = ${Quantity} WHERE id = ${id};`
    );
    const fridgeContents = await getFridgeContents(user_id);
    res.send(fridgeContents);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Recipe view

// This may need to be 2 GET requests nested

// GET recipe cards from API (limit up to 10?), match based on fridge contents 

// It looks like adding plus will trigger the ignorePantry. Maybe have a set number of those (like water, sugar, salt, pepper, oil?) each time?

router.get("/recipes", userShouldBeLoggedIn, async (req, res) => {
  const user_id = req.user_id;

  try {
    // User's ingredients
    const fridgeContents = await getFridgeContents(user_id);

    // User's restrictions (if any)
    const preference = fridgeContents[0].Preference;

    // Generate comma-separated list of ingredients for input into Spoonacular
    // Map through the array, access the objects within, take out preference and add it to a list of strings separated by commas
    const fridgeList = fridgeContents.map((e) => {
      return e.Ingredient;
    }).toString();

    // Use Spoonacular's ranking system to minimize missing ingredients
    const ranking = 2;
    // If we want the user to be able to switch up the ranking: const ranking = req.query.ranking || 2;
    // The url would look like this: /recipes?ranking=2

    // Get recipe matches based on ingredients from Spoonacular
    const recipeMatchesCall = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
      params: {
        ingredients: fridgeList,
        apiKey: apiKey,
        ranking: ranking
      }
    });
    
    const recipeMatches = recipeMatchesCall.data;
    
    res.status(200).send(recipeMatches);

    // Get recipe matches cards from Spoonacular

  } catch (error) {
    res.status(500).send({ error: error.message });
  }

  
  // // GET recipe matches and cards
  // app.get('/recipes-with-cards', async (req, res) => {
  
  //         // Step 2: For each recipe, get its recipe card
  //         const recipeCardsPromises = recipeMatches.map(async (recipe) => {
  //             const recipeCardResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/card`, {
  //                 params: {
  //                     apiKey: SPOONACULAR_API_KEY
  //                 }
  //             });
  //             return {
  //                 ...recipe,  // Include the original recipe details
  //                 card: recipeCardResponse.data.url  // Add the recipe card URL to the recipe object
  //             };
  //         });
  
  //         // Wait for all card requests to complete
  //         const recipesWithCards = await Promise.all(recipeCardsPromises);
  
  //         // Step 3: Send the final results (recipes + their cards) to the client
  //         res.json(recipesWithCards);
  //     } catch (error) {
  //         console.error('Error fetching recipes or cards:', error);
  //         res.status(500).send('Error fetching recipe matches and cards');
  //     }
  // });
  
  
});

module.exports = router;