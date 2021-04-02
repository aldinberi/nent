class RestaurantDao {
	constructor(model) {
		if (!!RestaurantDao.instance) {
			return RestaurantDao.instance;
		}

		RestaurantDao.instance = this;
		this.model = model;

		return this;
	}

	async filter(req, res) {
		let validator_response = check_validator_errors(req, res);
		if (validator_response) {
			return res.status(422).json(validator_response);
		}
		let pipeline = [];
		const { limit, offset, startTime, endTime, day, sortType, sort, name, address } = req.query;
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

		if (Object.entries(filter).length !== 0) {
			pipeline.push({ $match: filter });
		}

		if (day || startTime || endTime) {
			let startString = "";
			let endString = "";
			let dayString = day || "";

			if (startTime) {
				startString = startString + ": " + startTime;
			}

			if (endTime) {
				endString = endString + " – " + endTime;
			}

			pipeline.push(
				{ $unwind: "$opening_hours" },
				{ $match: { opening_hours: { $regex: dayString, $options: "i" } } },
				{ $match: { opening_hours: { $regex: startString, $options: "i" } } },
				{ $match: { opening_hours: { $regex: endString, $options: "i" } } }
			);
		}

		if (Object.entries(toSort).length !== 0) {
			pipeline.push({ $sort: toSort });
		}

		pipeline.push({ $skip: offsetNumber }, { $limit: limitNumber });

		try {
			let docs = await this.model.aggregate(pipeline);
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
