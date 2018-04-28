if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
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
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// static assets
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cards', require('./routes/cards'));
app.use('/tests', require('./routes/tests'));

// routes
app.use('/',require('./routes/login'));
app.use('/lobby',require('./routes/lobby'));
app.use('/room',require('./routes/room'));
app.use('/table',require('./routes/table'));

/*
app.get('/', function (req, res){
	// index, login and registraction in one
	res.render('index');
	});


app.get('/lobby', function (req, res){
	res.render('lobby',{ games:games });
	});

app.get('/room', (req, res) =>
	res.status(200).
	send('<h1>Room Placeholder</h1>')
	);

app.get('/table', function (req, res){
	// game table
	res.render('table');
	});
*/
app.get('/error', (req, res) =>
	res.status(200).
	send('<h1>Error Placeholder</h1>')
	);

app.get('/loading', (req, res) =>
	res.status(200).
	send('<h1>Loading Placeholder</h1>')
	);



module.exports = app;