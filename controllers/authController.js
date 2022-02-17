const { response } = require('express');
const { validationResult } = require('express-validator');

const renewToken = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'renew'
	});
};

const login = (req, res = response) => {
	const { body } = req;
	res.status(200).json({
		ok: true,
		msg: 'login',
		body
	});
};

const newUser = (req, res = response) => {
	const { body } = req;

	res.status(201).json({
		ok: true,
		msg: 'register',
		body
	});
};

module.exports = { renewToken, login, newUser };
