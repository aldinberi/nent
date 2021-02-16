module.exports = (router) => {
	const { restaurantPostValidation, restaurantPutValidation } = require("../../models/validator/restaurant");
	const { checkSchema, check, validationResult } = require("express-validator");
	const modelRestaurant = require("../../models/mongoose/restaurant");
	const RestaurantDao = require("../../dao/RestaurantDao");

	const restaurantDao = new RestaurantDao(modelRestaurant);

	router.post("", checkSchema(restaurantPostValidation), (req, res) => {
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

	router.put(
		"/:restaurantId",
		check("restaurantId").isAlphanumeric(),
		checkSchema(restaurantPutValidation),
		async (req, res) => {
			const validationErrors = validationResult(req);
			if (!validationErrors.isEmpty()) {
				return res.status(422).json(validationErrors.array());
			}
			restaurantDao.update(req, res);
		}
	);
};
