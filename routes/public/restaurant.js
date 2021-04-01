module.exports = (router) => {
	const RestaurantValidator = require("../../models/validator/restaurant");
	const modelRestaurant = require("../../models/mongoose/restaurant");
	const { checkSchema, check } = require("express-validator");
	const RestaurantDao = require("../../dao/RestaurantDao");

	const restaurantDao = new RestaurantDao(modelRestaurant);
	const getRestaurantValidator = new RestaurantValidator(true);

	//API route for filtering restaurants
	router.get("", checkSchema(getRestaurantValidator), (req, res) => {
		const { day, startTime, endTime } = req.query;
		if (day || startTime || endTime) {
			restaurantDao.get_by_hours(req, res);
		} else {
			restaurantDao.get_by_fields(req, res);
		}
	});
	//API route for fetching a single restaurant based on id
	router.get("/:restaurantId", check("restaurantId").isAlphanumeric(), (req, res) => {
		restaurantDao.get_by_id(req, res);
	});
};
