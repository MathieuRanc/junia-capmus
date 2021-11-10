var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const showdown = require('showdown');
const nodemailer = require('nodemailer');
const fs = require('fs');

const randomCode = (length) => {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

const mail = (req, code) => {
	transporter = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		secure: process.env.MAIL_SECURE,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		},
	});

	const confirm = req.protocol + '://' + req.get('host') + '/register/confirm?code=' + code + '&username=' + req.body.username;

	fs.readFile('./templates/confirm.md', 'utf8', async (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		const converter = new showdown.Converter();
		const html = converter.makeHtml(data.replace('{{ owner }}', req.body.username).replace('{{ link }}', confirm));
		await transporter.sendMail({
			from: `"${process.env.MAIL_NAME}" <${process.env.MAIL_USER}>`,
			to: req.body.email,
			subject: "Confirmation de l'email Junia Campus",
			html: html,
		});
	});

	return;
};

router.post('/', async (req, res) => {
	if (req.body.username.length < 3) {
		res.status(401).json({ error: "Nom d'utilisateur incorrect" });
	} else {
		// generate salt to hash password
		const salt = await bcrypt.genSalt(10);
		// now we set user password to hashed password
		const password = await bcrypt.hash(req.body.password, salt);

		const confirmationKey = randomCode(64);

		var connection = mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
		});

		connection.connect();
		connection.query(
			"INSERT INTO users (username, email, password, roles, courses, confirmation_key) VALUES (?, ?, ?, '[\"ROLE_MEMBER\"]', '[]', ?);",
			[req.body.username, req.body.email, password, confirmationKey],
			(err, result) => {
				if (result) {
					// Generate an access token
					const access_token = jwt.sign({ id: result.insertId, username: req.body.username, roles: ['ROLE_MEMBER'] }, process.env.JWT_SECRET, {
						expiresIn: '365d',
					});
					mail(req, confirmationKey);
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
