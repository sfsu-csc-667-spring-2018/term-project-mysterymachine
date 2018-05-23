// var allCookies = document.cookie;
//
// var parseCookies = function(allCookies,string){
//     var cookieArray = allCookies.split(";");
//     for(var i = 0; i < cookieArray.length; i++){
//         if(cookieArray[i].split("=")[0] === string){
//             return cookieArray[i].split("=")[1];
//         }
//     }
// }

var selectedCard;
var is_current = false;
var color;

var renderGame = function(game) {
  console.log(game);
  const current_user = $('#user_id').val();
  setTurnOrder(game.turn_order);
  renderTopCard(game.image_address, game.face, game.color);
  if (game.cards.length == 2) {
    renderUno();
  } else {
    $("#uno_hit").html('');
  }
  
  $('#player_area .user_name').html(game.player.screen_name);
  $('#player_area .avatar').attr('src','https://www.gravatar.com/avatar/' + md5(game.player.email));
  if (game.player.seat_number == game.active_seat) {
    $('#player_area').css({"background": "rgba(152, 251, 152, .5)"})
  }else{
   $('#player_area').css({"background": "rgb(251, 184, 157, .5)"})
  }
  var user_seat = user_seat = game.player.seat_number;
  var num_players = Object.keys(game.users).length;
  var seat;
  for(i = 1; i <= num_players; i++ ){
   seat = game.player.seat_number + i;
   if(seat > num_players){
    seat = seat - num_players;
   }
   $.each(game.users, function(key,value){
      if(value.seat_number != game.player.seat_number && seat == value.seat_number){
        $('#opponent' + i + ' .user_name').html(value.screen_name);

        $('#opponent' + i).css({"opacity": 1});
        $('#opponent' + i + ' .opponent_seat').attr('src', '/img/hand_back_' + value.seat_number + '.png');
        if (value.seat_number == game.active_seat) {
            $('#opponent' + i).attr('class', 'opponent_area current_player');
            $('#opponent' + i + ' .avatar').attr('src','https://www.gravatar.com/avatar/' + md5(value.email));
        } else {
            $('#opponent' + i).attr('class', 'opponent_area');
        }
        //Reme
        if (value.uno_play) {
          $('#uno_opponent' + i).html('<img src="/img/uno.png" id="player_uno">');
        } else {
          $('#uno_opponent' + i).html('');
        }
     }
   }); 
   
  }
      
   
  // Decide whether the user is the current player
  is_current = (user_seat == game.active_seat);
  renderPlayerCards(game.cards);
  setButtonAttributes(is_current, game.skipped, game.has_drawn);
}

var renderPlayerCards = function (cards) {
  let starting_pos = 0;
  const sepperation_increments = cards.length <= 10 ? 9 : 100/cards.length;
  $("#player_hand").html('');
  var incrementor = 0;
  $.each(cards, function (index, value) {
    const html_id = 'card' + value.card_id;
    $("#player_hand").append('<img src="' + value.image_address + '" class="card" id="' + html_id + '" data-card-id="' + value.card_id + '" tabindex = "1">');
    $('#' + html_id + '').css("zIndex", incrementor);
    $('#' + html_id + '').css("left", starting_pos + '%');
    starting_pos = starting_pos + sepperation_increments;
   incrementor++
  });
}

var renderUno = function () {
  $("#uno_hit").html('<img src="/img/uno.png" id="play_uno" disabled>');
  $("#play_uno").css({"opacity": 0.2});
  $("#play_uno").click(function() {
    const game_id = $('#game_id').val();
    $.post('/game/'+ game_id + '/play_uno',
      {
        card_id: selectedCard,
        color: color
      },
      function(code, status){
        // console.log(status);
        if (status === 'success') {
          if (code == 1) {
            alert("Invalid card!");
          }
          if (code == 2) {
                $('#color_modal').modal('toggle');
          }
 
          if (code == 3) {
          // Game finished, redirect to waiting room
          window.location.href = "/room/" + game_id;
          }
          setTimeout(worker, 100);
          }
    });
  });
}

var renderTopCard = function (image_address, face, color) {
  $('#discard_pile').html('<img src="' + image_address + '" id="top_card">');
  if (face.includes('wild')) {
    $('#top_card_color').html('<img src="/img/' + color + '_dot.png" id="top_card_color_image" alt="Indicates that a player user a change color type card and chose' + color + '" title="Indicates that a player user a change color type card and chose ' + color + '" data-toggle="tooltip">');
  } else {
    $('#top_card_color').html('');
  }
}

var setTurnOrder = function (turn_order) {
  if (turn_order == -1){
   $('#turn_order_img').addClass('flipped');
   $('#turn_order_img').prop('alt', 'Indicates counterclockwise turn order');
   $('#turn_order_img').prop('title', 'Indicates counterclockwise turn order');
  }
  if (turn_order == 1){
   $('#turn_order_img').removeClass('flipped');
   $('#turn_order_img').prop('alt', 'Indicates clockwise turn order');
   $('#turn_order_img').prop('title', 'Indicates clockwise turn order');
  }
}

