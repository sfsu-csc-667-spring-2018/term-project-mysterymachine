/*const socket = io('/game/${game_id}');

document.querySelector('#chat-message-form').addEventListener('submit', event => {
    fetch('game/${game_id}/chat', {
        body: JSON.stringify({message}),
        credentials: 'include',
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'})
    });
});

socket.on('message', ({game_id, message}) => {
    //append
})
*/

$(function () {
 var chat_text = '';

 var socket = io('/game/${game_id}');
 $("#chat_input").on('keypress', function (event) {
  if (event.keyCode == 13) {
   event.preventDefault();
   chat_text = $('#chat_input_box').val();
   $.ajax({
    //url: '/chat/message',
    url: '/game/${game_id}/chat',
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
 socket.on('message', function (message, user_name, game_id) {
  $('#chat').append('<div class="message_container"><div class="user_name">' +
   message.user_name + '</div><div class="message_body">' +
   message.body + '</div></div>');
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
});
