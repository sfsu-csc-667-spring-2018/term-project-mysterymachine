Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

$(function () {
    var player_hand = {
        "card1": {
            html_id: "card1",
            adress: "../img/cards/blue0.jpg",
            z_index: 0,
            img_pos: "0%"
        },
        "card2": {
            html_id: "card2",
            adress: "../img/cards/red6.jpg",
            z_index: 1,
            img_pos: "1%"

        },
        "card3": {
            html_id: "card3",
            adress: "../img/cards/blue0.jpg",
            z_index: 1,
            img_pos: "2%"

        },
        "card4": {
            html_id: "card4",
            adress: "../img/cards/blue0.jpg",
            z_index: 2,
            img_pos: "2%"

        },
        "card5": {
            html_id: "card5",
            adress: "../img/cards/blue0.jpg",
            z_index: 3,
            img_pos: "2%"

        },
        "card6": {
            html_id: "card6",
            adress: "../img/cards/blue0.jpg",
            z_index: 4,
            img_pos: "2%"

        },
        "card7": {
            html_id: "card7",
            adress: "../img/cards/blue0.jpg",
            z_index: 5,
            img_pos: "2%"

        },
        "card8": {
            html_id: "card8",
            adress: "../img/cards/blue0.jpg",
            z_index: 6,
            img_pos: "2%"

        },
        "card9": {
            html_id: "card9",
            adress: "../img/cards/blue0.jpg",
            z_index: 7,
            img_pos: "2%"

        },
        "card10": {
            html_id: "card10",
            adress: "../img/cards/blue0.jpg",
            z_index: 8,
            img_pos: "2%"

        },
        "card11": {
            html_id: "card11",
            adress: "../img/cards/blue0.jpg",
            z_index: 9,
            img_pos: "2%"

        },
        "card12": {
            html_id: "card12",
            adress: "../img/cards/blue0.jpg",
            z_index: 10,
            img_pos: "2%"

        },
        "card13": {
            html_id: "card13",
            adress: "../img/cards/blue0.jpg",
            z_index: 11,
            img_pos: "2%"

        },
        "card14": {
            html_id: "card14",
            adress: "../img/cards/blue0.jpg",
            z_index: 12,
            img_pos: "2%"

        }
        
    };
    
    var sepperation_increments;
    
    if(Object.size(player_hand) <= 10){
        sepperation_increments = 9;    
    }else{
      sepperation_increments = 100 / Object.size(player_hand);  
    }
    var starting_pos = 0;
    console.log();
    
    $.each(player_hand, function (key1, value1) {
        $("#player_hand").append('<img src="' + this.adress + '" class="card" id="' + this.html_id + '">');
        $('#' + this.html_id + '').css("zIndex", this.z_index);
        $('#' + this.html_id + '').css("left", starting_pos + '%');
        starting_pos = starting_pos + sepperation_increments;
    });

    $(".card").click(function () {
        $(this).css('bottom', '100%');
    });
    $(".card").mouseout(function () {
        $(this).css('bottom', '0%');
    });
    $(".card").hover(function () {
        $(this).css('bottom', '15%');
        $(this).css({'box-shadow': '0px 0px 50px black'});
    });
    $(".card").mouseout(function () {
        $(this).css({'box-shadow': 'none'});
        $(this).css('bottom', '0%');
    });

});
$( function() {
    $( ".card" ).draggable({ revert: 'invalid', bottom: '0%' });
  } );