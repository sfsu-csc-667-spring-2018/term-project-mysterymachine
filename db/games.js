const db = require('./index');

const get = game_id =>
  db.one('SELECT screen_name as current_player, game_status as status FROM games, users WHERE turn_order = user_id AND game_id=${game_id}', { game_id });

const get_users = game_id =>
  db.many(`SELECT screen_name FROM game_has_hands as g, users as u
  WHERE g.user_id = u.user_id AND game_id=${game_id}`, { game_id });

const get_user_cards = (game_id, user_id) =>
  db.many(`SELECT c.card_id, c.image_address
    FROM game_has_hands as g, hand_has_cards as h, cards as c
    WHERE g.hand_id = h.hand_id AND h.card_id = c.card_id and g.game_id = ${1} and g.user_id = ${2}`,
    [game_id, user_id]);

module.exports = {
    get,
    get_users,
    get_user_cards
};
