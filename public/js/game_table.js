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

var renderPlayers = function(players,user_name){
    var i = 1;
    $.each(players, function (key, value) {
        if(this.user_name === user_name){
            $('#player_area .user_name').html(this.user_name);
            $('#player_area .avatar').attr('src','https://www.gravatar.com/avatar/' + this.avatar);
        }else{
            $('#opponent' + i + ' .user_name').html(this.user_name);    
        }
        i++;
    });
}

$(function() {
    var user_name = parseCookies(allCookies,"user_name");
    console.log(user_name);
    renderPlayers(players,user_name);    
});