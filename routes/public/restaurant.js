module.exports = (router) => {
	const modelRestaurant = require("../../models/mongoose/restaurant");
	const RestaurantDao = require("../../dao/RestaurantDao");
	const { checkSchema, check, validationResult } = require("express-validator");
	const { restaurantPutValidation } = require("../../models/validator/restaurant");
	const restaurantDao = new RestaurantDao(modelRestaurant);

	router.get("", checkSchema(restaurantPutValidation), (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(422).json(validationErrors.array());
		}
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
