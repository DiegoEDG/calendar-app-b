const jwt = require('jsonwebtoken');

const createToken = (uid, name) => {
	return new Promise((resolve, reject) => {
		const payload = { uid, name };

		jwt.sign(
			payload,
			process.env.SECRET_JWT_SEED,
			{
				expiresIn: '2h'
			},
			(error, token) => {
				if (error) {
					console.error(error);
					reject('Token cant be created ');
				}

				resolve(token);
			}
		);
	});
};

module.exports = { createToken };
