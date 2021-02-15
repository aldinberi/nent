let mongoose = require("mongoose");

let restaurantSchema = new mongoose.Schema({
	opening_hours: {
		type: [String],
		required: [true, "Field opening_hours is requied"],
	},
	address: {
		type: String,
		required: [true, "Field address is requied"],
	},
	phone_number: {
		type: String,
		required: [true, "Field phone_number is requied"],
	},
	location: {
		lat: {
			type: Number,
			required: [true, "Field lat is requied"],
		},
		lng: {
			type: Number,
			required: [true, "Field lng is requied"],
		},
	},
	icon: {
		type: String,
		required: [true, "Field icon is requied"],
	},

	name: {
		type: String,
		required: [true, "Field name is requied"],
	},

	price_level: {
		type: Number,
		required: [true, "Field price_level is requied"],
	},

	rating: {
		type: Number,
		required: [true, "Field rating is requied"],
	},

	google_maps_url: {
		type: String,
		required: [true, "Field google_maps_url is requied"],
	},

	website: {
		type: String,
		required: [true, "Field website is requied"],
	},

	photo: {
		type: String,
		required: [true, "Field photo is requied"],
	},
});

module.exports = mongoose.model("restaurants", restaurantSchema);
