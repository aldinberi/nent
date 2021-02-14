const crypto = require("crypto");
const axios = require("axios");

check_password = async (password) => {
	let shasum = crypto.createHash("sha1");
	shasum.update(password);
	let hashed_password = shasum.digest("hex");
	let hash_first_5 = hashed_password.substring(0, 5).toUpperCase();
	let control_hash = hashed_password.substring(5).toUpperCase();
	let response = await axios.get("https://api.pwnedpasswords.com/range/" + hash_first_5);
	return response.data.includes(control_hash);
};

module.exports = check_password;
