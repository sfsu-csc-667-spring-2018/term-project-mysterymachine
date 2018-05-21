const express = require('express');
const router = express.Router();
const io = require('../socket');

router.get('/', function (req, res, next){
	res.render('chat-test');
});

router.post('/', (req, res, next) => {

    const room = req.body.url;
    const user = req.user.screen_name;
    const message = req.body.message;

	io.sockets.to(room).emit('message',user,message);
    
    res.sendStatus(200);
});

module.exports = router;