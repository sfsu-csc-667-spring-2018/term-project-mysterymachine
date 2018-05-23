const db = require('./index');

const get = game_id =>
 db.one('SELECT active_seat, skipped, has_drawn, turn_order, face, top_card_color, image_address FROM games, cards WHERE top_card_id = card_id AND game_id=${game_id}', {
  game_id
 });

const get_users = (game_id) =>
 db.many(`SELECT u.user_id, email, screen_name, seat_number, score, uno_play
    FROM game_has_hands as g, users as u
    WHERE g.user_id = u.user_id AND game_id=$1
    ORDER BY seat_number`, [game_id]);

const get_users_2 = (game_id) =>
 db.many(`SELECT u.user_id, email, screen_name, seat_number, score, uno_play
    FROM game_has_hands as g, users as u
    WHERE g.user_id = u.user_id AND game_id=$1
    ORDER BY seat_number`, [game_id]);

const get_player = (game_id, user_id) =>
 db.one(`SELECT u.user_id, email, screen_name, seat_number, score, uno_play
    FROM game_has_hands as g, users as u
    WHERE g.user_id = u.user_id AND game_id=$1 AND g.user_id = $2
    ORDER BY seat_number`, [game_id, user_id]);

const get_user_cards = (game_id, user_id) => {
 return db.many(`SELECT c.card_id, c.image_address
    FROM game_has_hands as g, hand_has_cards as h, cards as c
    WHERE g.hand_id = h.hand_id AND h.card_id = c.card_id and g.game_id = $1 and g.user_id = $2`, [game_id, user_id]);
}

const get_game_state = (game_id) =>
 db.one('SELECT game_status, host_id FROM games as g WHERE g.game_id=${game_id}', {
  game_id
 });

const get_player_card_count = (game_id, user_id) => {
 db.one('SELECT user_id, count(hand_has_cards.card_id) AS number_of_cards_in_hand FROM hand_has_cards, game_has_hands WHERE hand_has_cards.hand_id = game_has_hands.hand_id AND game_id = ' + game_id + ' GROUP BY user_id').catch(error => console.log("ERROR: ", error));
};



const new_game = (user_id) =>
 db.one(`INSERT INTO games (game_status, host_id) VALUES('OPEN', $1) RETURNING game_id`, [user_id]);

const done_game = (game_id) =>
 db.none(`UPDATE games SET game_status='DONE' WHERE game_id=$1`, [game_id]);

const get_active_games = () =>
 db.any(`SELECT g.game_id, game_status, screen_name, count(*) as cnt
  FROM games g, game_has_hands h, users u
  WHERE g.host_id = u.user_id AND g.game_id = h.game_id AND g.game_status IN ('OPEN', 'IN PROGRESS', 'WAIT NEXT')
  GROUP BY g.game_id, game_status, screen_name ORDER BY game_status desc, count(*)`);

const join_game = (game_id, user_id, seat_number) =>
 db.none(`INSERT INTO game_has_hands (game_id, user_id, seat_number, score) VALUES($1, $2, $3, 0)`, [game_id, user_id, seat_number]);

const get_game_status_count = (game_id) =>
 db.one(`SELECT game_status, count(*) as cnt FROM games g, game_has_hands h
      WHERE g.game_id = ${game_id} AND h.game_id = ${game_id} GROUP BY game_status`, {
  game_id
 });

const check_game_user = (game_id, user_id) =>
 db.one('SELECT * FROM game_has_hands WHERE game_id = $1 AND user_id = $2', [game_id, user_id]);

const get_hands_for_game = (game_id) =>
 db.many('SELECT hand_id FROM game_has_hands WHERE game_id = $1', [game_id]);

