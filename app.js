if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const http = require('http');
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
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// static assets
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cards', require('./routes/cards'));
app.use('/tests', require('./routes/tests'));

/*app.get('/', function (req, res){
	// index, login and registraction in one
	res.sendFile(__dirname +'/html/index.html');
	});
*/

// replace with db call later
var games = [
	{
		number:"NUMBER",
        host:"HOST",
        players:"COUNT",
        status:"STATUS"
    },
    {
    	number:"1",
        host:"xX_Slayer_Xx",
        players:"1",
        status:"Join"
    },
	{
		number:"2",
        host:"Mr P",
        players:"4",
        status:"In Progress"
    },
    {
    	number:"5",
        host:"BigE",
        players:"8",
        status:"In Progress"
    },
	{
		number:"5",
        host:"BigE",
        players:"8",
        status:"In Progress"
    }];

app.get('/',function(req,res){
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

app.get('/error', (req, res) =>
	res.status(200).
	send('<h1>Error Placeholder</h1>')
	);

app.get('/loading', (req, res) =>
	res.status(200).
	send('<h1>Loading Placeholder</h1>')
	);




module.exports = app;