var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  // get the token from the headers (and remove the Bearer)
  const token = req.headers["authorization"].replace(/^Bearer\s/, "");

  // if there is no token send a message
  if (!token) {
    res.status(400).send({ message: "please provide a token" });
    return;
  } else {
    // if there is a token, verify it
    // the verify function takes 3 arguments, the token, the supersecret and a callback function that is injected with 2 arguments, an error and the decoded token
    jwt.verify(token, supersecret, async function (err, decoded) {
      // if there is an error with the token
      if (err) {
        res.status(401).send({ message: err.message });
        return;
      }
      // if everything else is ok, happy days, you have access to the decoded payload and the user id is in decoded.user_id
      // we gonna make the decoded user id available by addind it to the request object
      req.user_id = decoded.user_id;

      // go to the next step of the cycle
      next();
    });
  }
}

module.exports = userShouldBeLoggedIn;