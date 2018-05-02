const bcrypt = require('bcrypt');
const db = require('./index');

const CREATE_QUERY =
  'INSERT INTO users (email, screen_name, password) VALUES (${email}, ${screen_name}, ${hash}) RETURNING user_id, email';
const create = (email, screen_name, password) =>
  bcrypt.hash(password, 10).then(hash => db.one(CREATE_QUERY, { email, screen_name, hash }));

const find = email =>
  db.one('SELECT * FROM users WHERE email=${email}', { email });

  const serialize = (user, done) => done(null, user);

  const deserialize = (user, done) =>
    db
      .one('SELECT * FROM users WHERE user_id=${user.user_id}', { user })
      .then(user => done(null, user))
      .catch(error => done(error));

  module.exports = {
    create,
    find,
    serialize,
    deserialize
  };
