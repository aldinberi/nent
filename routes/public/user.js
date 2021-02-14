module.exports = (router, mongoose, config, express) => {
	const { body, validationResult } = require("express-validator");
	const userModel = require("../../models/mongoose/user");
	const check_password = require("../../utils");
	const bcrypt = require("bcrypt");

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

			bcrypt.hash(req.body["password"], 10, async (err, hash) => {
				try {
					req.body["password"] = hash;
					await userModel.validate(req.body);
					const response = await userModel.create(req.body);
					res.json(response);
				} catch (error) {
					if (error) {
						return res.status(400).send(`Insertion failed! Reason: ${error.errmsg}`);
					}
				}
			});
		}
	);
};
