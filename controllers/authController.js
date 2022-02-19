const bcrypt = require('bcryptjs');
const { response } = require('express');
const { createToken } = require('../helpers/jwt');
const User = require('../models/UserModel');

const renewToken = async (req, res = response) => {
	const { id, name } = req;

	const newToken = await createToken(id, name);

	res.json({
		ok: true,
		msg: 'renew',
		newToken
	});
};

const login = async (req, res = response) => {
	const { body } = req;

	try {
		let user = await User.findOne({ email: body.email });

		if (!user) {
			res.status(404).json({
				ok: false,
				msg: 'login failed'
			});
		}

		const validPassword = bcrypt.compareSync(body.password, user.password);

		if (!validPassword) {
			res.status(404).json({
				ok: false,
				msg: 'password or mail mismatch'
			});
		}

		const token = await createToken(user.uid, user.name);

		res.status(200).json({
			ok: true,
			msg: 'login',
			body,
			token
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: False,
			msg: 'Error!'
		});
	}
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

		const token = await createToken(user.id, user.name);

		res.status(201).json({
			ok: true,
			msg: 'Register Success',
			body,
			token
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
