var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/:id', function (req, res, next) {
	try {
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
		res.status(500).send('error');
	}
});

router.get('/:id', function (req, res) {
	var connection = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});
	connection.connect();

	connection.query('SELECT * FROM courses WHERE id=?', [req.params.id], (err, course) => {
		// console.log(courses);
		if (course && course.length === 1) {
			course = course[0];
			course.content = JSON.parse(course.content);
			res.json(course);
		} else res.json({ err });
	});
	connection.end();
});

module.exports = router;
