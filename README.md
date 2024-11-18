# Fridge to Fork
A meal planning app to help users match what's in their fridge and pantry to recipes. 

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Techologies Used](#technologies-used)
4. [Installation](#installation)
5. [My Contributions](#my-contributions)
6. [Screenshots](#screenshots)
7. [Future Features](#future-features)
8. [License](#license)

## Overview
Fridge to Fork lets users keep track of food they already have and matches what's in their pantries with recipes. Users can also filter by dietary needs and preferences so they get meals tailored to their ingredients and needs. We want users to save money on grocery costs and help the environment by reducing food waste, all while having delicious meals. Fridge to Fork was built as a collaborative project and it showcases my skills in full stack web development, including database design, API integration, and user experience.

## Features
<ul>
  <li>User authentication</li>
  <li>Search for recipes based on ingredients entered by user</li>
  <li>Recipes filtered based on user's dietary preference (such as vegetarian, gluten free, etc.)</li>
  <li>Mobile-responsive design</li>
</ul>

## Technologies Used
<ul>
  <li>Front end: React, CSS, Bootstrap</li>
  <li>Back end: Node.js, Express</li>
  <li>Database: MySQL</li>
  <li>API: Spoonacular</li>
  <li>Other tools: Git, GitHub, Postman</li>
</ul>

## Installation
<ol>
  <li>Clone the repository:<br>
    <code>git clone https://github.com/your-username/Claire-Fridge-to-Fork</code>
  </li>

  <li>Navigate to the project directory:<br>
    <code>cd claire-fridge-to-fork</code>
  </li>

  <li>Install server-related dependences, such as Express:<br>
    <code>npm install</code>
  </li>

  <li>Install front end dependencies, such as React, on the client side:<br>
    <code>cd client</code><br>
    <code>npm install</code>
  </li>

  <li>Set up the database
    <ul>
      <li>Access the MySQL interface:<br>
      Mac users: In your terminal, enter <code>mysql -u root -p</code><br>
      PC users: Search MySQL Command Line Client
      </li>
      <li>Create a new database:<br>
      <code>create database ecg</code>
      </li>
      <li> Add a <code>.env</code> file to the project folder of this repository containing your MySQL authentication information. For example:
        <pre>
    DB_HOST=localhost
    DB_USER=root
    DB_NAME=ecg
    DB_PASS=YOURPASSWORD
    SUPER_SECRET=SOMEPASSWORD
      </pre>
      </li>
      <li>Migrate the database and create the tables in the main folder of the repository:<br>
      <code>cd ..</code> (if still in the client folder)<br>
      <code>npm run migrate</code>
      </li>
    </ul>
  </li>

  <li>Start the Express servier on port 4000:<br>
    <code>npm start</code>
  </li>

  <li>Express needs that terminal to run. Open a new terminal to start the client in port 5173:<br>
    <code>cd client</code><br>
    <code>npm run dev</code><br>
    Click on the link or copy and paste it into your browser, and you can use the app!
  </li>
</ol>

## My Contributions
As a team, we developed the idea for the app and decided on its features. My individual contributions included: 
<ul>
  <li>Wireframing the app and deciding the functionality of each part</li>
  <li>All endpoints on the server related to the Fridge view</li>
  <li>Functionality and design of the Fridge view, including the Add Ingredient form</li>
  <li>Functionality and design of the Recipe Gallery, including connecting the Spoonacular API</li>
  <li>Functionality and design of Recipe view</li>
</ul>

## Screenshots
TO DO

## Future Features
<ul>
  <li>Imperial to metric conversion toggle on Recipe view</li>
  <li>Additional filters for recipes on the Fridge view (time to make, more dietary restrictions, etc.)</li>
  <li>Password change feature on Profile view</li>
  <li>Create grocery list feature, taking into account items already in pantry</li>
  <li>Favorite recipes function and view</li>
</ul>

## License
This project is licensed under the MIT License. See the [License](./License) file for details.