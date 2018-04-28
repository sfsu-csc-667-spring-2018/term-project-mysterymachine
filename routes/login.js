//login.js

const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
	res.render('index', {title:"UNO"});
});

module.exports = router;