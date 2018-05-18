var chat_text = '';
const socket = io.connect();

$(document).ready(function() {
  socket.emit('room',window.location.pathname)
});

$("#chat_input").on('keypress', function (event) {
  if (event.keyCode == 13) {
    console.log('sending');
    event.preventDefault();
    chat_text = $('#chat_input_box').val();
    $.ajax({
    //url: '/chat/message',
    url: '/chat',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      "message": chat_text,
      "url": window.location.pathname
      }),
  });
    $('#chat_input_box').val('');
 }
});

socket.on('message', function (user, message) {
  console.log('message recieved');
  $('#chat').append('<div class="message_container"><div class="user_name">' + user + '</div><div class="message_body">' + message + '</div></div>');
});
/*
$("#chat_input_box").focus(function () {
  $('#chat').css({
   'opacity': '1.0'
  });
 });
 $("#chat_input_box").blur(function () {
  $('#chat').css({
   'opacity': '0.1'
  });
 });
*/