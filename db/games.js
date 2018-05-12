const db = require('./index');

const get = game_id =>
  db.one('SELECT screen_name as current_player, game_status as status FROM games, users WHERE turn_order = user_id AND game_id=${game_id}', { game_id }); 

const get_users = game_id =>
  db.many(`SELECT screen_name FROM game_has_hands as g, users as u WHERE g.user_id = u.user_id AND game_id=${game_id}`, { game_id });

const get_user_cards = (game_id, user_id) =>
  db.many(`SELECT c.card_id, c.image_address FROM game_has_hands as g, hand_has_cards as h, cards as c WHERE g.hand_id = h.hand_id AND h.card_id = c.card_id and g.game_id = ${1} and g.user_id = ${2}`,
    [game_id, user_id]);

////////////////////////////////////////////////////////////////////////////////////////////////////
/*
const get_game_state = (game_id)=>{
  db.one('SELECT game_status FROM games as g WHERE g.game_id=${game_id}',{game_id});
};

const check_user_turn = (game_id,user_id) =>{
  user_id == db.one('SELECT user_id FROM games WHERE game_id = ${game_id}', {game_id});
};

const check_user_has_card = (game_id,user_id,card_id) =>{
  get_user_cards(game_id,user_id).contains(card_id);
};

const check_playable = (game_id,card_id) =>{
  //    not proper implementation
  // var active = db.one('SELECT top_card FROM game_id'); //<<<<<<<<<<<<<<<<<<<<< top_card or active_card
  // if( active.color == card_id.color || active.value == card_id.value || card_id > 99)
  //    return true;
  // else return false
};

const check_win = (game_id)=>{
  // check for player with 0 cards in their hands
};

const discard_card = (game_id,card_id)=>{

};

const draw_card = (game_id)=>{

};

const card_to_hand = (game_id,user_id,card_id)=>{

};

const remove_card = (game_id,user_id,card_id)=>{

};
*/
module.exports = {
    get,
    get_users,
    get_user_cards
};
