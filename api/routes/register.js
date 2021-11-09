var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
	if (req.body.username.length < 3) {
		res.status(401).json({ error: "Nom d'utilisateur incorrect" });
	} else {
		// generate salt to hash password
		const salt = await bcrypt.genSalt(10);
		// now we set user password to hashed password
		const password = await bcrypt.hash(req.body.password, salt);

		var connection = mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
		});

		connection.connect();
		connection.query(
			"INSERT INTO users (username, email, password, roles, courses) VALUES (?, ?, ?, '[\"ROLE_MEMBER\"]', '[]');",
			[req.body.username, req.body.email, password],
			(err, result) => {
				if (result) {
					// Generate an access token
					const access_token = jwt.sign({ id: result.insertId, username: req.body.username, roles: ['ROLE_MEMBER'] }, process.env.JWT_SECRET, {
						expiresIn: '365d',
					});
					res.status(201).json({ message: 'created successfuly', access_token });
				} else {
					res.status(401).json({ error: "Une erreur s'est produite" });
				}
			}
		);
		connection.end();
	}
});

module.exports = router;
