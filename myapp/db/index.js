const pgp = require('pg-promise')();
const database = pgp(process.env.DATABASE_URL);

module.exports = database;
