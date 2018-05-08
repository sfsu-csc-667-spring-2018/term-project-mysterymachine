const express = require("express");
const router = express.Router();
const db = require('../db');
router.get("/", (request, response) => {
  db.any( `SELECT * FROM cards` )
  .then( results => response.render('cards', {title: 'Cards', data: results } ) )
  .catch( error => {
    console.log( error )
    response.json({ error })
  })
});

module.exports = router;
