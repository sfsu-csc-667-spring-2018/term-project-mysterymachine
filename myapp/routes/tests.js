const express = require("express");
const router = express.Router();
//const db = require('C:\\Users\\Isak\\Documents\\Programmering\\CSC667\\uno\\myapp\\index.js');
const pgp = require('pg-promise')();
const connection = pgp(process.env.DATABASE_URL);

router.get("/", (request, response) => {
 db.any(`INSERT INTO test_table ("testString") VALUES ('Hello at $
{Date.now()}')`)
 .then( _ => db.any(`SELECT * FROM test_table`) )
 .then( results => response.json( results ) )
 .catch( error => {
 console.log( error )
 response.json({ error })
 })
});
module.exports = router;