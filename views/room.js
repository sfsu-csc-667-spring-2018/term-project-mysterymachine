// room.js
const express = require('express');
const router = express.Router();

// host/room/
// player creates a room
router.post('/', function (req, res){
	const{userID}=req;
	res.render('room');
	});

// host/room/join/:roomID
// player joins a room
router.get('/join/:roomID',function(req,res){
	const{userID}=req;
	res.render('room');
});

// host/room/message/:roomID
// player send a message
router.post('/message/:roomID',function(req,res){
	const{userID,message}=req;
});

module.exports = router;