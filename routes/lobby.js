//lobby.js
const express = require('express');
const router = express.Router();

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

router.get('/', function (req, res){
	res.render('lobby',{ games:games });
	});

module.exports = router;