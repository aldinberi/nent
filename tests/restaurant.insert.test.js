const request = require("supertest");
const app = require("./../app.js");

let jwt;

beforeAll(async () => {
	const response = await request(app).post("/user/login").send({
		email: "campo@gmail.com",
		password: "dfklldke",
	});
	jwt = response.body.jwt;
});

describe("Test the API for inserting resturant", () => {
	test("It should response with the inserted resturant", async () => {
		const response = await request(app)
			.post("/restaurant")
			.send({
				name: "King",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
				location: {
					lat: 59.31781179999999,
					lng: 18.0701277,
				},
				opening_hours: [
					"Monday: 11:00 AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
				phone_number: "08-641 20 77",
				rating: 4.4,
				price_level: 2,
				icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				google_maps_url: "https://maps.google.com/?cid=9369167126300605621",
				website: "http://www.tamarindo.se/",
				photo: "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg",
			})
			.set("Authorization", jwt);

		let json_res = response.body;
		expect(response.statusCode).toBe(200);

		expect(json_res.name).toBe("King");
		expect(json_res.address).toBe("Repslagargatan 8, 118 46 Stockholm, Sweden");
		expect(json_res.opening_hours[0]).toBe("Monday: 11:00 AM – 3:00 PM");
		expect(json_res.phone_number).toBe("08-641 20 77");
		expect(json_res.rating).toBe(4.4);
		expect(json_res.price_level).toBe(2);
		expect(json_res.icon).toBe("https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png");
		expect(json_res.google_maps_url).toBe("https://maps.google.com/?cid=9369167126300605621");
		expect(json_res.website).toBe("http://www.tamarindo.se/");
		expect(json_res.photo).toBe("https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg");

		json_res = response.body;
	});

	test("It should response with the restaurant name already taken resturant", async () => {
		const response = await request(app)
			.post("/restaurant")
			.send({
				name: "Tamarindo",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
				location: {
					lat: 59.31781179999999,
					lng: 18.0701277,
				},
				opening_hours: [
					"Monday: 11:00 AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
				phone_number: "08-641 20 77",
				rating: 4.4,
				price_level: 2,
				icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				google_maps_url: "https://maps.google.com/?cid=9369167126300605621",
				website: "http://www.tamarindo.se/",
				photo: "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("name");
		expect(json_res[0].msg).toBe("Restaurant with that name already in use");
	});

	test("It should response with invalid name", async () => {
		const response = await request(app)
			.post("/restaurant")
			.send({
				name: "Jaka@#",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
				location: {
					lat: 59.31781179999999,
					lng: 18.0701277,
				},
				opening_hours: [
					"Monday: 11:00 AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
				phone_number: "08-641 20 77",
				rating: 4.4,
				price_level: 2,
				icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				google_maps_url: "https://maps.google.com/?cid=9369167126300605621",
				website: "http://www.tamarindo.se/",
				photo: "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("name");
		expect(json_res[0].msg).toBe("Invalid name");
	});

	test("It should response with invalid address", async () => {
		const response = await request(app)
			.post("/restaurant")
			.send({
				name: "Jaka",
				address: "Repslagar+#@$%#gatan 8, 118 46 Stockholm, Sweden",
				location: {
					lat: 59.31781179999999,
					lng: 18.0701277,
				},
				opening_hours: [
					"Monday: 11:00 AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
				phone_number: "08-641 20 77",
				rating: 4.4,
				price_level: 2,
				icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				google_maps_url: "https://maps.google.com/?cid=9369167126300605621",
				website: "http://www.tamarindo.se/",
				photo: "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("address");
		expect(json_res[0].msg).toBe("Invalid address");
	});

	test("It should response with invalid opening hours", async () => {
		const response = await request(app)
			.post("/restaurant")
			.send({
				name: "Jaka",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
				location: {
					lat: 59.31781179999999,
					lng: 18.0701277,
				},
				opening_hours: [
					"Monday: 11:00 $#$%#^AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
				phone_number: "08-641 20 77",
				rating: 4.4,
				price_level: 2,
				icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				google_maps_url: "https://maps.google.com/?cid=9369167126300605621",
				website: "http://www.tamarindo.se/",
				photo: "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("opening_hours");
		expect(json_res[0].msg).toBe("Invalid opening hours");
	});

	test("It should response with invalid phone number", async () => {
		const response = await request(app)
			.post("/restaurant")
			.send({
				name: "Jaka",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
				location: {
					lat: 59.31781179999999,
					lng: 18.0701277,
				},
				opening_hours: [
					"Monday: 11:00 AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
				phone_number: "08-641 ASDW 20 77",
				rating: 4.4,
				price_level: 2,
				icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				google_maps_url: "https://maps.google.com/?cid=9369167126300605621",
				website: "http://www.tamarindo.se/",
				photo: "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("phone_number");
		expect(json_res[0].msg).toBe("Invalid phone number");
	});

	test("It should response with invalid rating", async () => {
		const response = await request(app)
			.post("/restaurant")
			.send({
				name: "Jaka",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
				location: {
					lat: 59.31781179999999,
					lng: 18.0701277,
				},
				opening_hours: [
					"Monday: 11:00 AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
				phone_number: "08-641 20 77",
				rating: 464,
				price_level: 2,
				icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				google_maps_url: "https://maps.google.com/?cid=9369167126300605621",
				website: "http://www.tamarindo.se/",
				photo: "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("rating");
		expect(json_res[0].msg).toBe("Invalid rating");
	});

	test("It should response with invalid price level", async () => {
		const response = await request(app)
			.post("/restaurant")
			.send({
				name: "Jaka",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
				location: {
					lat: 59.31781179999999,
					lng: 18.0701277,
				},
				opening_hours: [
					"Monday: 11:00 AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
				phone_number: "08-641 20 77",
				rating: 4.4,
				price_level: 678,
				icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				google_maps_url: "https://maps.google.com/?cid=9369167126300605621",
				website: "http://www.tamarindo.se/",
				photo: "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("price_level");
		expect(json_res[0].msg).toBe("Invalid price_level");
	});

	test("It should response with invalid icon link", async () => {
		const response = await request(app)
			.post("/restaurant")
			.send({
				name: "Jaka",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
				location: {
					lat: 59.31781179999999,
					lng: 18.0701277,
				},
				opening_hours: [
					"Monday: 11:00 AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
				phone_number: "08-641 20 77",
				rating: 4.4,
				price_level: 2,
				icon: "dfgdfd",
				google_maps_url: "https://maps.google.com/?cid=9369167126300605621",
				website: "http://www.tamarindo.se/",
				photo: "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("icon");
		expect(json_res[0].msg).toBe("Invalid value");
	});

	test("It should response with invalid google map url link", async () => {
		const response = await request(app)
			.post("/restaurant")
			.send({
				name: "Jaka",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
				location: {
					lat: 59.31781179999999,
					lng: 18.0701277,
				},
				opening_hours: [
					"Monday: 11:00 AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
				phone_number: "08-641 20 77",
				rating: 4.4,
				price_level: 2,
				icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				google_maps_url: "https://hello.com/?cid=9369167126300605621",
				website: "http://www.tamarindo.se/",
				photo: "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("google_maps_url");
		expect(json_res[0].msg).toBe("Invalid google map url");
	});

	test("It should response with invalid website link", async () => {
		const response = await request(app)
			.post("/restaurant")
			.send({
				name: "Jaka",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
				location: {
					lat: 59.31781179999999,
					lng: 18.0701277,
				},
				opening_hours: [
					"Monday: 11:00 AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
				phone_number: "08-641 20 77",
				rating: 4.4,
				price_level: 2,
				icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				google_maps_url: "https://maps.google.com/?cid=9369167126300605621",
				website: "fbdfbdfc",
				photo: "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("website");
		expect(json_res[0].msg).toBe("Invalid value");
	});

	test("It should response with invalid photo link", async () => {
		const response = await request(app)
			.post("/restaurant")
			.send({
				name: "Jaka",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
				location: {
					lat: 59.31781179999999,
					lng: 18.0701277,
				},
				opening_hours: [
					"Monday: 11:00 AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
				phone_number: "08-641 20 77",
				rating: 4.4,
				price_level: 2,
				icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				google_maps_url: "https://maps.google.com/?cid=9369167126300605621",
				website: "http://www.tamarindo.se/",
				photo: "srgegdre",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("photo");
		expect(json_res[0].msg).toBe("Invalid value");
	});

	test("It should response with invalid latitude", async () => {
		const response = await request(app)
			.post("/restaurant")
			.send({
				name: "Jaka",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
				location: {
					lat: 100,
					lng: 18.0701277,
				},
				opening_hours: [
					"Monday: 11:00 AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
				phone_number: "08-641 20 77",
				rating: 4.4,
				price_level: 2,
				icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				google_maps_url: "https://maps.google.com/?cid=9369167126300605621",
				website: "http://www.tamarindo.se/",
				photo: "srgegdre",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("location");
		expect(json_res[0].msg).toBe("Invalid latitude");
	});

	test("It should response with invalid latitude", async () => {
		const response = await request(app)
			.post("/restaurant")
			.send({
				name: "Jaka",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
				location: {
					lat: 59.31781179999999,
					lng: 200,
				},
				opening_hours: [
					"Monday: 11:00 AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
				phone_number: "08-641 20 77",
				rating: 4.4,
				price_level: 2,
				icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
				google_maps_url: "https://maps.google.com/?cid=9369167126300605621",
				website: "http://www.tamarindo.se/",
				photo: "srgegdre",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("location");
		expect(json_res[0].msg).toBe("Invalid longitude");
	});
});

afterAll(() => {
	jwt = null;
});
