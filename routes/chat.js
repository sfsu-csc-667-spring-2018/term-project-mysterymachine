const express = require('express');
const router = express.Router();
const io = require('../socket');

router.get('/', function (req, res, next){
	res.render('chat-test');
});

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

module.exports = router;