const crypto = require("crypto");
const axios = require("axios");
const { validationResult } = require("express-validator");

check_password = async (password) => {
	let shasum = crypto.createHash("sha1");
	shasum.update(password);
	let hashed_password = shasum.digest("hex");
	let hash_first_5 = hashed_password.substring(0, 5).toUpperCase();
	let control_hash = hashed_password.substring(5).toUpperCase();
	let response = await axios.get("https://api.pwnedpasswords.com/range/" + hash_first_5);
	return response.data.includes(control_hash);
};

check_validator_errors = (req, res) => {
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		return validationErrors.array();
	}
};

module.exports = { check_password, check_validator_errors };
