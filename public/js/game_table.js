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

  let user_seat = -1;
  $.each(game.users, function (index, value) {
      if (value.user_id == current_user){
          user_seat = value.seat_number;
          $('#player_area .user_name').html(value.screen_name);
          $('#player_area .avatar').attr('src','https://www.gravatar.com/avatar/' + "gravatar.com/michelangelo");
      } else {
          $('#opponent' + value.seat_number + ' .user_name').html(value.screen_name);
      }
      $('#opponent' + value.seat_number).css({"opacity": 1});
      if (value.seat_number == game.active_seat) {
          $('#opponent' + value.seat_number).attr('class', 'opponent_area current_player');
      } else {
          $('#opponent' + value.seat_number).attr('class', 'opponent_area');
      }
  });
  // Decide whether the user is the current player
  is_current = (user_seat == game.active_seat);
  renderPlayerCards(game.cards);
  setButtonAttributes(is_current, game.skipped, game.has_drawn);
}

var renderPlayerCards = function (cards) {
  let starting_pos = 0;
  const sepperation_increments = cards.length <= 10 ? 9 : 100/cards.length;
  $("#player_hand").html('');
  $.each(cards, function (index, value) {
    const html_id = 'card' + value.card_id;
    $("#player_hand").append('<img src="' + value.image_address + '" class="card" id="' + html_id + '">');
    $('#' + html_id + '').css("zIndex", value.card_id);
    $('#' + html_id + '').css("left", starting_pos + '%');
    starting_pos = starting_pos + sepperation_increments;
  });
}

var renderUno = function () {
  $("#uno_hit").html('<img src="/img/uno.png" id="play_uno" disabled>');
  $("#play_uno").css({"opacity": 0.2});
  $("#play_uno").click(function() {
    console.log("Play uno");
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
            alert("Please select a color for the wild card!");
          }
          setTimeout(worker, 100);
        }
    });
  });
}

var renderTopCard = function (image_address, face, color) {
  $('#discard_pile').html('<img src="' + image_address + '" id="top_card">');
  if (face.includes('wild')) {
    $('#top_card_color').html('<img src="/img/' + color + '_half_circle.png" id="top_card_color_image">');
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
  selectedCard = $(card).css('z-index');
  console.log(selectedCard);
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
  color = "blue";
});
$("#pick_green").click(function() {
  color = "green";
});
$("#pick_red").click(function() {
  color = "red";
});
$("#pick_yellow").click(function() {
  color = "yellow";
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
          alert("Please select a color for the wild card!");
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
        setTimeout(worker, 3000);
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
      console.log("dzfsdfsdf");
    }
  });
});
