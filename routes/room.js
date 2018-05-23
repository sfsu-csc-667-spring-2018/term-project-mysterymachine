//room.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../auth/requireAuth');
const Games = require('../db/games');

// rejoin room or redirect to lobby or redirect to game
router.get('/:game_id', requireAuth, function (req, res, next) {
 Games.get_game_state(req.params.game_id).then(game => {
  const can_start = (game.host_id == req.user.user_id);
  if (game.game_status == 'IN PROGRESS') {
   res.redirect('/game/' + req.params.game_id);
  } else {
   res.render('room', {
    title: 'Waiting room',
    game_id: req.params.game_id,
    can_start: can_start,
    room: "true",
    status: game.game_status
   });
  }
 }).catch(error => {
  console.log("Error query get_game_state: " + error);
  res.redirect('/lobby');
 });
});

// toggle ready status
router.post('/:game_id/ready', requireAuth, function (req, res, next) {
 // check for user_id in game_id
 // check game_status == 0 (waiting room)
 // toggle ready/not_ready
 // emit game_status/user_state
});

// host only, start game once everyone ready (or whenever)
router.post('/:game_id/start', requireAuth, function (req, res, next) {
 // check for user_id as host for game_id
 // check game_status == 0 (waiting room)
 // change game_status = 1
 // redirect to game table
 // emit game_status
});

router.post('/:game_id/message', requireAuth, function (req, res, next) {
 // check for user_id in game_id
 // emit message to game_id
});

module.exports = router;
