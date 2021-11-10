var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', async (req, res) => {
	var connection = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});

	connection.connect();
	console.log(req.query);
	connection.query('UPDATE users SET confirmed=1 WHERE username=? AND confirmation_key=?;', [req.query.username, req.query.code], (err, result) => {
		if (err) {
			res.status(401).json({ error: "Une erreur s'est produite" });
		} else {
			res.status(201).json({ message: 'mail confirmed' });
		}
	});
	connection.end();
});

module.exports = router;
