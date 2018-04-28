//table.js
const express = require('express');
const router = express.Router();

// host/table/
router.get('/', function (req, res){
	// game table
	res.render('table',{table:true});
	});

// host/table/message/:roomID
// player posts a message
router.post('/message/:roomID',function(req,res){
	const{userID,message}=req;
});

// host/table/play/:roomID
// player plays a card
router.post('/play/:roomID',function(req,res){
	const{userID,cardID,unoCall}=req;
	res.render('tabe',{table:true});
});

// host/table/draw/:roomID
// player choses to draw a card
router.post('/draw/:roomID',function(req,res){
	const{userID}=req;
	res.render('tabe',{table:true});
});

// host/table/draw/play:roomID
// player choses to play drawn card
router.post('/draw/play/:roomID',function(req,res){
	const{userID,cardID,unoCall}=req;
	res.render('tabe',{table:true});
});

// host/table/draw/keep:roomID
// player choses to keep drawn card
router.post('/draw/keep/:roomID',function(req,res){
	const{userID}=req;
	res.render('tabe',{table:true});
});

module.exports = router;