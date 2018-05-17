var chat_text = '';
var socket = io(window.location.pathname);

$("#chat_input").on('keypress', function (event) {
  console.log('sending');
  if (event.keyCode == 13) {
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
  console.log('recieving');
$('#chat').append('<div class="message_container"><div class="user_name">' + user + '</div><div class="message_body">' + message + '</div></div>');
 });


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
