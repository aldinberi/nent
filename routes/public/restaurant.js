module.exports = (router) => {
	const modelRestaurant = require("../../models/mongoose/restaurant");
	const RestaurantDao = require("../../dao/RestaurantDao");
	const { checkSchema, check } = require("express-validator");
	const RestaurantValidator = require("../../models/validator/restaurant");
	const restaurantDao = new RestaurantDao(modelRestaurant);
	const getRestaurantValidator = new RestaurantValidator(true);
	router.get("", checkSchema(getRestaurantValidator), (req, res) => {
		const { day, startTime, endTime } = req.query;
		if (day || startTime || endTime) {
			restaurantDao.get_by_hours(req, res);
		} else {
			restaurantDao.get_by_fields(req, res);
		}
	});

	router.get("/:restaurantId", check("restaurantId").isAlphanumeric(), (req, res) => {
		restaurantDao.get_by_id(req, res);
	});
};
