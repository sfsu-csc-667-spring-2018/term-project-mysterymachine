const express = require('express');
const router = express.Router();
const requireAuth = require('../auth/requireAuth');
const io = require('../socket');

const Games = require('../db/games');

// host/game/1
router.get('/:game_id', requireAuth, function(req, res, next) {
  console.log(req.user);
  res.render('game', { table:true, title: 'Playing', game_id: req.params.game_id});
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

// host/game/1/play/12
// player plays a card
router.post(':game_id/play/:card_id',requireAuth, function(req,res){
  // check for correct user/turn
  // check for correct game status
  // check for playable card
  // change game status to busy (playing)

  // remove card id from player
  // play card function( card_id )
    // add card_id to discard/active
    // if single card remains in hand and no Uno call, force draw 2
    // apply card effects to game
      // change game_state color (?)
      // if numbered
        // pass turn
        // change game status to 'waiting for play'
      // if skip
        // pass turn twice
        // change game status to 'waiting for play'
      // if reverse
        // reverse turn order (1,-1)
        // pass turn
        // change game status to 'waiting for play'
      // if draw 2
        // then pass turn 
        // force draw 2
        // change game status to 'waiting for play'
      // if wild or wild 4
        // change game status to 'waiting for color decision'
        // emit color decision
    // end function
  // emit new game_state
});

// host/game/1/draw/
// player choses to draw a card
router.post('/:game_id/draw/',requireAuth,function(req,res){
  // check for correct user/turn
  // check for correct game status
  // change game status to busy(playing)

  // draw from deck
  // check if drawn card is playable

  // if not playable
    // add to player hand
    // pass turn
    // change game status to 'waiting for play'
  // else
    // save card_id in game_state
    // change game status to 'waiting for draw decision'
  // emit game_state
});

// host/game/1/playDrawn/
// player choses to play drawn card
router.post('/:game_id/playDrawn/',requireAuth,function(req,res){
  // check for correct user/turn
  // check for correct game status
  // change game status to busy(playing)

  // get card_id from game_state
  // play card function(card_id)
    // add card_id to discard/active
    // if single card remains in hand and no Uno call, force draw 2
    // apply card effects to game
      // change game_state color (?)
      // if numbered
        // pass turn
        // change game status to 'waiting for play'
      // if skip
        // pass turn twice
        // change game status to 'waiting for play'
      // if reverse
        // reverse turn order (1,-1)
        // pass turn
        // change game status to 'waiting for play'
      // if draw 2
        // then pass turn 
        // force draw 2
        // change game status to 'waiting for play'
      // if wild or wild 4
        // change game status to 'waiting for color decision'
        // emit color decision
    // end function

    // emit game state
});

// host/game/1/keep
// player choses to keep drawn card
router.post('/:game_id/keep/',requireAuth,function(req,res){
  // check for correct user/turn
  // check for correct game status
  // change game status to busy(playing)

  // move card_id from game_state to player_hand
  // pass turn
  // change game status to 'waiting for play'
  // emit game_state
});

// host.game/1/color
// player choses a color for their wild card
router.post('/:game_id/color/:color',requireAuth,function(req,res){
  // check for correct user/turn
  // check for correct game status
  // change game status to busy(playing)

  // change color
  // pass turn
  // if discard/active is 'wild 4'
    // force draw 4
  // pass turn (skip)
  // change game status to 'waiting for play'
  // emit game_state
});

router.post('/:game_id/message',requireAuth,function(req,res){
  // check for user_id in game_id
  // emit message to game_id
});

module.exports = router;