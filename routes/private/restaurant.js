module.exports = (router, config, express) => {
	const modelRestaurant = require("../../models/mongoose/restaurant");
	const RestaurantDao = require("../../dao/RestaurantDao");
	const restaurantDao = new RestaurantDao(modelRestaurant);
	const { check, validationResult } = require("express-validator");
	router.post(
		"",
		check("name").custom(async (value) => {
			if (!/^[\s\da-zA-ZåäöÅÄÖ() /,-,&]*$/.test(value)) {
				return Promise.reject("Invalid name");
			}
			let restaurant = await modelRestaurant.findOne({ name: value });
			if (restaurant) {
				return Promise.reject("Restaurant with that name already in use");
			}
		}),
		check("opening_hours").custom(async (value) => {
			let res = value.every((i) => {
				return /^[\s\da-zA-Z :–]*$/.test(i) && typeof i === "string";
			});
			if (!res) {
				return Promise.reject("Invalid opening hours");
			}
		}),
		check("address").custom(async (value) => {
			if (!/^[\s\da-zA-ZåäöÅÄÖ() /,-]*$/.test(value)) {
				return Promise.reject("Invalid address");
			}
		}),
		check("phone_number").custom(async (value) => {
			if (!/[0-9 -/+]/.test(value)) {
				return Promise.reject("Invalid phone number");
			}
		}),
		check("location").custom(async (value) => {
			if (value.lat < -90 || value.lat > 90 || typeof value.lat !== "number") {
				return Promise.reject("Invalid latitude");
			}

			if (value.lng < -180 || value.lng > 180 || typeof value.lng !== "number") {
				return Promise.reject("Invalid longitude");
			}
		}),
		check("price_level").custom(async (value) => {
			if (value < 1 || value > 5 || typeof value !== "number") {
				return Promise.reject("Invalid price_level");
			}
		}),
		check("rating").custom(async (value) => {
			if (value < 1 || value > 5 || typeof value !== "number") {
				return Promise.reject("Invalid rating");
			}
		}),
		check("icon").isURL(),
		check("google_maps_url").isURL().contains("maps.google.com"),
		check("website").isURL(),
		check("photo").isURL(),

		(req, res) => {
			const validationErrors = validationResult(req);
			if (!validationErrors.isEmpty()) {
				return res.status(422).json(validationErrors.array());
			}
			restaurantDao.post(req, res);
		}
	);

	router.delete("/:restaurantId", check("restaurantId").isAlphanumeric(), async (req, res) => {
		restaurantDao.delete(req, res);
	});
};
