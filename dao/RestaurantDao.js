class RestaurantDao {
	constructor(model) {
		if (!!RestaurantDao.instance) {
			return RestaurantDao.instance;
		}

		RestaurantDao.instance = this;
		this.model = model;

		return this;
	}

	async get_by_hours(req, res) {
		let validator_response = check_validator_errors(req, res);
		if (validator_response) {
			return res.status(422).json(validator_response);
		}
		const { limit, offset, startTime, endTime, day } = req.query;
		let limitNumber = Number(limit) || 5;
		let offsetNumber = Number(offset) || 0;
		let startString = "";
		let endString = "";
		let dayString = day || "";

		if (startTime) {
			startString = startString + ": " + startTime;
		}

		if (endTime) {
			endString = endString + " – " + endTime;
		}

		try {
			let docs = await this.model.aggregate([
				{ $unwind: "$opening_hours" },
				{ $match: { opening_hours: { $regex: dayString, $options: "i" } } },
				{ $match: { opening_hours: { $regex: startString, $options: "i" } } },
				{ $match: { opening_hours: { $regex: endString, $options: "i" } } },
				{ $skip: offsetNumber },
				{ $limit: limitNumber },
			]);
			res.json(docs);
		} catch (exception) {
			if (exception) {
				return res.status(400).json({ message: `Read failed! Reason: ${exception.errmsg || exception._message}` });
			}
		}
	}

	async get_by_fields(req, res) {
		let validator_response = check_validator_errors(req, res);
		if (validator_response) {
			return res.status(422).json(validator_response);
		}
		const { limit, offset, sortType, sort, name, address } = req.query;
		let limitNumber = Number(limit) || 5;
		let offsetNumber = Number(offset) || 0;

		let toSort = {
			[sort]: Number(sortType) || -1,
		};

		let filter = {
			[name && "name"]: { $regex: name, $options: "i" },
			[address && "address"]: { $regex: address, $options: "i" },
			[sort]: { $exists: true },
		};

		delete filter[undefined];
		delete toSort[undefined];

		try {
			let docs = await this.model.find(filter).skip(offsetNumber).limit(limitNumber).sort(toSort);
			res.json(docs);
		} catch (exception) {
			if (exception) {
				return res.status(400).json({ message: `Read failed! Reason: ${exception.errmsg || exception._message}` });
			}
		}
	}

	async post(req, res) {
		let validator_response = check_validator_errors(req, res);
		if (validator_response) {
			return res.status(422).json(validator_response);
		}
		try {
			let doc = await this.model.create(req.body);
			res.json(doc);
		} catch (exception) {
			if (exception) {
				console.log(exception);
				return res.status(400).json({ message: `Insertion failed! Reason: ${exception.errmsg || exception._message}` });
			}
		}
	}

	async get_by_id(req, res) {
		let validator_response = check_validator_errors(req, res);
		if (validator_response) {
			return res.status(422).json(validator_response);
		}
		try {
			let doc = await this.model.findOne({ _id: req.params.restaurantId });
			res.json(doc);
		} catch (exception) {
			if (exception) {
				return res.status(400).json({ message: `Read failed! Reason: ${exception.errmsg || exception._message}` });
			}
		}
	}

	async delete(req, res) {
		let validator_response = check_validator_errors(req, res);
		if (validator_response) {
			return res.status(422).json(validator_response);
		}
		try {
			let doc = await this.model.deleteOne({ _id: req.params.restaurantId });
			res.json(doc);
		} catch (exception) {
			if (exception) {
				res.status(400).json({ message: `Delete failed. Reason: ${exception.errmsg || exception._message}` });
			}
		}
	}
	async update(req, res) {
		let validator_response = check_validator_errors(req, res);
		if (validator_response) {
			return res.status(422).json(validator_response);
		}
		try {
			let doc = await this.model.findOneAndUpdate({ _id: req.params.restaurantId }, req.body, {
				new: true,
			});
			res.json(doc);
		} catch (exception) {
			if (exception) {
				res.status(400).json({ message: `Update failed. Reason: ${exception.errmsg || exception._message}` });
			}
		}
	}
}

module.exports = RestaurantDao;
