module.exports = (router, mongoose, config, express) => {
	const { body, validationResult } = require("express-validator");
	const UserDao = require("../../dao/UserDao");
	const userModel = require("../../models/mongoose/user");
	const check_password = require("../../utils");
	const userDao = new UserDao(userModel, config);

	router.post(
		"/register",
		body("email").isEmail().normalizeEmail(),
		body("first_name").isAlpha(),
		body("last_name").isAlpha(),
		body("email").custom(async (value) => {
			let user = await userModel.findOne({ email: value });
			if (user) {
				return Promise.reject("E-mail already in use");
			}
		}),
		body("password").custom(async (value) => {
			let response = await check_password(value);
			if (response) {
				return Promise.reject("Password has been breached");
			}
		}),
		(req, res) => {
			const validationErrors = validationResult(req);
			if (!validationErrors.isEmpty()) {
				return res.status(422).json(validationErrors.array());
			}
			userDao.register(req, res);
		}
	);

	router.post("/login", body("email").isEmail().normalizeEmail(), async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(422).json(validationErrors.array());
		}
		userDao.login(req, res);
	});
};
