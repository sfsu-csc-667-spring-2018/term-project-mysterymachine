if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var path = require('path');

// Set up the express app
const app = express();


// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', require('./routes/cards'));
app.use('/tests', require('./routes/tests'));
// Setup a default catch-all route that sends back a welcome message.
app.get('/', (req, res) => res.status(200).send(
  '<h1>Welcome to CSC667 MisteryMachine team</h1>'));

module.exports = app;