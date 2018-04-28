//room.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>
	res.status(200).
	send('<h1>Room Placeholder</h1>')
	);

module.exports = router;