var express = require('express');
var router = express.Router();
const passport = require('../auth');
const User = require('../db/users');

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/lobby',
    failureRedirect: '/'
  })
);

router.get('/logout', (request, response) => {
  request.logout();
  response.redirect('/');
});

router.get('/find/:email', (req, res) => {
  User.find(req.params.email).then(user => {
    res.status(200).json(user.user_id);
  }).catch( error => {
    // console.log( "ERROR: ", error );
    res.status(200).json(-1);
  } );
});

router.post('/register', function(req, res, next) {
  console.log(req.body);
  User.create(req.body.email, req.body.screen_name, req.body.password)
    .then(id => {
      res.redirect('/');
      });
});

module.exports = router;