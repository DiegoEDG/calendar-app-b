const { response } = require('express');
const { validationResult } = require('express-validator');

const renewToken = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'renew'
	});
};

const login = (req, res = response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errors: errors.mapped()
		});
	}
	res.json({
		ok: true,
		msg: 'login'
	});
};

const newUser = (req, res = response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errors: errors.mapped()
		});
	}

	res.json({
		ok: true,
		msg: 'register'
	});
};

module.exports = { renewToken, login, newUser };
