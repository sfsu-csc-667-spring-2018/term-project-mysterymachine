const express = require('express');
const router = express.Router();
const io = require('../socket');

router.get('/', function (req, res, next){
	res.render('chat-test');
});

/*
// host/chat/message/:roomID
// player posts a message
router.post('/message',function(req,res){
	//console.log(req);
	//const{userID,message}=req;
	var message = req.body;
	//console.log(message);
	io.emit('message',message);
	//app.io.of('message').emit('message',{message:body.message});
	res.sendStatus(200);
});
*/

router.post('/', (req, res, next) => {

    const room = req.body.url;
    const user = req.user.screen_name
    const message = req.body.message;

    console.log('room: ' + room);
    console.log('user: ' + req.user.screen_name);
    console.log('message: ' + message);

	const roomSocket = io.of(room);
    roomSocket.emit('message', {user, message});
    io.sockets.emit('message',"hello");
    

    res.sendStatus(200);
});


module.exports = router;