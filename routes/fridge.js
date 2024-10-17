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

// GET recipe cards from API (limit up to 10?), match based on fridge contents 

// It looks like adding plus will trigger the ignorePantry. Maybe have a set number of those (like water, sugar, salt, pepper, oil?) each time?
// I have not done anything with preference yet.

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

    // Number of recipes limit (I set low to reduce api calls right now but we can change)
    const number = 2

    // Get recipe matches based on ingredients from Spoonacular
    const recipeMatchesCall = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
      params: {
        ingredients: fridgeList,
        apiKey: apiKey,
        ranking: ranking,
        number: number
      }
    });
    
    const recipeMatches = recipeMatchesCall.data;

    // Get recipe matches cards from Spoonacular
    // Need to map through the recipes array to get the id number. Will need an if statement in case of no matches

    if (recipeMatches.length) {
      // Getting promise first because will want to wait for all promises to be resolved before showing cards (will use Promise.all later)
      const recipeCardsPromise = recipeMatches.map(async (recipe) => {
        const recipeCardsCall = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/card`, {
          params: {
            apiKey: apiKey
          }
        });
        return {
          // Want to send full recipe in case info is needed later (like missing ingredients)
          ...recipe,
          // Card is sent as a url, but I'm not sure how to display it later
          card: recipeCardsCall.data.url
        };
      });

      // Use Promise.all, which waits for all of the card requests to complete and is useful since we're doing 2 GETs at the same time here
      const recipesAndCards = await Promise.all(recipeCardsPromise);

      // Send both recipes (may need missing ingredient info for display) and cards
      res.send(recipesAndCards);
    } else {
      res.status(404).send({ message: "No recipe matches found." });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }  
});

module.exports = router;