var clickCard = function(card) {
  $(card).css('bottom', '100%');
  $("#confirm, #play_uno").removeAttr("disabled");
  $("#confirm, #play_uno").css({"opacity": 1});
  $("#player_hand .card").off();
  $("#cancel").removeAttr("disabled");
  $("#cancel").css({"opacity": 1});
  selectedCard = $(card).attr('data-card-id');
}

var setButtonAttributes = function(is_current, skipped, has_drawn) {
  if (is_current && ! has_drawn) {
    $("#active_pile").css({"opacity": 1});
  } else {
    $("#active_pile").css({"opacity": 0.2});
  }

  if (is_current && (skipped || has_drawn)) {
    $("#skip").removeAttr("disabled");
    $("#skip").css({"opacity": 1});
  } else {
    $("#skip, #cancel, #confirm, #play_uno").prop('disabled', true);
    $("#skip, #cancel, #confirm, #play_uno").css({"opacity": 0.2});
  }

  if (is_current && !skipped) {
    $("#player_hand .card").click(function () {
      clickCard(this);
    });

    $("#cancel").click(function () {
      $("#player_hand .card").css('bottom', '0%');
      $("#confirm, #play_uno, #cancel").prop('disabled', true);
      // $("#cancel").attr("disabled");
      $("#confirm, #play_uno, #cancel").css({"opacity": 0.2});
      $("#player_hand .card").on('click', function () {
        clickCard(this);
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
  }
}

$("#top_card").click(function() {
  const game_id = $('#game_id').val();
  $.post('/game/'+ game_id + '/draw',
      {},
      function(data, status){
        // console.log(status);
        if (status === 'success') {
          setTimeout(worker, 100);
        }
  });
});

$("#skip").click(function() {
  const game_id = $('#game_id').val();
  $.post('/game/'+ game_id + '/skip_turn',
    {},
    function(data, status){
      // console.log(status);
      if (status === 'success') {
        setTimeout(worker, 100);
      }
  });
});

$("#pick_blue").click(function() {
  const game_id = $('#game_id').val();
  $.post('/game/'+ game_id + '/play',
    {
      card_id: selectedCard,
      color: "blue"
    },
    function(code, status){
      // console.log(status);
      if (status === 'success') {
        if (code == 1) {
          alert("Invalid card!");
        }
        if (code == 2) {
                $('#color_modal').modal('toggle');

        }
        if (code == 3) {
          // Game finished, redirect to waiting room
          window.location.href = "/room/" + game_id;
        }
        setTimeout(worker, 100);
      }
  });
});
$("#pick_green").click(function() {
  const game_id = $('#game_id').val();
  $.post('/game/'+ game_id + '/play',
    {
      card_id: selectedCard,
      color: "green"
    },
    function(code, status){
      // console.log(status);
      if (status === 'success') {
        if (code == 1) {
          alert("Invalid card!");
        }
        if (code == 2) {
                $('#color_modal').modal('toggle');

        }
        if (code == 3) {
          // Game finished, redirect to waiting room
          window.location.href = "/room/" + game_id;
        }
        setTimeout(worker, 100);
      }
  });
 
});
$("#pick_red").click(function() {
  const game_id = $('#game_id').val();
  $.post('/game/'+ game_id + '/play',
    {
      card_id: selectedCard,
      color: "red"
    },
    function(code, status){
      // console.log(status);
      if (status === 'success') {
        if (code == 1) {
          alert("Invalid card!");
        }
        if (code == 2) {
                $('#color_modal').modal('toggle');

        }
        if (code == 3) {
          // Game finished, redirect to waiting room
          window.location.href = "/room/" + game_id;
        }
        setTimeout(worker, 100);
      }
  });
});
$("#pick_yellow").click(function() {
  const game_id = $('#game_id').val();
  $.post('/game/'+ game_id + '/play',
    {
      card_id: selectedCard,
      color: "yellow"
    },
    function(code, status){
      // console.log(status);
      if (status === 'success') {
        if (code == 1) {
          alert("Invalid card!");
        }
        if (code == 2) {
                $('#color_modal').modal('toggle');

        }
        if (code == 3) {
          // Game finished, redirect to waiting room
          window.location.href = "/room/" + game_id;
        }
        setTimeout(worker, 100);
      }
  });
});

$("#confirm").click(function() {
  const game_id = $('#game_id').val();
  $.post('/game/'+ game_id + '/play',
    {
      card_id: selectedCard,
      color: color
    },
    function(code, status){
      // console.log(status);
      if (status === 'success') {
        if (code == 1) {
          alert("Invalid card!");
        }
        if (code == 2) {
                $('#color_modal').modal('toggle');

        }
        if (code == 3) {
          // Game finished, redirect to waiting room
          window.location.href = "/room/" + game_id;
        }
        setTimeout(worker, 100);
      }
  });
});

function worker() {
  const game_id = $('#game_id').val();
  $.ajax({
    url: '/game/' + game_id + '/details',
    success: function(game) {
      renderGame(game);
    },
    error: function(xhr, statusText) {
      window.location.href = "/room/" + game_id;
    },
    complete: function() {
      // Schedule the next request when the current one's complete
      if (!is_current) {
        setTimeout(worker, 1500);
      }
    }
  });
}

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

$("document").ready( function() {
  setTimeout(worker, 100);

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
    }
  });
});
