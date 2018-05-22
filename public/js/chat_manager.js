var chat_text = '';
const socket = io.connect();
socket.emit( 'join',
  window.location.pathname,
  document.querySelector('#screen_name').innerHTML );

$("#chat_input").on('keypress', function (event) {
  if (event.keyCode == 13) {
    console.log('sending');
    event.preventDefault();
    chat_text = $('#chat_input_box').val();
    if(chat_text){
      $.ajax({
        url: '/chat',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          "message": chat_text,
          "url": window.location.pathname
        }),
      })
    };
    $('#chat_input_box').val('');
 }
});

socket.on('message', (user, message) =>{
  console.log('message recieved');
  if(user == document.querySelector('#screen_name').innerHTML ){
    $('#chat').append('<div class="message_container" align="right"><div class="user_name">' + user + '</div><div class="message_body sent">' + message + '</div></div>');
  }else{
    $('#chat').append('<div class="message_container" ><div class="user_name">' + user + '</div><div class="message_body recived">' + message + '</div></div>');
  }
  
  document.querySelector('#chat').scrollTop +=500;
  
});

socket.on('update', (data)=>{
  // process data as json file
});

socket.on('error', (data)=>{
  // recieve error
});