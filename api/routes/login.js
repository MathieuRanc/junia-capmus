var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
	var connection = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});

	connection.connect();
	connection.query('SELECT id,password,roles FROM users WHERE username=?', [req.body.username], async (err, result) => {
		if (result && result.length === 1) {
			const user = result[0];
			validPassword = await bcrypt.compare(req.body.password, user.password);
			if (validPassword) {
				const access_token = jwt.sign({ id: user.id, username: req.body.username, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '365d' });

				jwt.verify(access_token, process.env.JWT_SECRET, (err, user) => {
					if (err) {
						return res.sendStatus(403);
					}
					res.status(200).json({ access_token });
				});
			} else {
				res.status(403).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
			}
		} else {
			res.status(403).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
		}
	});
	connection.end();
});

module.exports = router;
