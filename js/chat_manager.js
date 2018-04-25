
$(function() {
    
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