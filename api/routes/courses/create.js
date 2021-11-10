var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/', function (req, res, next) {
	try {
		if (!req.body.name || !req.body.year || !req.body.school || !req.body.subject || !req.body.difficulty || !req.body.type || !req.body.content) {
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

router.post('/', function (req, res) {
	var connection = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});

	function getCourseId(data, callback) {
		connection.connect();
		connection.query(
			'INSERT INTO courses (name, year, school, subject, difficulty, type, content, owner) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
			[req.body.name, req.body.year, req.body.school, req.body.subject, req.body.difficulty, req.body.type, req.body.content, req.user.id],
			(err, course) => {
				if (course) {
					return callback(course.insertId);
				} else res.json({ err });
			}
		);
	}

	getCourseId(null, function (result) {
		courseId = result;
		if (courseId) {
			connection.query('SELECT * FROM courses WHERE id=?', [courseId], (err, course) => {
				if (course) {
					res.json({ course: course[0] });
				} else res.json({ err });
			});
			connection.end();
		} else {
			res.json({ error: 'error' });
		}
	});
});

module.exports = router;
