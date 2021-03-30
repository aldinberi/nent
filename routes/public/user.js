module.exports = (router, config, jwt) => {
	const { checkSchema, check } = require("express-validator");
	const UserValidator = require("../../models/validator/user");
	const userModel = require("../../models/mongoose/user");
	const UserDao = require("../../dao/UserDao");

	const userDao = new UserDao(userModel, config, jwt);
	const userValidator = new UserValidator();

	router.post("/register", checkSchema(userValidator), (req, res) => {
		userDao.register(req, res);
	});

	router.post("/login", check("email").isEmail().normalizeEmail(), async (req, res) => {
		userDao.login(req, res);
	});
};
