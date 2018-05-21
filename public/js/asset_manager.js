Object.size = function (obj) {
 var size = 0,
  key;
 for (key in obj) {
  if (obj.hasOwnProperty(key)) size++;
 }
 return size;
};

var turnOrder = -1;
var selectedCard;





$(function () {

 if(turnOrder == -1){
  $('#turn_order_img').addClass('flipped');
  $('#turn_order_img').prop('alt', 'Indicates counterclockwise turn order');
  $('#turn_order_img').prop('title', 'Indicates counterclockwise turn order');
 }

 if(turnOrder == 1){
  $('#turn_order_img').removeClass('flipped');
  $('#turn_order_img').prop('alt', 'Indicates clockwise turn order');
  $('#turn_order_img').prop('title', 'Indicates clockwise turn order');
 }



 var player_hand = {
  "card1": {
   card_id: 1,
   adress: "../img/cards/blue0.jpg",
   img_pos: "0%"
  },
  "card2": {
   card_id: 2,
   adress: "../img/cards/red6.jpg",
   img_pos: "1%"

  },
  "card3": {
   card_id: 3,
   adress: "../img/cards/blue0.jpg",
   img_pos: "2%"

  },
  "card4": {
   card_id: 4,
   adress: "../img/cards/blue0.jpg",
   img_pos: "2%"

  },
  "card5": {
   card_id: 5,
   adress: "../img/cards/blue0.jpg",
   img_pos: "2%"

  },
  "card6": {
   card_id: 6,
   adress: "../img/cards/blue0.jpg",
   img_pos: "2%"

  },
  "card7": {
   card_id: 7,
   adress: "../img/cards/blue0.jpg",
   img_pos: "2%"

  },
  "card8": {
   card_id: 8,
   adress: "../img/cards/blue0.jpg",
   img_pos: "2%"

  },
  "card9": {
   card_id: 9,
   adress: "../img/cards/blue0.jpg",
   img_pos: "2%"

  }

 };

 var sepperation_increments;

 if (Object.size(player_hand) <= 10) {
  sepperation_increments = 9;
 } else {
  sepperation_increments = 100 / Object.size(player_hand);
 }
 var starting_pos = 0;

 $.each(player_hand, function (key1, value1) {
  $("#player_hand").append('<img src="' + this.adress + '" class="card" id="card' + this.card_id + '">');
  $('#card' + this.card_id + '').css("zIndex", this.card_id);
  $('#card' + this.card_id + '').css("left", starting_pos + '%');
  starting_pos = starting_pos + sepperation_increments;
 });

 $(".card").click(function () {
  $(this).css('bottom', '100%');
  $("#confirm, #cancel").removeAttr("disabled");
  $("#confirm, #cancel").css({
   "opacity": 1
  });
  selectedCard = $(this).css('z-index');
  $("#player_hand .card").off();
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
$(function () {
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
