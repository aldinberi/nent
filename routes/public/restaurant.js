module.exports = (router) => {
	const modelRestaurant = require("../../models/mongoose/restaurant");
	const RestaurantDao = require("../../dao/RestaurantDao");
	const { check, validationResult } = require("express-validator");

	const restaurantDao = new RestaurantDao(modelRestaurant);

	router.get("", (req, res) => {
		const { day, startTime, endTime } = req.query;
		if (day || startTime || endTime) {
			restaurantDao.get_by_hours(req, res);
		} else {
			restaurantDao.get_by_fields(req, res);
		}
	});

	router.get("/:restaurantId", check("restaurantId").isAlphanumeric(), (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(422).json(validationErrors.array());
		}
		restaurantDao.get_by_id(req, res);
	});
};
