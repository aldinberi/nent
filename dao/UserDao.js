const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserDao {
	constructor(model, config) {
		if (!!UserDao.instance) {
			return UserDao.instance;
		}

		UserDao.instance = this;
		this.model = model;
		this.config = config;

		return this;
	}

	async register(req, res) {
		bcrypt.hash(req.body.password, 10, async (err, hash) => {
			try {
				req.body.password = hash;
				await this.model.validate(req.body);
				await this.model.create(req.body);
				delete req.body.password;
				res.json(req.body);
			} catch (error) {
				if (error) {
					return res.status(400).json(`Insertion failed! Reason: ${error.errmsg}`);
				}
			}
		});
	}

	async login(req, res) {
		try {
			let jwtToken;

			let doc = await this.model.findOne({ email: req.body.email });
			if (!doc) {
				return res.status(403).json({ message: "Incorrect credentials" });
			}
			let response = await bcrypt.compare(req.body.password, doc.password);
			if (!response) {
				return res.status(403).json({ message: "Incorrect credentials" });
			} else {
				jwtToken = jwt.sign(
					{
						id: doc._id,
						username: doc.email,
						first_name: doc.first_name,
						last_name: doc.last_name,
						exp: Math.floor(Date.now() / 1000) + 3600,
					},
					process.env.JWT_SECRET || this.config.JWT_SECRET,
					{ algorithm: "HS256" }
				);

				res.json({
					jwt: jwtToken,
				});
			}
		} catch (err) {
			res.status(400).send({ message: `Error: ${err}` });
		}
	}
}

module.exports = UserDao;
