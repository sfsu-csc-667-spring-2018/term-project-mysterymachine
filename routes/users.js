var express = require('express');
var router = express.Router();
const passport = require('../auth');
const User = require('../db/users');

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/game',
    failureRedirect: '/'
  })
);

router.get('/logout', (request, response) => {
  request.logout();
  response.redirect('/');
});

router.post('/register', function(req, res, next) {
  console.log(req.body);
  User.create(req.body.email, req.body.screen_name, req.body.password)
    .then(id => {
      res.redirect('/');
      });
});

module.exports = router;