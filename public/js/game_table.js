var allCookies = document.cookie;

var parseCookies = function(allCookies,string){
    var cookieArray = allCookies.split(";");
    for(var i = 0; i < cookieArray.length; i++){
        if(cookieArray[i].split("=")[0] === string){
            return cookieArray[i].split("=")[1];
        }
    }
}

var renderPlayers = function() {
  const game_id = $('#game_id').val();
  const current_user = $('#user_id').val();
  $.get('/game/' + game_id + '/details', function(game) {
    console.log(game);
    if (game.turn_order == -1){
     $('#turn_order_img').addClass('flipped');
     $('#turn_order_img').prop('alt', 'Indicates counterclockwise turn order');
     $('#turn_order_img').prop('title', 'Indicates counterclockwise turn order');
    }
    if (game.turn_order == 1){
     $('#turn_order_img').removeClass('flipped');
     $('#turn_order_img').prop('alt', 'Indicates clockwise turn order');
     $('#turn_order_img').prop('title', 'Indicates clockwise turn order');
    }

    $('#discard_pile').html('<img src="' + game.image_address + '" class="card" id="top_card">');
    $.each(game.users, function (index, value) {
        if (value.user_id === current_user){
            $('#player_area .user_name').html(value.screen_name);
            $('#player_area .avatar').attr('src','https://www.gravatar.com/avatar/' + "gravatar.com/michelangelo");
        } else {
            $('#opponent' + value.seat_number + ' .user_name').html(value.screen_name);
        }
        if (value.seat_number === game.active_seat) {
            $('#opponent' + value.seat_number).attr('class', 'opponent_area current_player');
        } else {
            $('#opponent' + value.seat_number).attr('class', 'opponent_area');
        }
    });
  });
}

var selectedCard;

var renderCards = function() {
  const game_id = $('#game_id').val();
  const user_id = $('#user_id').val();
  $.get('/game/' + game_id + '/player/' + user_id + '/cards' , function(cards) {
    console.log(cards);
    let starting_pos = 0;
    const sepperation_increments = cards.length <= 10 ? 9 : 100/cards.length;
    $.each(cards, function (index, value) {
      const html_id = 'card' + value.card_id;
      $("#player_hand").append('<img src="' + value.image_address + '" class="card" id="' + html_id + '">');
      $('#' + html_id + '').css("zIndex", value.card_id);
      $('#' + html_id + '').css("left", starting_pos + '%');
      starting_pos = starting_pos + sepperation_increments;
    });
    $(".card").click(function () {
     $(this).css('bottom', '100%');
     $("#confirm, #cancel").removeAttr("disabled");
     $("#confirm, #cancel").css({"opacity": 1});
     selectedCard = $(this).css('z-index');
     $("#player_hand .card").off();
     console.log(selectedCard);
    });

    $("#cancel").click(function () {
     $("#player_hand .card").css('bottom', '0%');
     $("#confirm, #cancel").attr("disabled");
     $("#confirm, #cancel").css({"opacity": 0.2});
     $("#player_hand .card").on('click', function () {
         $(this).css('bottom', '100%');
         $("#confirm, #cancel").removeAttr("disabled");
         $("#confirm, #cancel").css({"opacity": 1});
         selectedCard = $(this).css('z-index');
         $("#player_hand .card").off();
         console.log(selectedCard);
     });
     $("#player_hand .card").on('mouseenter', function () {
        $(this).css({'box-shadow': '0px 0px 50px black'});
     });
     $("#player_hand .card").on('mouseleave', function () {
        $(this).css({'box-shadow': 'none'});
     });
     $('#card' + selectedCard + '').css({'box-shadow': 'none'});
    });

    $(".card").mouseenter(function () {
     $(this).css({
      'box-shadow': '0px 0px 50px black'
     });
    });
    $(".card").mouseleave(function () {
     $(this).css({
      'box-shadow': 'none'
     });
    });

   $(".color_picker").mouseenter(function () {
     $(this).css({
      'box-shadow': '0px 0px 50px black'
     });
    });
    $(".color_picker").mouseleave(function () {
     $(this).css({
      'box-shadow': 'none'
     });
    });
  });
}

$("document").ready( function() {
  renderPlayers();
  renderCards();
  $(".card").draggable({
    revert: 'invalid',
    bottom: '0%'
  });
  $("#discard_pile").droppable({
    drop: function (event, ui) {
      $(ui.draggable).css("zIndex", 0);

      $(".card").draggable({
        revert: 'invalid',
        bottom: '0%'
      });
      console.log("dzfsdfsdf");
    }
  });
});
