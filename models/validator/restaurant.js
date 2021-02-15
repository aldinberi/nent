const modelRestaurant = require("../mongoose/restaurant");
let restaurantPostValidation = {
	name: {
		custom: {
			options: async (value) => {
				if (!/^[\s\da-zA-ZåäöÅÄÖ() /,-,&]*$/.test(value)) {
					return Promise.reject("Invalid name");
				}
				let restaurant = await modelRestaurant.findOne({ name: value });
				if (restaurant) {
					return Promise.reject("Restaurant with that name already in use");
				}
			},
		},
	},
	opening_hours: {
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
	},
	address: {
		custom: {
			options: async (value) => {
				if (!/^[\s\da-zA-ZåäöÅÄÖ() /,-]*$/.test(value) || !value) {
					return Promise.reject("Invalid address");
				}
			},
		},
	},
	phone_number: {
		custom: {
			options: async (value) => {
				if (!/[0-9 -/+]/.test(value) || !value) {
					return Promise.reject("Invalid phone number");
				}
			},
		},
	},
	location: {
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
	},
	price_level: {
		custom: {
			options: async (value) => {
				if (value < 1 || value > 5 || typeof value !== "number") {
					return Promise.reject("Invalid price_level");
				}
			},
		},
	},
	rating: {
		custom: {
			options: async (value) => {
				if (value < 1 || value > 5 || typeof value !== "number") {
					return Promise.reject("Invalid rating");
				}
			},
		},
	},
	icon: {
		isURL: true,
	},
	google_maps_url: {
		isURL: true,
		custom: {
			options: async (value) => {
				if (!value.includes("maps.google.com")) {
					return Promise.reject("Invalid google map url");
				}
			},
		},
	},
	website: {
		isURL: true,
	},
	photo: {
		isURL: true,
	},
};

let restaurantPutValidation = {
	name: {
		optional: true,
		custom: {
			options: async (value) => {
				if (!/^[\s\da-zA-ZåäöÅÄÖ() /,-,&]*$/.test(value) || !value) {
					return Promise.reject("Invalid name");
				}
				let restaurant = await modelRestaurant.findOne({ name: value });
				if (restaurant) {
					return Promise.reject("Restaurant with that name already in use");
				}
			},
		},
	},
	opening_hours: {
		optional: true,
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
	},
	address: {
		optional: true,
		custom: {
			options: async (value) => {
				if (!/^[\s\da-zA-ZåäöÅÄÖ() /,-]*$/.test(value) || !value) {
					return Promise.reject("Invalid address");
				}
			},
		},
	},
	phone_number: {
		optional: true,
		custom: {
			options: async (value) => {
				if (!/[0-9 -/+]/.test(value) || !value) {
					return Promise.reject("Invalid phone number");
				}
			},
		},
	},
	location: {
		optional: true,
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
	},
	price_level: {
		optional: true,
		custom: {
			options: async (value) => {
				if (value < 1 || value > 5 || typeof value !== "number") {
					return Promise.reject("Invalid price_level");
				}
			},
		},
	},
	rating: {
		optional: true,
		custom: {
			options: async (value) => {
				if (value < 1 || value > 5 || typeof value !== "number") {
					return Promise.reject("Invalid rating");
				}
			},
		},
	},
	icon: {
		optional: true,
		isURL: true,
	},
	google_maps_url: {
		optional: true,
		isURL: true,
		custom: {
			options: async (value) => {
				if (!value.includes("maps.google.com")) {
					return Promise.reject("Invalid google map url");
				}
			},
		},
	},
	website: {
		optional: true,
		isURL: true,
	},
	photo: {
		optional: true,
		isURL: true,
	},
};

module.exports = { restaurantPostValidation, restaurantPutValidation };
