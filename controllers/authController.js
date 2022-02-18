const bcrypt = require('bcryptjs');
const { response } = require('express');
const User = require('../models/UserModel');

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

const newUser = async (req, res = response) => {
	const { body } = req;

	try {
		let user = await User.findOne({ email: body.email });

		if (user) {
			return res.status(500).json({
				ok: false,
				msg: 'This email is already use by other user'
			});
		}

		user = new User(body);

		// * Encriptar password
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(body.password, salt);

		await user.save();

		res.status(201).json({
			ok: true,
			msg: 'Register Success'
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: False,
			msg: 'Error!'
		});
	}
};

module.exports = { renewToken, login, newUser };
