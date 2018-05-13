$(function () {
  var chat_text = '';
/*
 var socket = io();
 $("#chat_input").on('keypress', function (event) {
  if (event.keyCode == 13) {
   event.preventDefault();
   chat_text = $('#chat_input_box').val();
   $.ajax({
    url: '/chat/message',
    type: 'POST',
    data: {
     'body': chat_text
    },
    header: {
     'content-type': 'text'
    },
   });
   $('#chat_input_box').val('');
  }
 });

 socket.on('message', function (message) {
$('#chat').append('<div class="message_container"><div class="user_name">' + message.user_name + '</div><div class="message_body">' + message.body + '</div></div>'); 
 });
*/

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
});
