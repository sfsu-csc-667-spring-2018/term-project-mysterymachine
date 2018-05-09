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
