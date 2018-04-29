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
  $.get('/game/' + game_id + '/players', function(game) {
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
  })
}

$("document").ready( function() {
  renderPlayers();
});
