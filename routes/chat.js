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
    const {message} = request.body;
    const user = request.user.screen_name;

    console.log('chat route chat: ' + message);

    request.app.io.of('lobby').emit('message', {user, message});

    response.sendStatus(200);
});

module.exports = router;