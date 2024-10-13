var express = require('express');
var router = express.Router();
const db = require("../model/helper");
// For protecting endpoints...modify depending on what Emelie calls guard
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

// Full url: http://localhost:4000/api/index

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
    `INSERT INTO Fridge (Ingredient, ExpirationDate, Category, Quantity, Unit) VALUES ('${Ingredient}', '${ExpirationDate}', '${Category}', '${Quantity}', '${Unit}', '${user_id}');`
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
  const { id, Quantity } = req.params;
  const user_id = req.user_id;

  try {
    await db(
      `UPDATE Fridge SET Quantity = '${Quantity}' WHERE id = ${id};`
    );
    const fridgeContents = await getFridgeContents(user_id);
    res.send(fridgeContents);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Recipe gallery view
// GET recipe cards from API (limit up to 20?), match based on fridge contents 



module.exports = router;
