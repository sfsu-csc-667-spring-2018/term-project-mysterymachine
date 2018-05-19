const db = require('./index');

const get = game_id =>
  db.one('SELECT active_seat, turn_order, face, color, image_address FROM games, cards WHERE top_card_id = card_id AND game_id=${game_id}',
    { game_id });

const get_users = game_id =>
  db.many(`SELECT u.user_id, screen_name, seat_number FROM game_has_hands as g, users as u WHERE g.user_id = u.user_id AND game_id=${game_id} ORDER BY seat_number`,
    { game_id });

const get_user_cards = (game_id, user_id) => {
  return db.many(`SELECT c.card_id, c.image_address
    FROM game_has_hands as g, hand_has_cards as h, cards as c
    WHERE g.hand_id = h.hand_id AND h.card_id = c.card_id and g.game_id = $1 and g.user_id = $2`,
    [game_id, user_id]);
  }

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
const check_playable = (game_id,card_id) =>{
 db.one('SELECT * FROM active_card WHERE color = (SELECT color FROM cards WHERE card_id = ' + card_id + ') OR face = (SELECT face FROM cards WHERE card_id = ' + card_id + ') AND game_id = ' + game_id + '')
  .catch( error=> console.log("ERROR: ",error));
};

// sees if anyone has won in the game provided
const check_win = (game_id)=>{
  db.one('SELECT user_id FROM game_has_hands WHERE hand_id NOT IN (SELECT hand_id FROM hand_has_cards) AND game_id =' + game_id + '').catch( error=> console.log("ERROR: ",error));
};



const discard_card = (game_id,user_id,card_id)=>{
  db.one('DELETE FROM hand_has_cards WHERE hand_id = (SELECT hand_id FROM game_has_hands WHERE game_id = ' + game_id + ' AND user_id = ' + user_id + ') AND card_id =  ' + card_id + '').catch( error=> console.log("ERROR: ",error));
};

const draw_card = (game_id,num_of_cards,hand_id)=>{
  db.one('DELET FROM active_pile WHERE card_id = (SELECT card_id FROM active_pile WHERE game_id = ' +  game_id + ' LIMIT ' + num_of_cards + ') RETURNING card_id').catch( error=> console.log("ERROR: ",error));
};

const card_to_hand = (game_id,user_id,card_id)=>{
  db.one('INSERT INTO hand_has_cards (hand_id,card_id) VALUES ((SELECT hand_id FROM game_has_hands WHERE game_id = ' + game_id + ' AND user_id = ' + user_id + '),' + card_id + ')').catch( error=> console.log("ERROR: ",error));
};

const remove_card = (game_id,user_id,card_id)=>{
  // remove card from game_id.user_id.hand that matches card_id
  if( check_user_has_card(game_id,user_id,card_id) ){

  }
};

const shuffle_discard = (game_id)=>{

};

const next_player = (game_id)=>{
  db.one('UPDATE games SET active_seat = (active_seat + turn_order) WHERE game_id = ' + game_id + '').catch( error=> console.log("ERROR: ",error));

  const num_of_players = db.one('SELECT count(user_id) FROM game_has_hands WHERE game_id = ' + game_id + '').catch( error=> console.log("ERROR: ",error));

  const active_seat = db.one('SELECT active_seat FROM games WHERE game_id = ' + game_id + '').catch( error=> console.log("ERROR: ",error));

  if(active_seat > num_of_players){
   db.one('UPDATE games SET active_seat = 1 WHERE game_id = ' + game_id + '').catch( error=> console.log("ERROR: ",error));
  }
};

// creates a new game with user_id as host
const new_game = (user_id) =>
  db.one(`INSERT INTO games (game_status, host_id) VALUES('OPEN', $1) RETURNING game_id`, [user_id]);


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

const check_game_user = (game_id, user_id) =>
  db.one('SELECT * FROM game_has_hands WHERE game_id = $1 AND user_id = $2', [game_id,user_id]);

const get_hands_for_game = (game_id) =>
  db.many('SELECT hand_id FROM game_has_hands WHERE game_id = $1', [game_id]);

// create a random shuffle for an array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const start_game = (game_id, hands) => {
  // first create a random shuffle of card_ids
  let cards = new Array(108);
  for (let i = 0; i < 108; i++) {
    cards[i] = i + 1;
  }
  shuffle(cards);

  // then draw cards to players
  const cards_per_hand = 7;
  let batch_query = '';
  for (let i = 0; i < hands.length; i++) {
    let hand_card_insert = `INSERT INTO hand_has_cards (hand_id, card_id) VALUES (${hands[i].hand_id}, ${cards[i * cards_per_hand]})`;
    for (let j = i * cards_per_hand + 1; j < (i+ 1) * cards_per_hand ; j++) {
      hand_card_insert += `, (${hands[i].hand_id}, ${cards[j]})`;
    }
    batch_query += hand_card_insert + ";\n";
  }

  // remaining in active_pile
  const next_card = hands.length * cards_per_hand;
  let active_card_insert = `INSERT INTO active_pile (game_id, card_id, card_order) VALUES
  (${game_id}, ${cards[next_card]}, 1)`;
  for (let i = next_card + 1; i < 107 ; i++) {
    const order = i + 1 - next_card;
    active_card_insert += `, (${game_id}, ${cards[i]}, ${order})`;
  }
  batch_query += active_card_insert + ";\n";

  // Update game state
  let update_game = `UPDATE games SET game_status = 'IN PROGRESS',
    turn_order = 1, top_card_id = ${cards[107]}, active_seat = (SELECT seat_number from game_has_hands where game_id = ${game_id} and user_id = host_id), game_start = to_timestamp(${Date.now()} / 1000.0) where game_id = ${game_id};`
  batch_query += update_game;
  console.log(batch_query);

  return db.none(batch_query);
}

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
    join_game,
    get_hands_for_game,
    start_game
};
