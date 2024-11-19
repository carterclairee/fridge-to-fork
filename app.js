var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); 

var fridgeRouter = require('./routes/fridge');
var usersRouter = require('./routes/users');
var spoonacularRouter = require('./routes/spoonacular');

var app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/fridge', fridgeRouter);
app.use('/api/users', usersRouter);
app.use('/api/spoonacular', spoonacularRouter)

module.exports = app;
