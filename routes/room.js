//room.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../auth/requireAuth');

router.get('/:game_id',requireAuth, function(req, res,next){
	// if game_status == 0 (waiting room)
	res.render('room', { title: 'Waiting Room', game_id: req.params.game_id});
	// else render 'game'
});

// toggle ready status
router.post('/:game_id/ready',requireAuth, function(req, res,next){
	// check for user_id in game_id
	// check game_status == 0 (waiting room)
	// toggle ready/not_ready
	// emit game_state/user_state
	});

// host only, start game
router.post('/:game_id/start',requireAuth, function(req, res,next){
	// check for user_id as host for game_id
	// check game_status == 0 (waiting room)
	// change game_status = 1
	// redirect to game table
	// emit game_state
	});

router.post('/:game_id/message',requireAuth,function(req,res, next){
  // check for user_id in game_id
  // emit message to game_id
});

module.exports = router;