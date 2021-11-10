var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.delete('/:id', function (req, res, next) {
	try {
		if (
			!req.body.name ||
			!req.body.year ||
			!req.body.school ||
			!req.body.subject ||
			!req.body.difficulty ||
			!req.body.type ||
			!req.body.content ||
			!req.body.owner
		) {
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
					console.log(user);
					next();
				}
			});
		} else {
			res.status(401).send('undefined jwt token');
		}
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

router.delete('/:id', function (req, res) {
	var connection = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});

	connection.connect();

	function getCourse(data, callback) {
		connection.query('SELECT * FROM courses WHERE id=?;', [req.params.id], (err, course) => {
			if (course) {
				return callback(course[0]);
			} else res.json({ err });
		});
	}

	var course = null;

	getCourse(null, (result) => {
		course = result;
	});

	// console.log(req.user);

	connection.query('DELETE FROM courses WHERE id=? AND owner=?;', [req.params.id, req.user.id], (err, result) => {
		if (result) {
			res.json({ course });
		} else res.json({ err });
	});
});

module.exports = router;
