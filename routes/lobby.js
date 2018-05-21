//lobby.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../auth/requireAuth');
const Games = require('../db/games');


router.get('/', requireAuth,function (req, res,next){
	res.render('lobby',{ title:"Lobby",lobby:"true" });
	});

router.get('/games', requireAuth, function(req, res, next) {
	Games.get_active_games().then(games => {
    res.status(200).json(games);
	});
});

// host/lobby/message/
// user posts a message
router.post('/message',requireAuth,function(req,res,next){
    console.log('message recieved');
    const{user,body,app}=req;
    app.io.of('chat').emit('update',{message:body.message,user});
    res.status(200);
});


router.post('/:game_id/message',requireAuth,function(req,res){
  // check for user_id in game_id
  // emit message to game_id
});

// rejoin game, or redirect to lobby, or redirect to waiting room
router.post('/:game_id',requireAuth,function(req,res,next){
    // check: if user is already in the game
        // redirect to host/game/:game_id
    // check if game is full
        // return failed message

    // add user to game
    // redirect to host/room/:game_id
});

// make new game from lobby, then redirect to waiting room
router.post('/new',requireAuth,function(req,res,next){
    // make new game_id
    // set initial game_id values
    // add user to game_id player list
    // redirect to new room

});

module.exports = router;
