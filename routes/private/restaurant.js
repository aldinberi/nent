module.exports = (router, config, express) => {
	const { checkSchema, check, validationResult } = require("express-validator");
	const restaurantValidation = require("../../models/validator/restaurant");
	const modelRestaurant = require("../../models/mongoose/restaurant");
	const RestaurantDao = require("../../dao/RestaurantDao");

	const restaurantDao = new RestaurantDao(modelRestaurant);

	router.post("", checkSchema(restaurantValidation), (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(422).json(validationErrors.array());
		}
		restaurantDao.post(req, res);
	});

	router.delete("/:restaurantId", check("restaurantId").isAlphanumeric(), async (req, res) => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			return res.status(422).json(validationErrors.array());
		}
		restaurantDao.delete(req, res);
	});
};
