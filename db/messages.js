const db = require('./index');

const get_all = game_id =>
 db.any('SELECT screen_name, time_sent, text_message FROM messages as m, users as u WHERE m.user_id = u.user_id AND game_id=$1 ORDER BY time_sent', game_id);

module.exports = {
 get_all
};
