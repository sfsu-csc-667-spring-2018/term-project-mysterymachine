const express = require('express');
const router = express.Router();
const requireAuth = require('../auth/requireAuth');
const io = require('../socket');

const Games = require('../db/games');

// host/game/1
router.get('/:game_id', requireAuth, function(req, res, next) {
  console.log(req.user);
  res.render('game_table', { title: 'Playing', game_id: req.params.game_id});
});

// host/game/1/players
router.get('/:game_id/players', requireAuth, function(req, res, next) {
  console.log("get all users");
  Games.get(req.params.game_id).then (game => {
    console.log(game);
    Games.get_users(req.params.game_id).then (users => {
      console.log(users);
      res.status(200).json({game_status : game.status, current_player: game.current_player,
      users: users});
    })
  });
  // res.render('game_table', { title: 'Playing', game_id: req.params.id});
});

// host/game/1/player/1/cards
router.get('/:game_id/player/:player_id/cards', requireAuth, function(req, res, next) {
  console.log(req.params);
  Games.get_user_cards(req.params.game_id, req.params.user_id).then ( cards => {
    res.status(200).json(cards);
  });

});

// host/game/1/play/
// player plays a card
router.post(':game_id/play/',function(req,res){
  const{userID,cardID,unoCall}=req;
  res.render('game',{table:true});
});

// host/game/1/draw/
// player choses to draw a card
router.post('/:game_id/draw/',function(req,res){
  const{userID}=req;
  res.render('game',{table:true});
});

// host/game/1/playDrawn/
// player choses to play drawn card
router.post('/:game_id/playDrawn/',function(req,res){
  const{userID,cardID,unoCall}=req;
  res.render('game',{table:true});
});

// host/game/1/keep
// player choses to keep drawn card
router.post('/:game_id/keep/',function(req,res){
  const{userID}=req;
  res.render('game',{table:true});
});

router.post'/:game_id/color',function(req,res){
  const{userID, color}=req;
  res.render('game',{table:true})
}

module.exports = router;