const db = require('./index');

const get = game_id =>
  db.one('SELECT screen_name as current_player, game_status as status FROM games, users WHERE active_seat = user_id AND game_id=${game_id}',
    { game_id });

const get_users = game_id =>
  db.many(`SELECT screen_name FROM game_has_hands as g, users as u WHERE g.user_id = u.user_id AND game_id=${game_id}`,
    { game_id });

const get_user_cards = (game_id, user_id) =>
  db.many(`SELECT c.card_id, c.image_address
    FROM game_has_hands as g, hand_has_cards as h, cards as c
    WHERE g.hand_id = h.hand_id AND h.card_id = c.card_id and g.game_id = ${1} and g.user_id = ${2}`,
    [game_id, user_id]);

////////////////////////////////////////////////////////////////////////////////////////////////////

const get_game_state = (game_id)=>
  db.one('SELECT game_status FROM games as g WHERE g.game_id=${game_id}',{game_id});

const get_player_card_count = (game_id,user_id) => {
  db.one('SELECT user_id, count(hand_has_cards.card_id) AS number_of_cards_in_hand FROM hand_has_cards, game_has_hands WHERE hand_has_cards.hand_id = game_has_hands.hand_id AND game_id = ' + game_id + ' GROUP BY user_id').catch( error=> console.log("ERROR: ",error));
};

// checks if this user is able to make a play
const check_user_turn = (game_id,user_id) =>{
  db.one('SELECT user_id FROM games WHERE game_id = ${1} AND current_player = ${2}', [game_id,user_id])
    .catch( error=> console.log("ERROR: ",error));
};

// makes sure the user has a card
const check_user_has_card = (game_id,user_id,card_id) =>{
  get_user_cards(game_id,user_id).contains(card_id);
};

// sees if the card provided is playable agains the active card
const check_playable = (game_id,card_id) =>{
 db.one('SELECT * FROM active_card WHERE color = (SELECT color FROM cards WHERE card_id = ' + card_id + ') OR face = (SELECT face FROM cards WHERE card_id = ' + card_id + ') AND game_id = ' + game_id + '')
  .catch( error=> console.log("ERROR: ",error));
  //    ! not proper implementation !
  // var active = db.one('SELECT top_card FROM game_id'); //<<<<<<<<<<<<<<<<<<<<< top_card or active_card
  // if( active.color == card_id.color || active.value == card_id.value || card_id > 99)
  //    return true;
  // else return false
};

// sees if anyone has won in the game provided
const check_win = (game_id)=>{
  db.one('SELECT user_id FROM game_has_hands WHERE hand_id NOT IN (SELECT hand_id FROM hand_has_cards) AND game_id =' + game_id + '').catch( error=> console.log("ERROR: ",error));
};



const discard_card = (game_id,user_id,card_id)=>{
  db.one('DELETE FROM hand_has_cards WHERE hand_id = (SELECT hand_id FROM game_has_hands WHERE game_id = ' + game_id + ' AND user_id = ' + user_id + ') AND card_id =  ' + card_id + '').catch( error=> console.log("ERROR: ",error));
};

const draw_card = (game_id,num_of_cards,hand_id)=>{
  const card_id db.one('DELET FROM active_pile WHERE card_id = (SELECT card_id FROM active_pile WHERE game_id = ' +  game_id + ' LIMIT ' + num_of_cards + ') RETURNING card_id').catch( error=> console.log("ERROR: ",error));
  db.one('INSERT INTO hand_has_cards (hand_id,card_id) VALUES (' + hand_id + ',' + card_id + ')')
};

const card_to_hand = (game_id,user_id,card_id)=>{
  // insert card_id into game_id.user_id.hand
};

const remove_card = (game_id,user_id,card_id)=>{
  // remove card from game_id.user_id.hand that matches card_id
  if( check_user_has_card(game_id,user_id,card_id) ){

  }
};

const shuffle_discard = (game_id)=>{
  // except for top card in discard, insert all cards in game_id.discard into game_id.deck
};

const next_player = (game_id)=>{
  // number_position = game_id.current_player.number_position
  // turn_rotation = game_id.turn_rotation
  // number_position += turn_rotation
  // game_id.current_player = game_id.player_at_position(number_position)
};

// creates a new game with user_id as host
const new_game = (user_id) =>{
  // generate new game
};


module.exports = {
    get,
    get_users,
    get_user_cards,
    get_game_state,
    check_user_turn,
    check_user_has_card,
    check_playable,
    check_win,
    discard_card,
    draw_card,
    card_to_hand,
    remove_card,
    shuffle_discard,
    next_player,
    new_game
};
