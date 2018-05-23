const socketIo = require('socket.io');
const io = socketIo();

io.sockets.on('connection', function (socket) {
 console.log('someone connected!!!');

 socket.on('join', function (room, user) {
  console.log('new user joined ' + room);

  socket.join(room);
  socket.join(room + '/' + user);
  io.sockets.to(room).emit('message', user, '*joined the channel*');
  //io.sockets.to(user).emit('message','SERVER','Welcome to '+room+', '+user);
 });
});

module.exports = io;
