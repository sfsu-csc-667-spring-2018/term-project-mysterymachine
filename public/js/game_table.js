var players = {
    "player1":{
        "user_name": "Michelangelo",
        "avatar": "gravatar.com/michelangelo"
    },
    "player2":{
        "user_name": "Lillyyyyyy",
        "avatar": "gravatar.com/lillyyyyyy"
    },
    "player3":{
        "user_name": "Devil_666",
        "avatar": "gravatar.com/I_Love_The_Devil_666"
    },
    "player4":{
        "user_name": "XxXSlayerXxX",
        "avatar": "gravatar.com/XxXSlayerXxX"
    },
    "player5":{
        "user_name": "IceT",
        "avatar": "gravatar.com/IceT"
    },
    "player6":{
        "user_name": "Mr. P",
        "avatar": "gravatar.com/Mr.P"
    },
    "player7":{
        "user_name": "MastChief",
        "avatar": "gravatar.com/MastChief"
    },
    "player8":{
        "user_name": "bob_the_blob",
        "avatar": "92b10383386beab2153b39a524811a29"
    }
}

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
  const current_user = $('#screen_name').val();
  $.get('/game/' + game_id + '/details', function(game) {
    console.log(game);
    let i = 1;
    $.each(game.users, function (key, value) {
        if(this.screen_name === current_user){
            $('#player_area .user_name').html(this.screen_name);
            $('#player_area .avatar').attr('src','https://www.gravatar.com/avatar/' + "gravatar.com/michelangelo");
        } else {
            $('#opponent' + i + ' .user_name').html(this.screen_name);
            if (this.screen_name === game.current_player) {
              $('#opponent' + i).attr('class', 'opponent_area current_player');
            } else {
              $('#opponent' + i).attr('class', 'opponent_area');
            }
        }
        i++;
    });
  });
}

var renderCards = function() {
  const game_id = $('#game_id').val();
  const user_id = $('#user_id').val();
  $.get('/game/' + game_id + '/player/' + user_id + '/cards' , function(cards) {
    console.log(cards);
    let i = 1;
    let starting_pos = 0;
    const sepperation_increments = cards.length <= 10 ? 9 : 100/cards.length;
    $.each(cards, function (key, value) {
      const html_id = 'card' + i;
      $("#player_hand").append('<img src="' + this.image_address + '" class="card" id="' + html_id + '">');
      $('#' + html_id + '').css("zIndex", i - 1);
      $('#' + html_id + '').css("left", starting_pos + '%');
      starting_pos = starting_pos + sepperation_increments;
      i++;
    });
    $(".card").click(function () {
        $(this).css('bottom', '100%');
    });
    $(".card").mouseout(function () {
        $(this).css('bottom', '0%');
    });
    $(".card").hover(function () {
        $(this).css({'box-shadow': '0px 0px 50px black'});
    });
    $(".card").mouseout(function () {
        $(this).css({'box-shadow': 'none'});
    });
    $(".card").draggable({ revert: 'invalid', bottom: '0%' });
  });
}

$("document").ready( function() {
  renderPlayers();
  renderCards();
});
