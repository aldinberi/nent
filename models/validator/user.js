const userModel = require("../mongoose/user");
const { check_password } = require("../../utils");
let userValidation = {
	first_name: {
		custom: {
			options: async (value) => {
				if (!/^[\sa-zA-ZåäöÅÄÖ ]*$/.test(value)) {
					return Promise.reject("Invalid first name");
				}
			},
		},
	},
	last_name: {
		custom: {
			options: async (value) => {
				if (!/^[\sa-zA-ZåäöÅÄÖ ]*$/.test(value)) {
					return Promise.reject("Invalid last name");
				}
			},
		},
	},
	password: {
		custom: {
			options: async (value) => {
				let response = await check_password(value);
				if (response) {
					return Promise.reject("Password has been breached");
				}
			},
		},
	},
	email: {
		isEmail: true,
		normalizeEmail: true,
		custom: {
			options: async (value) => {
				let user = await userModel.findOne({ email: value });
				if (user) {
					return Promise.reject("E-mail already in use");
				}
			},
		},
	},
};

module.exports = userValidation;
