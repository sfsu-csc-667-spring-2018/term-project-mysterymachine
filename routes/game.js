const express = require('express');
const router = express.Router();
const passport = require('../auth');
const io = require('../socket');

// host/game/
router.get('/', function (req, res, next){
	// game table
	res.render('game',{table:true});
});

// host/game/play/:roomID
// player plays a card
router.post('/play/:roomID',function(req,res){
	const{userID,cardID,unoCall}=req;
	res.render('game',{table:true});
});

// host/game/draw/:roomID
// player choses to draw a card
router.post('/draw/:roomID',function(req,res){
	const{userID}=req;
	res.render('game',{table:true});
});

// host/game/draw/play:roomID
// player choses to play drawn card
router.post('/draw/play/:roomID',function(req,res){
	const{userID,cardID,unoCall}=req;
	res.render('game',{table:true});
});

// host/game/draw/keep:roomID
// player choses to keep drawn card
router.post('/draw/keep/:roomID',function(req,res){
	const{userID}=req;
	res.render('game',{table:true});
});

module.exports = router;