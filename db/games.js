const db = require('./index');

const get = game_id =>
  db.one('SELECT screen_name as current_player, game_status as status FROM games, users WHERE active_seat = user_id AND game_id=${game_id}',
    { game_id });

const get_users = game_id =>
  db.many(`SELECT screen_name, seat_number FROM game_has_hands as g, users as u WHERE g.user_id = u.user_id AND game_id=${game_id} ORDER BY seat_number`,
    { game_id });

const get_user_cards = (game_id, user_id) =>
  db.many(`SELECT c.card_id, c.image_address
    FROM game_has_hands as g, hand_has_cards as h, cards as c
    WHERE g.hand_id = h.hand_id AND h.card_id = c.card_id and g.game_id = ${1} and g.user_id = ${2}`,
    [game_id, user_id]);

////////////////////////////////////////////////////////////////////////////////////////////////////

const get_game_state = (game_id)=>
  db.one('SELECT game_status, host_id FROM games as g WHERE g.game_id=${game_id}',{game_id});

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
const check_playable = (game_id,card_id) =>
 db.one('SELECT * FROM active_card WHERE color = (SELECT color FROM cards WHERE card_id = ${1}) OR face = (SELECT face FROM cards WHERE card_id = ${1}) AND game_id = ${2}',[card_id,game_id]);

// sees if anyone has won in the game provided
const check_win = (game_id)=>{
  db.one('SELECT user_id FROM game_has_hands WHERE hand_id NOT IN (SELECT hand_id FROM hand_has_cards) AND game_id = ${1}',[game_id]).catch( error=> console.log("ERROR: ",error));
};



const discard_card = (game_id,user_id,card_id)=>{
  db.one('DELETE FROM hand_has_cards WHERE hand_id = (SELECT hand_id FROM game_has_hands WHERE game_id = ${1} AND user_id = {2}) AND card_id = ${3}',[game_id,user_id,card_id]).catch( error=> console.log("ERROR: ",error));
};

const draw_card = (game_id,num_of_cards,hand_id)=>
  db.one('WITH getval(card_id) AS (DELETE FROM active_pile WHERE ctid IN (SELECT ctid FROM active_pile WHERE game_id = ${1} ORDER BY random() LIMIT ${2}) RETURNING card_id) INSERT INTO hand_has_cards (hand_id,card_id) SELECT (SELECT hand_id FROM game_has_hands WHERE game_id = ${1} AND user_id = ${2}), card_id FROM getval;',[game_id,num_of_cards,hand_id]);

const card_to_hand = (game_id,user_id,card_id)=>{
  db.one('INSERT INTO hand_has_cards (hand_id,card_id) VALUES ((SELECT hand_id FROM game_has_hands WHERE game_id = ${1} AND user_id = ${2}),${3})',[game_id,user_id,card_id]).catch( error=> console.log("ERROR: ",error));
};

const remove_card = (game_id,user_id,card_id)=>{
  // remove card from game_id.user_id.hand that matches card_id
  if( check_user_has_card(game_id,user_id,card_id) ){

  }
};

const shuffle_discard = (game_id)=>{
  db.none('INSERT INTO active_pile (game_id,card_id) VALUES SELECT card_id , ${1} FROM discard_pile WHERE game_id = ${1}',[game_id]).catch( error=> console.log("ERROR: ",error));
  db.none('DELETE FROM discard_pile WHERE game_id = ${1}',[game_id]).catch( error=> console.log("ERROR: ",error));
};

const next_player = (game_id)=>{
  db.one('UPDATE games SET active_seat = (active_seat + turn_order) WHERE game_id = ' + game_id + '').catch( error=> console.log("ERROR: ",error));
};

// creates a new game with user_id as host
const new_game = (user_id) =>
  db.none(`WITH getval(game_id) as (INSERT INTO games (game_status, turn_direction, active_seat,host_id) VALUES ('joining',1,1,$1) RETURNING game_id) INSERT INTO game_has_hands (user_id, game_id, seat_number) SELECT $1, game_id, 1 FROM getval`,[user_id]);


const update_game_status = (game_id,game_status) =>
  db.none('UPDATE games SET game_status = ${2} WHERE game_id = ${1}',[game_id,game_status]);


const get_active_games = () =>
  db.any(`CREATE OR REPLACE VIEW player_count AS SELECT g.game_id, count(hand_id) AS num_of_players FROM games AS g, game_has_hands AS ghh WHERE g.game_id = ghh.game_id AND game_status IN ('joining','waiting','locked','colorDecision','drawDecision') GROUP BY g.game_id;SELECT g.game_id, screen_name, num_of_players, game_status FROM games AS g, users AS u, game_has_hands AS ghu, player_count AS pc WHERE g.game_id = ghu.game_id AND u.user_id = ghu.user_id AND g.game_id = pc.game_id AND game_status IN ('joining','waiting','locked','colorDecision','drawDecision') AND seat_number = 1`);
 


const join_game = (game_id, user_id, seat_number) =>
  db.none(`INSERT INTO game_has_hands (game_id, user_id, seat_number) VALUES($1, $2, $3)`, [game_id, user_id, seat_number]);

const get_game_status_count = (game_id) =>
  db.one(`SELECT game_status, count(*) as cnt FROM games g, game_has_hands h
      WHERE g.game_id = ${game_id} AND h.game_id = ${game_id} GROUP BY game_status`, {game_id});

const check_game_user = (game_id, user_id) =>
  db.one('SELECT * FROM game_has_hands WHERE game_id = $1 AND user_id = $2', [game_id,user_id]);

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
    new_game,
    get_active_games,
    get_game_status_count,
    check_game_user,
    join_game
};