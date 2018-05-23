//lobby.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../auth/requireAuth');
const Games = require('../db/games');

router.get('/', requireAuth, function (req, res, next) {
 res.render('lobby', {
  title: "Lobby",
  lobby: "true"
 });
});

router.get('/games', requireAuth, function (req, res, next) {
 Games.get_active_games().then(games => {
  res.status(200).json(games);
 });
});

module.exports = router;
