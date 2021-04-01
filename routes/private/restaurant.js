module.exports = (router) => {
	const { checkSchema, check } = require("express-validator");
	const modelRestaurant = require("../../models/mongoose/restaurant");
	const RestaurantDao = require("../../dao/RestaurantDao");
	const RestaurantValidator = require("../../models/validator/restaurant");

	const restaurantDao = new RestaurantDao(modelRestaurant);

	const postRestaurantValidator = new RestaurantValidator();
	const putRestaurantValidator = new RestaurantValidator(true);

	//API route for posting restaurants
	router.post("", checkSchema(postRestaurantValidator), (req, res) => {
		restaurantDao.post(req, res);
	});

	//API route for deleting restaurants
	router.delete("/:restaurantId", check("restaurantId").isAlphanumeric(), async (req, res) => {
		restaurantDao.delete(req, res);
	});

	//API route for updating restaurants
	router.put(
		"/:restaurantId",
		check("restaurantId").isAlphanumeric(),
		checkSchema(putRestaurantValidator),
		async (req, res) => {
			restaurantDao.update(req, res);
		}
	);
};
