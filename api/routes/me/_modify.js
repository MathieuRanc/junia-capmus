var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const jwt = require('jsonwebtoken');

router.patch('/:id', function (req, res, next) {
	try {
		if (!req.body.courses) {
			throw Error('Missing params');
		}
		const authHeader = req.headers.authorization;

		if (authHeader) {
			const token = authHeader.split(' ')[1];

			jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
				if (err || !JSON.parse(user.roles).includes('ROLE_MEMBER')) {
					return res.status(403).send({ error: 'forbidden' });
				} else {
					req.user = user;
					next();
				}
			});
		} else {
			res.status(401).send('undefined jwt token');
		}
	} catch (err) {
		console.log('authenticated');
		res.status(500).send({ error: err.message });
	}
});

router.patch('/:id', function (req, res) {
	var connection = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});

	connection.connect();

	console.log(req.body.courses);
	if (req.body.courses) {
		connection.query('UPDATE users SET courses=? WHERE id=?;', [JSON.stringify(req.body.courses), req.user.id], (err, users) => {
			if (err) res.json({ err });
		});
	}

	connection.query(
		'SELECT id,username,email,courses,confirmed,school,promo FROM users WHERE id=? AND username=? AND confirmed=?',
		[req.user.id, req.user.username, req.user.confirmed],
		(err, users) => {
			if (users && users.length === 1) {
				let user = users[0];
				user.courses = JSON.parse(user.courses);
				res.json(user);
			} else res.json({ err });
		}
	);
	connection.end();
});

module.exports = router;
