var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const jwt = require('jsonwebtoken');

router.get('/', function (req, res) {
	var connection = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});
	connection.connect();

	connection.query('SELECT DISTINCT school FROM courses', (err, courses) => {
		if (courses) {
			let schools = courses.map((course) => course.school);
			res.json(schools);
		} else res.json({ err });
	});
	connection.end();
});

module.exports = router;
