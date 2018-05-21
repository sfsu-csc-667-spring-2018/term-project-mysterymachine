var chat_text = '';
const socket = io.connect();
socket.emit('join',window.location.pathname,document.querySelector('#screen_name').innerHTML);

$("#chat_input").on('keypress', function (event) {
  if (event.keyCode == 13) {
    console.log('sending');
    event.preventDefault();
    chat_text = $('#chat_input_box').val();
    $.ajax({
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

socket.on('message', (user, message) =>{
  console.log('message recieved');
  $('#chat').append('<div class="message_container"><div class="user_name">' + user + '</div><div class="message_body">' + message + '</div></div>');
});

socket.on('update', (data)=>{
  // process data as json file
});

socket.on('error', (data)=>{
  // recieve error
});