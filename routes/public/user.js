module.exports = (router, config, jwt) => {
	const { checkSchema, check, validationResult } = require("express-validator");
	const userValidation = require("../../models/validator/user");
	const userModel = require("../../models/mongoose/user");
	const UserDao = require("../../dao/UserDao");

	const userDao = new UserDao(userModel, config, jwt);

	router.post("/register", checkSchema(userValidation), (req, res) => {
		check_validator_errors(req, res);
		userDao.register(req, res);
	});

	router.post("/login", check("email").isEmail().normalizeEmail(), async (req, res) => {
		userDao.login(req, res);
	});
};
