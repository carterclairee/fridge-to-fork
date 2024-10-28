var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const db = require("../model/helper");
require("dotenv").config();
var bcrypt = require("bcrypt");
const saltRounds = 10;



const supersecret = process.env.SUPER_SECRET;


// New branch


//helper
async function getAllUsers(){
  const result = await db ("SELECT * FROM User ORDER BY id ASC;");
  return result.data;
}

// get all users

router.get("/", async (req, res) => {
  try {
    console.log("Received request to fetch users");
    const people = await getAllUsers();
    res.send(people);
  } catch (error) {
    console.error("Error fetching users:", error); // Log errors to the console
    res.status(500).send({ error: error.message });
  }
});


//post users
// login for the first time 

router.post("/register", async (req, res) => {
  const { UserName, Password, Email, FirstName, LastName, Preference } = req.body;

  try {
    const hash = await bcrypt.hash(Password, saltRounds);

    await db(
      `INSERT INTO User (UserName, Password, Email, FirstName, LastName, Preference)
       VALUES ("${UserName}", "${hash}", "${Email}","${FirstName}","${LastName}","${Preference}")`
    );

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//returning user

router.post("/login", async (req, res) => {
  const { UserName, Password } = req.body;

  try {
    const results = await db(
      `SELECT * FROM User WHERE UserName = "${UserName}"`
    );
    const user = results.data[0];
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(Password, user.Password);

      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id }, supersecret);
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/profile", userShouldBeLoggedIn, async (req, res) => {
  // res.send({
  //   message: "Here is the PROTECTED data for user " + req.user_id,
  // });
  const result = await db(
    `SELECT * FROM User WHERE id = ${req.user_id}`
  
  );
  res.send(result.data[0]);
});

//change the preference

router.patch("/preference", userShouldBeLoggedIn, async (req, res) => {
  const { Preference } = req.body;
  console.log("REQ.BODY", req.body);

  try {
    const result = await db(
      `UPDATE User SET Preference = "${Preference}" WHERE id = ${req.user_id}`
    );
console.log(result);
    
      res.send({ message: "Preference updated successfully" });
    
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//delete

router.delete("/", userShouldBeLoggedIn, async (req, res) => {
  const user_id = req.user_id; 

  try {
    const userCheck = await db(`SELECT * FROM User WHERE id = ${user_id}`);
    if (userCheck.data.length === 0) {
      throw new Error("User not found");
    }

    const result = await db(`DELETE FROM User WHERE id = ${user_id}`);


    console.log(result);
    
      res.send({ message: "User deleted successfully" });
  
     
    
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});



module.exports = router;
