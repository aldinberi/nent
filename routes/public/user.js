module.exports = (router, config, jwt) => {
	const { check, validationResult } = require("express-validator");
	const UserDao = require("../../dao/UserDao");
	const userModel = require("../../models/mongoose/user");
	const check_password = require("../../utils");
	const userDao = new UserDao(userModel, config, jwt);

	router.post(
		"/register",
		check("email").isEmail().normalizeEmail(),
		check("first_name").custom(async (value) => {
			if (!/^[\sa-zA-ZåäöÅÄÖ ]*$/.test(value)) {
				return Promise.reject("Invalid first name");
			}
		}),
		check("last_name").custom(async (value) => {
			if (!/^[\sa-zA-ZåäöÅÄÖ ]*$/.test(value)) {
				return Promise.reject("Invalid last name");
			}
		}),
		check("email").custom(async (value) => {
			let user = await userModel.findOne({ email: value });
			if (user) {
				return Promise.reject("E-mail already in use");
			}
		}),
		check("password").custom(async (value) => {
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

	router.post("/login", check("email").isEmail().normalizeEmail(), async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(422).json(validationErrors.array());
		}
		userDao.login(req, res);
	});
};
