const modelRestaurant = require("../mongoose/restaurant");

class RestaurantValidator {
	constructor(optional = false) {
		this.name = {
			optional: optional,
			custom: {
				options: async (value, { location }) => {
					if (!/^[\s\da-zA-ZåäöÅÄÖ() /,-,&]*$/.test(value) || !value) {
						return Promise.reject("Invalid name");
					}
					if (location !== "query") {
						let restaurant = await modelRestaurant.findOne({ name: value });
						if (restaurant) {
							return Promise.reject("Restaurant with that name already in use");
						}
					}
				},
			},
		};

		this.opening_hours = {
			optional: optional,
			custom: {
				options: async (value) => {
					let res = false;
					if (value) {
						res = value.every((i) => {
							return /^[\s\da-zA-Z :–]*$/.test(i) && typeof i === "string";
						});
					}
					if (!res) {
						return Promise.reject("Invalid opening hours");
					}
				},
			},
		};

		this.day = {
			optional: true,
			isAlpha: true,
		};

		this.startTime = {
			optional: true,
			custom: {
				options: async (value) => {
					if (!/^[\s\da-zA-Z :]*$/.test(value) || !value) {
						return Promise.reject("Invalid startTime");
					}
				},
			},
		};

		this.endTime = {
			optional: true,
			custom: {
				options: async (value) => {
					if (!/^[\s\da-zA-Z :]*$/.test(value) || !value) {
						return Promise.reject("Invalid endTime");
					}
				},
			},
		};

		this.sort = {
			optional: true,
			custom: {
				options: async (value) => {
					if (!/^[\s\da-zA-Z_]*$/.test(value) || (!value.includes("rating") && !value.includes("price_level"))) {
						return Promise.reject("Invalid sort field");
					}
				},
			},
		};

		this.sortType = {
			optional: true,
			toInt: true,
			custom: {
				options: async (value) => {
					if (value !== -1 && value !== 1) {
						return Promise.reject("Invalid sort type");
					}
				},
			},
		};

		this.address = {
			optional: optional,
			custom: {
				options: async (value) => {
					if (!/^[\s\da-zA-ZåäöÅÄÖ() /,-]*$/.test(value) || !value) {
						return Promise.reject("Invalid address");
					}
				},
			},
		};

		this.phone_number = {
			optional: optional,
			custom: {
				options: async (value) => {
					if (!/^[\s\d /+-]*$/.test(value) || !value) {
						return Promise.reject("Invalid phone number");
					}
				},
			},
		};

		this.location = {
			optional: optional,
			custom: {
				options: async (value) => {
					if (!value) {
						return Promise.reject("Invalid location");
					}

					if (value.lat < -90 || value.lat > 90 || typeof value.lat !== "number") {
						return Promise.reject("Invalid latitude");
					}

					if (value.lng < -180 || value.lng > 180 || typeof value.lng !== "number") {
						return Promise.reject("Invalid longitude");
					}
				},
			},
		};

		this.price_level = {
			optional: optional,
			toInt: true,
			isInt: true,
			custom: {
				options: async (value) => {
					if (value < 1 || value > 5 || typeof value !== "number") {
						return Promise.reject("Invalid price_level");
					}
				},
			},
		};

		this.limit = {
			optional: true,
			toInt: true,
			isInt: true,
		};

		this.offset = {
			optional: true,
			toInt: true,
			isInt: true,
		};

		this.rating = {
			optional: true,
			toFloat: true,
			isFloat: true,
			custom: {
				options: async (value) => {
					if (value < 1 || value > 5 || typeof value !== "number") {
						return Promise.reject("Invalid rating");
					}
				},
			},
		};

		this.icon = {
			optional: optional,
			isURL: true,
		};

		this.google_maps_url = {
			optional: optional,
			isURL: true,
			custom: {
				options: async (value) => {
					if (!value.includes("maps.google.com")) {
						return Promise.reject("Invalid google map url");
					}
				},
			},
		};

		this.website = {
			optional: optional,
			isURL: true,
		};
		this.photo = {
			optional: optional,
			isURL: true,
		};
	}
}

module.exports = RestaurantValidator;
