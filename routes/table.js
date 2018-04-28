//table.js
const express = require('express');
const router = express.Router();

router.get('/', function (req, res){
	// game table
	res.render('table');
	});

module.exports = router;