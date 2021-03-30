module.exports = (router) => {
	const { restaurantPostValidation, restaurantPutValidation } = require("../../models/validator/restaurant");
	const { checkSchema, check } = require("express-validator");
	const modelRestaurant = require("../../models/mongoose/restaurant");
	const RestaurantDao = require("../../dao/RestaurantDao");

	const restaurantDao = new RestaurantDao(modelRestaurant);

	router.post("", checkSchema(restaurantPostValidation), (req, res) => {
		restaurantDao.post(req, res);
	});

	router.delete("/:restaurantId", check("restaurantId").isAlphanumeric(), async (req, res) => {
		restaurantDao.delete(req, res);
	});

	router.put(
		"/:restaurantId",
		check("restaurantId").isAlphanumeric(),
		checkSchema(restaurantPutValidation),
		async (req, res) => {
			restaurantDao.update(req, res);
		}
	);
};
