var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const mysql = require("mysql");
// For protecting endpoints...modify depending on what Emelie calls guard
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

// Home/login view: likely all endpoints will come from users.js
// Profile view: likely all endpoints will come from users.js 

// Fridge view
  // POST ingredients
  // GET ingredients (join USERS for user's first name)
  // DELETE ingredients
  // POST ingredients to edit quantity

// Recipe gallery view
  // GET recipe cards from API (limit up to 20?), match based on fridge contents 



module.exports = router;
