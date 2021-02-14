class UserDao {
	constructor(model) {
		if (!!UserDao.instance) {
			return UserDao.instance;
		}

		UserDao.instance = this;
		this.model = model;

		return this;
	}

	async register(req, res) {}

	async get_by_fields(req, res) {}
}

module.exports = UserDao;