// create a random shuffle for an array
function shuffle(array) {
 var currentIndex = array.length,
  temporaryValue, randomIndex;

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
 // Initial top card should not be a a special card
 while (cards[107] > 94 /* blue special and wild cards */ ||
  (cards[107] > 19 && cards[107] < 26 /* red special cards */ ) ||
  (cards[107] > 44 && cards[107] < 51 /* green special cards */ ) ||
  (cards[107] > 69 && cards[107] < 76 /* yellow special cards */ )) {
  randomIndex = Math.floor(Math.random() * 107);
  temporaryValue = cards[107];
  cards[107] = cards[randomIndex];
  cards[randomIndex] = temporaryValue;
 }

 // then draw cards to players
 const cards_per_hand = 7;
 let batch_query = '';
 for (let i = 0; i < hands.length; i++) {
  let hand_card_insert = `INSERT INTO hand_has_cards (hand_id, card_id) VALUES (${hands[i].hand_id}, ${cards[i * cards_per_hand]})`;
  for (let j = i * cards_per_hand + 1; j < (i + 1) * cards_per_hand; j++) {
   hand_card_insert += `, (${hands[i].hand_id}, ${cards[j]})`;
  }
  batch_query += hand_card_insert + ";\n";
 }

 // remaining in active_pile
 const next_card = hands.length * cards_per_hand;
 let active_card_insert = `INSERT INTO active_pile (game_id, card_id, card_order) VALUES
  (${game_id}, ${cards[next_card]}, 1)`;
 for (let i = next_card + 1; i < 107; i++) {
  const order = i + 1 - next_card;
  active_card_insert += `, (${game_id}, ${cards[i]}, ${order})`;
 }
 batch_query += active_card_insert + ";\n";

 // Update game state
 let update_game = `UPDATE games SET game_status = 'IN PROGRESS', skipped='FALSE', has_drawn = 'FALSE',
    turn_order = 1, top_card_id = ${cards[107]}, active_seat = (SELECT seat_number from game_has_hands where game_id = ${game_id} and user_id = host_id), game_start = to_timestamp(${Date.now()} / 1000.0) where game_id = ${game_id};`
 batch_query += update_game;
 console.log(batch_query);

 return db.none(batch_query);
}

const check_drawable = (game_id, user_id) =>
 db.one("SELECT * FROM games g, game_has_hands h WHERE g.game_id=$1 AND h.game_id=$1 AND g.active_seat = h.seat_number AND g.skipped='f' AND g.has_drawn='f' AND h.user_id=$2", [game_id, user_id]);

const get_card_active_pile = (game_id) =>
 db.one('SELECT card_id FROM active_pile WHERE game_id=$1 ORDER BY RANDOM() LIMIT 1', [game_id]);

const draw_card = (game_id, user_id, card_id) =>
 db.tx(t => {
  const q1 = t.none("DELETE FROM active_pile WHERE game_id = $1 AND card_id = $2", [game_id, card_id]);
  const q2 = t.none("INSERT INTO hand_has_cards SELECT hand_id, $3 FROM game_has_hands WHERE game_id = $1 AND user_id = $2", [game_id, user_id, card_id])
  const q3 = t.none("UPDATE games SET has_drawn='TRUE' WHERE game_id=$1", [game_id]);
  return t.batch([q1, q2, q3]); // all of the queries are to be resolved;
 });

const check_skipable = (game_id, user_id) =>
 db.tx(t => {
  const q1 = t.one("SELECT skipped, active_seat, turn_order FROM games g, game_has_hands h WHERE g.game_id=$1 AND h.game_id=$1 AND g.active_seat = h.seat_number AND (g.skipped='t' OR g.has_drawn='t') AND h.user_id=$2", [game_id, user_id]);
  const q2 = t.one('SELECT COUNT(*) as cnt FROM game_has_hands WHERE game_id=$1', [game_id]);
  const q3 = t.one('SELECT face, color FROM games, cards WHERE top_card_id = card_id AND game_id=$1', [game_id]);
  return t.batch([q1, q2, q3]); // all of the queries are to be resolved;
 });

const DRAW_CARDS = `
  WITH draw_cards AS (
    DELETE FROM active_pile
    WHERE card_id IN (
      SELECT card_id
      FROM active_pile
      WHERE game_id=$1
      ORDER BY RANDOM()
      LIMIT $3)
    RETURNING card_id
  )
INSERT INTO hand_has_cards
  SELECT DISTINCT hand_id, card_id
  FROM game_has_hands, draw_cards
  WHERE game_id = $1 AND user_id = $2`;

const skip_turn = (game_id, user_id, active_seat, draws) =>
 db.tx(t => {
  const q1 = t.none(DRAW_CARDS, [game_id, user_id, draws]);
  const q2 = t.none("UPDATE games SET skipped='FALSE', has_drawn='FALSE', active_seat=$2 WHERE game_id=$1", [game_id, active_seat]);
  return t.batch([q1, q2]); // all of the queries are to be resolved;
 });

