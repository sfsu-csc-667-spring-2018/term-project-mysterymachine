if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const http = require('http');
const path = require('path');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs',hbs(
	{	extname: 'hbs',
		defaultLayout:'layout',
		layoutDir:__dirname + "/views/layouts/",
		partialsDir:__dirname + "/views/partials/"
	}));
app.set('view engine', 'hbs');
app.set('views',__dirname + '/views');

// static assets
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cards', require('./routes/cards'));
app.use('/tests', require('./routes/tests'));

// routes
app.use('/',require('./routes/login'));
app.use('/lobby',require('./routes/lobby'));
app.use('/room',require('./routes/room'));
app.use('/table',require('./routes/table'));


module.exports = app;