const socketIo = require('socket.io');

const io = socketIo();

io.sockets.on('connection', function(socket) {
	console.log('someone connected!!!');
    socket.on('room', function(room) {
    	console.log('new user joined '+room);
        socket.join(room);
        io.sockets.to(room).emit('message','new user','*joined the channel*');
    });
});

module.exports = io;