const check_playable = (game_id, user_id, card_id) =>
 db.tx(t => {
  const q1 = t.one("SELECT active_seat, turn_order, top_card_color FROM games g, game_has_hands h WHERE g.game_id=$1 AND h.game_id=$1 AND g.active_seat = h.seat_number AND g.skipped = 'f' AND h.user_id=$2", [game_id, user_id]);
  const q2 = t.one("SELECT top_card_id, face, color FROM games, cards WHERE top_card_id = card_id AND game_id = $1", [game_id]);
  const q3 = t.one("SELECT face, color FROM cards WHERE card_id = $1", [card_id]);
  const q4 = t.one('SELECT COUNT(*) as cnt FROM game_has_hands WHERE game_id=$1', [game_id]);
  const q5 = t.one(`SELECT g.hand_id, uno_play, COUNT(*) as card_cnt
                      FROM game_has_hands g, hand_has_cards h
                      WHERE game_id=$1 AND user_id=$2 and g.hand_id = h.hand_id
                      GROUP BY g.hand_id, uno_play`, [game_id, user_id]);
  return t.batch([q1, q2, q3, q4, q5]); // all of the queries are to be resolved;
 });

const next_player = (game_id, user_id, active_seat, turn_order, user_card_id, top_card_id, skipped, top_card_color, draws, uno_play) =>
 db.tx(t => {
  // Put current top card back to active_pile
  const q1 = t.none("INSERT INTO active_pile (game_id, card_id) VALUES ($1, $2)", [game_id, top_card_id]);
  // Delete the card from player hand
  const q2 = t.one("DELETE FROM hand_has_cards WHERE card_id=$3 AND hand_id = (SELECT hand_id FROM game_has_hands WHERE game_id=$1 AND user_id=$2) RETURNING hand_id", [game_id, user_id, user_card_id]);
  // Update game game_state
  const q3 = t.none("UPDATE games SET skipped=$5, has_drawn='false', active_seat=$2, turn_order=$3, top_card_id=$4, top_card_color=$6 WHERE game_id=$1", [game_id, active_seat, turn_order, user_card_id, skipped, top_card_color]);
  let queries = [q1, q2, q3];
  if (!uno_play) {
   queries.push(t.none("UPDATE game_has_hands SET uno_play='false' WHERE game_id=$1 AND user_id=$2", [game_id, user_id]));
  }
  if (draws > 0) {
   queries.push(t.none(DRAW_CARDS, [game_id, user_id, draws]));
  }
  return t.batch(queries); // all of the queries are to be resolved;
 });

const mark_uno = (game_id, user_id) =>
 db.one(`UPDATE game_has_hands SET uno_play='true'
          WHERE hand_id = (SELECT g.hand_id
            FROM hand_has_cards h, game_has_hands g
            WHERE g.game_id=$1 AND g.user_id=$2 AND g.hand_id = h.hand_id
            GROUP BY g.hand_id
            HAVING count(*) = 2) RETURNING hand_id`, [game_id, user_id]);

const finish_game = (game_id, user_id) =>
 db.tx(t => {
  const q1 = t.one(`UPDATE game_has_hands SET uno_play = 'f', score = score +
        (SELECT SUM(value)
         FROM game_has_hands g, hand_has_cards h, cards c
         WHERE g.hand_id = h.hand_id AND h.card_id = c.card_id AND g.game_id=$1 AND g.user_id !=$2)
     WHERE game_id=$1 AND user_id=$2 RETURNING score`, [game_id, user_id]);
  const q2 = t.none(`DELETE FROM hand_has_cards WHERE hand_id IN (
    SELECT hand_id from game_has_hands WHERE game_id=$1)`, [game_id]);
  const q3 = t.none(`DELETE FROM active_pile WHERE game_id=$1`, [game_id]);
  const q4 = t.none(`UPDATE games
    SET game_status = 'WAIT NEXT', top_card_id=NULL, top_card_color=NULL, turn_order=NULL, active_seat=NULL,skipped=NULL, has_drawn=Null
    WHERE game_id=$1`, [game_id]);
  return t.batch([q1, q2, q3, q4]); // all of the queries are to be resolved;
 });

module.exports = {
 get,
 get_player,
 get_users,
 get_users_2,
 get_user_cards,
 get_game_state,
 check_playable,
 draw_card,
 next_player,
 new_game,
 get_active_games,
 get_game_status_count,
 check_game_user,
 join_game,
 get_hands_for_game,
 start_game,
 done_game,
 check_drawable,
 check_skipable,
 skip_turn,
 mark_uno,
 finish_game,
 get_card_active_pile
};
