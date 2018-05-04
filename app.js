if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('./auth');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const hbs = require('express-handlebars');
const http = require('http');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser('my secret'));

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

// Login session setup
app.use(session({
  secret: 'testScret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Making user object available to all views once loged in
// Global Vars
app.use(function (req, res, next) {
  
  res.locals.user = req.user || null;
  next();
});

// static assets
app.use(express.static(path.join(__dirname, 'public')));

// old test calls
app.use('/cards', require('./routes/cards'));
app.use('/tests', require('./routes/tests'));

// routes
app.use('/',		require('./routes/login'));
app.use('/lobby',	require('./routes/lobby'));
app.use('/room',	require('./routes/room'));
app.use('/game',	require('./routes/game'));
app.use('/users/',	require('./routes/users'));

module.exports = app;