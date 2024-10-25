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
  const { Quantity, Unit } = req.body;
  const user_id = req.user_id;

  try {
    await db(
      `UPDATE Fridge SET Quantity = ${Quantity}, Unit = "${Unit}" WHERE id = ${id};`
    );
    const fridgeContents = await getFridgeContents(user_id);
    res.send(fridgeContents);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// POST ingredients that will be used to search for recipes
router.post("")

// Recipe view

// GET recipe matches (limit 10 when we roll it out?), then GET recipe cards for recipes
router.get("/recipes", userShouldBeLoggedIn, async (req, res) => {
  const user_id = req.user_id;

  try {
    // User's ingredients
    const fridgeContents = await getFridgeContents(user_id);

    // User's restrictions (if any)
    const diet = fridgeContents[0].Preference.toLowerCase();
   
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
    const number = 5

    // Use ignorePantry boolean from Spoonacular to ignore pantry staples
    const ignorePantry = true;

    // Get recipe matches based on ingredients from Spoonacular
    const recipeMatchesCall = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
      params: {
        ingredients: fridgeList,
        apiKey: apiKey,
        ranking: ranking,
        number: number,
        ignorePantry: ignorePantry
      }
    });
    
    const recipeMatches = recipeMatchesCall.data;
    console.log("MATCHED BY INGREDIENTS ONLY ", recipeMatches)

    // Need to filter further (by diet, etc.) using the further recipe information endpoint from Spoonacular

    if (recipeMatches.length) {
      // Get additional info for each recipe by id
      const filteredRecipesPromise = recipeMatches.map(async (recipe) => {
        const recipeInfoCall = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information`, {
          params: {
            apiKey: apiKey,
            includeNutrition: false,
            addWinePairing: false,
            addTasteData: false
          }
        });

        const recipeInfo = recipeInfoCall.data;
        console.log("RECIPE INFO FOR SELECTED RECIPES ", recipeInfo)

        // Check if the recipe matches the dietary preference (they are boolean keys in the recipeInfoCall.data, so this will return a true or false)
        const matchesDiet = recipeInfo[diet];

        // Only return the recipe if it matches the diet
        if (matchesDiet) {
          return recipe;
        } else {
          return null;
        }
      });

      // Wait for all promises to finish up, then filter out the nulls
      // .filter(Boolean) is a short way to filter out the falsy values
      const filteredRecipes = (await Promise.all(filteredRecipesPromise)).filter(Boolean);

      // Send the filtered recipes or a message if no matach
      if (filteredRecipes.length) {
        res.send(filteredRecipes);
      } else {
        // Message if there aren't any within diet restrictions
        res.status(404).send({message: "No recipe matches found for your diet."})
      }
      // Message if there aren't any recipes for user's ingredients (diet not included in this one)
    } else {
      res.status(404).send({message: "No recipe matches found"});
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }  
});

    // // Get recipe matches cards from Spoonacular
    // // Need to map through the recipes array to get the id number. Will need an if statement in case of no matches
    // if (recipeMatches.length) {
    //   // Getting promise first because will want to wait for all promises to be resolved before showing cards (will use Promise.all later)
    //   const recipeCardsPromise = recipeMatches.map(async (recipe) => {
    //     const recipeCardsCall = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/card`, {
    //       params: {
    //         apiKey: apiKey
    //       }
    //     });
    //     return {
    //       // Want to send full recipe in case info is needed later (like missing ingredients)
    //       ...recipe,
    //       // Card is sent as a png, but I'm not sure how to display it later
    //       card: recipeCardsCall.data.url
    //     };
    //   });

    //   // Use Promise.all, which waits for all of the card requests to complete and is useful since we're doing 2 GETs at the same time here
    //   const recipesAndCards = await Promise.all(recipeCardsPromise);

    //   // Send both recipes (may need missing ingredient info for display) and cards
    //   res.send(recipesAndCards);
    // } else {
    //   res.status(404).send({ message: "No recipe matches found." });
    // }

module.exports = router;