const { response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = (req, res = response, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'Missed Token'
		});
	}

	try {
		const { id, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
		req.id = id;
		req.name = name;
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Invalid Token'
		});
	}

	next();
};

module.exports = { jwtValidator };
