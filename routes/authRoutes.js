// * Rutas de Auth
// * host + /api/auth
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { renewToken, login, newUser } = require('../controllers/authController');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');

router.get('/renew', jwtValidator, renewToken);

router.post(
	'/',
	[
		check('email', 'El nombre el obligatorio').isEmail(),
		check('password', 'El password debe ser de minimo 6 caracteres').isLength({ min: 6 }),
		fieldValidator
	],
	login
);

router.post(
	'/new',
	[
		//middlewares
		check('name', 'El nombre el obligatorio').notEmpty(),
		check('email', 'El nombre el obligatorio').isEmail(),
		check('password', 'El password debe ser de minimo 6 caracteres').isLength({ min: 6 }),
		fieldValidator
	],
	newUser
);

module.exports = router;
