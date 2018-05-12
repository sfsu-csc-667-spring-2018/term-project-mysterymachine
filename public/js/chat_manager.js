var loadMessages = function() {
  const game_id = $('#game_id').val();
  $.get('/message?game_id=' + game_id, function(messages) {
    console.log(messages)
    messages.forEach(function (message) {
      const time = message.time_sent.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12:true})
      const chat_content = `
      <div class="message_container sent">
        <i> ${message.screen_name}</i>: ${message.text_message}
      </div>`;
      $('#chat').append(chat_content);
    });
  })
}


$(function() {
  $('#chat').html('');
  loadMessages();

    var chat_text = '';
  $("#chat_input").on('keypress', function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        chat_text = $('#chat_input_box').val();
        $('#chat').append('<div class="message_container sent">' + chat_text + '</div>');
        chat_height = $('#chat').height();
        $('#chat_input_box').val('');
    }
});


    $("#chat_input_box").focus(function () {
        $('#chat').css({'opacity': '1.0'});
    });
    $("#chat_input_box").blur(function () {
        $('#chat').css({'opacity': '0.1'});
    });

});
