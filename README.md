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
- User authentication
- Search for recipes based on ingredients entered by user
- Recipes filtered based on user's dietary preference (such as vegetarian, gluten free, etc.)
- Mobile-responsive design

## Technologies Used
- Front end: React, CSS, Bootstrap
- Back end: Node.js, Express
- Database: MySQL
- API: Spoonacular
- Other tools: Git, GitHub, Postman, Vite

## Installation
1. Clone the repository:  
  `git clone https://github.com/your-username/Claire-Fridge-to-Fork`

2. Navigate to the project directory:  
  `cd claire-fridge-to-fork`

3. Install server-related dependences, such as Express:  
  `npm install`

4. Install front end dependencies, such as React, on the client side:  
  `cd client`  
  `npm install`

5. [Set up a free Spoonacular account](https://spoonacular.com/food-api) to get an API key. Save your key for the next step. It will be hidden in an .env file so it won't be available on GitHub should you fork the repository and make it public.

6. Set up the database
    - Access the MySQL interface:  
    **Mac users:** In your terminal, enter `mysql -u root -p`  
    **PC users:** Search MySQL Command Line Client

    - Create a new database:  
    `create database ecg`
  
    - Add a `.env` file to the project folder of this repository containing your MySQL authentication information, a super secret password for use in the guard, and your Spoonacular API key. For example:  
      ```bash
      DB_HOST=localhost
      DB_USER=root
      DB_NAME=ecg
      DB_PASS=YOURPASSWORDHERE
      SUPER_SECRET=SOMEPASSWORDHERE
      SPOONACULAR_API_KEY=YOURAPIKEYHERE
      ```
    - Migrate the database and create the tables in the main folder of the repository:  
    `cd ..` (if still in the client folder)  
    `npm run migrate`

7. Start the Express servier on port 4000:  
`npm start`

8. Express needs that terminal to run. Open a new terminal to start the client in port 5173:  
  `cd client`  
  `npm run dev`  
  Click on the link or copy and paste it into your browser, and you can use the app!

## My Contributions
As a team, we developed the idea for the app and decided on its features. My individual contributions included: 
- Wireframing the app and deciding the functionality of each part
- All endpoints on the server related to the Fridge view
- Functionality and design of the Fridge view, including the Add Ingredient form
- Functionality and design of the Recipe Gallery, including connecting the Spoonacular API
- Functionality and design of Recipe view

## Screenshots
### Home Page
![Home Page view](/readmeassets/Home-Page.png "Home Page")
### Fridge
![Fridge view](/readmeassets/Fridge.png "Fridge")
### Add an Ingredient
![Add an Ingredient view](/readmeassets/Add-Ingredient.png "Add Ingredient")
### Recipe Gallery
![Recipe Galler view](/readmeassets/Recipe-Gallery.png "Recipe Gallery")
### Recipe Page
![Recipe Page view](/readmeassets/Recipe-Page.png "Recipe Page")

## Future Features
- Imperial to metric conversion toggle on Recipe view
- Additional filters for recipes on the Fridge view (time to make, more dietary restrictions, etc.)
- Password change feature on Profile view
- Create grocery list feature, taking into account items already in pantry
- Favorite recipes function and view

## License
This project is licensed under the MIT License. See the [License](./License) file for details.