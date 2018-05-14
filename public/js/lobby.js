/*const socket = io('/lobby');

document.querySelector('#chat-message-form').addEventListener('submit', event => {
    event.stopPropagation();
    event.preventDefault();

    const message = document.querySelector('#message').value;
    fetch('/chat', {
        body: JSON.stringify({message}),
        credentials: 'include',
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'})
    });

    console.log('lobby event listener: ' + JSON.stringify({message}));
    document.getElementById('chat-message-form').reset();
});

socket.on('message', ({message}) => {
    console.log('lobby listener');
    var parent = document.createElement('parent');
    var child = document.createElement('child');
    var chatBox = document.getElementById('chatbox');
    var messages = document.querySelector('#messages');

    child.className = 'child-message';
    child.innerText = user + ': ' + message;
    parent.appendChild(child);
    messages.appendChild(parent);
})*/

$(function () {
  var chat_text = '';

 var socket = io('/lobby');
 $("#chat_input").on('keypress', function (event) {
  if (event.keyCode == 13) {
   event.preventDefault();
   chat_text = $('#chat_input_box').val();
   $.ajax({
    //url: '/chat/message',
    url: '/chat',
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


 socket.on('message', function (message, user_name) {
$('#chat').append('<div class="message_container"><div class="user_name">' + message.user_name + '</div><div class="message_body">' + message.body + '</div></div>');
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