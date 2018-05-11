//lobby.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../auth/requireAuth');

var games = [
	{
		number:"NUMBER",
        host:"HOST",
        players:"COUNT",
        status:"STATUS"
    },
    {
    	number:"1",
        host:"xX_Slayer_Xx",
        players:"1",
        status:"Join"
    },
	{
		number:"2",
        host:"Mr P",
        players:"4",
        status:"In Progress"
    },
    {
    	number:"5",
        host:"BigE",
        players:"8",
        status:"In Progress"
    },
	{
		number:"5",
        host:"BigE",
        players:"8",
        status:"In Progress"
}];

router.get('/', requireAuth,function (req, res,next){
	res.render('lobby',{ games:games, title:"Lobby" });
	});

// host/lobby/message/
// user posts a message
router.post('/message',requireAuth,function(req,res,next){
    console.log('message recieved');
    const{user,body,app}=req;
    app.io.of('chat').emit('update',{message:body.message,user});
    res.status(200);
});

/*
router.post('/:game_id/message',requireAuth,function(req,res){
  // check for user_id in game_id
  // emit message to game_id
});
*/

router.post('/new',requireAuth,function(req,res,next){
    // make new game_id
    // set initial game_id values
    // add user to game_id player list
    // redirect to new game waiting room
});

module.exports = router;