var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const jwt = require('jsonwebtoken');

function escapeHtml(text) {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;',
	};

	return text.replace(/[&<>"']/g, function (m) {
		return map[m];
	});
}

/* GET users listing. */
router.get('/', function (req, res, next) {
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

router.get('/', function (req, res) {
	var connection = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});
	connection.connect();

	let query = 'SELECT id,name,year,school,subject,difficulty,type,owner,promo FROM courses';
	const filters = ['name', 'year', 'school', 'subject', 'difficulty', 'type'];
	let params = [];
	for (const [key, value] of Object.entries(req.query)) {
		if (filters.includes(key)) {
			if (params.length === 0) {
				query += ' WHERE 1';
			}
			query += ` AND ${escapeHtml(key)}=?`;
			params.push(escapeHtml(value));
		}
	}
	if (req.query.order) {
		if (req.query.order === 'asc') {
			query += ' ORDER BY difficulty ASC';
		} else if (req.query.order === 'desc') {
			query += ' ORDER BY difficulty DESC';
		}
	}
	console.log(query);

	connection.query(query, params, (err, courses) => {
		if (courses) res.json(courses);
		else res.json({ err });
	});
	connection.end();
});

module.exports = router;
