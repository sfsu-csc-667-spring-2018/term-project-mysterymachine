<<<<<<< HEAD
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

//CHAT
router.post('/game_id/chat', (req, res, next) => {
    let {message} = request.body;
    let game_id = request.params.game_id;
    let user = request.user.screen_name;

    console.log('game route chat: ' + message);

    request.app.io.of('/game/${game_id}').emit('message', {
        game_id,
        message,
        user
    });
    response.sendStatus(200);
});

module.exports = router;
=======
var express = require('express');
var router = express.Router();
const requireAuth = require('../auth/requireAuth');

const Games = require('../db/games');

router.get('/:id', requireAuth, function(req, res, next) {
  console.log(req.user);
  res.render('game_table', { title: 'Playing', game_id: req.params.id});
});

router.get('/:id/players', requireAuth, function(req, res, next) {
  console.log("get all users");
  Games.get(req.params.id).then (game => {
    console.log(game);
    Games.get_users(req.params.id).then (users => {
      console.log(users);
      res.status(200).json({game_status : game.status, current_player: game.current_player,
      users: users});
    })

  });
  // res.render('game_table', { title: 'Playing', game_id: req.params.id});
});

router.get('/:game_id/player/:player_id/cards', requireAuth, function(req, res, next) {
  console.log(req.params);
  Games.get_user_cards(req.params.game_id, req.params.user_id).then ( cards => {
    res.status(200).json(cards);
  });

});

module.exports = router;
>>>>>>> aebbfff90a6109abbfddf0e3bfad1aeb0c27f30e
