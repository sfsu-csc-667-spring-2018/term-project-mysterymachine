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

// Set up the express app
const app = express();




// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser('my screet'));



// app.use(
//   session({
//     store: new (require('connect-pg-simple')(session))(),
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure:
//         process.env.ENVIRONMENT !== 'development' &&
//         process.env.ENVIRONMENT !== 'test',
//       maxAge: 7 * 24 * 60 * 60 * 1000
//     },
//     secret: process.env.COOKIE_SECRET
//   })
// );

// Login session setup
app.use(session({
  secret: 'testScret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Making user object available to all views once logedin
app.use(function(req, res, next) {
	res.locals.user = req.user;
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/cards', require('./routes/cards'));
app.use('/tests', require('./routes/tests'));
// Setup a default catch-all route that sends back a welcome message.
// app.get('/', (req, res) => res.status(200).send(
//   '<h1>Welcome to CSC667 MisteryMachine team</h1>'));
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.get('/game', function(req, res, next) {
  console.log(req.user);
  res.render('game_table', { title: 'Home' });
});

module.exports = app;
