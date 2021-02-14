const bcrypt = require("bcrypt");
class UserDao {
	constructor(model) {
		if (!!UserDao.instance) {
			return UserDao.instance;
		}

		UserDao.instance = this;
		this.model = model;

		return this;
	}

	async register(req, res) {
		const { password } = req.body;
		bcrypt.hash(password, 10, async (err, hash) => {
			try {
				req.body.password = hash;
				await this.model.validate(req.body);
				const response = await this.model.create(req.body);
				res.json(response);
			} catch (error) {
				if (error) {
					return res.status(400).send(`Insertion failed! Reason: ${error.errmsg}`);
				}
			}
		});
	}
}

module.exports = UserDao;
