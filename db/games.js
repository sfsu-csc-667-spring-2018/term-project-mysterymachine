const db = require('./index');

const get = game_id =>
  db.one('SELECT screen_name as current_player, game_status as status FROM games, users WHERE turn_order = user_id AND game_id=${game_id}', { game_id });

const get_users = game_id =>
  db.many('SELECT screen_name FROM game_has_hands as g, users as u WHERE g.user_id = u.user_id AND game_id=${game_id}', { game_id });

module.exports = {
    get,
    get_users
};
