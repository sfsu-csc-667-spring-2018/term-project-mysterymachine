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
  db.one('SELECT game_status, host_id FROM games as g WHERE g.game_id=${game_id}',{game_id});

const get_player_card_count = (game_id,user_id) => {
  // get list of players in game_id
  // list.getLength
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
  //    ! not proper implementation !
  // var active = db.one('SELECT top_card FROM game_id'); //<<<<<<<<<<<<<<<<<<<<< top_card or active_card
  // if( active.color == card_id.color || active.value == card_id.value || card_id > 99)
  //    return true;
  // else return false
};

// sees if anyone has won in the game provided
const check_win = (game_id)=>{
  // check all players for hand with 0 cards
};

const discard_card = (game_id,card_id)=>{
  // add card_id to game_id.discard
};

const draw_card = (game_id)=>{
  // check for zero chard deck
    // shuffle_discard if needed
  // remove card from game_id.deck and return it
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

const get_active_games = () =>
  db.any(`SELECT g.game_id, game_status, screen_name, count(*) as cnt
  FROM games g, game_has_hands h, users u
  WHERE g.host_id = u.user_id AND g.game_id = h.game_id AND g.game_status IN ('OPEN', 'IN PROGRESS')
  GROUP BY g.game_id, game_status, screen_name ORDER BY game_status desc, count(*)`);

const join_game = (game_id, user_id, seat_number) =>
  db.none(`INSERT INTO game_has_hands (game_id, user_id, seat_number) VALUES($1, $2, $3)`, [game_id, user_id, seat_number]);

const get_game_status_count = (game_id) =>
  db.one(`SELECT game_status, count(*) as cnt FROM games g, game_has_hands h
      WHERE g.game_id = ${game_id} AND h.game_id = ${game_id} GROUP BY game_status`, {game_id});


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
    join_game
};
