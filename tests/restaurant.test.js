const request = require("supertest");
const app = require("./../app.js");

let jwt;

// beforeEach((done) => {
// 	server = app.listen(4000, (err) => {
// 		if (err) return done(err);

// 		agent = request.agent(server); // since the application is already listening, it should use the allocated port
// 		done();
// 	});
// });

// afterEach(async (done) => {
// 	return (await server) && server.close(done);
// });

beforeAll(async () => {
	const response = await request(app).post("/user/login").send({
		email: "campo@gmail.com",
		password: "dfklldke",
	});
	jwt = response.body.jwt;
});

describe("Test the API for getting all restaurants", () => {
	test("It should response with 200 status", async () => {
		const response = await request(app).get("/restaurant");
		expect(response.statusCode).toBe(200);
		expect(response.body.length).toBe(5);
	});
});

describe("Test the API for getting a restaurants by id", () => {
	test("It should response the restaurant with the specified id", async () => {
		const response = await request(app).get("/restaurant/5c8264790ba555001448f471");
		json_res = response.body;
		expect(response.statusCode).toBe(200);
		expect(json_res.address).toBe("Ingenjörsvägen 8, 117 59 Stockholm, Sweden");
		expect(json_res.name).toBe("Chicha 08");
		expect(json_res.price_level).toBe(2);
	});

	test("It should response with status code 422 because of the invalid id", async () => {
		const response = await request(app).get("/restaurant/5c8264790ba!!!#$#@#555001448f471");
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("restaurantId");
		expect(json_res[0].msg).toBe("Invalid value");
	});
});

describe("Test the API for getting a restaurants by different query parameters", () => {
	test("It should response with restaurants containing 'Stockholm' in the address", async () => {
		const response = await request(app).get("/restaurant?address=stockholm");
		json_res = response.body;
		expect(response.statusCode).toBe(200);
		expect(json_res[0].address).toContain("Stockholm");
	});

	test("It should response with status code 422 because of the invalid address", async () => {
		const response = await request(app).get("/restaurant?address=stoc%%kholm");
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("address");
		expect(json_res[0].msg).toBe("Invalid address");
	});

	test("It should response with restaurants containing opening hours on Monday to be 8:00 AM", async () => {
		const response = await request(app).get("/restaurant?day=Monday&startTime=8:00+AM");
		json_res = response.body;
		expect(response.statusCode).toBe(200);
		expect(json_res[0].name).toBe("Paradiset Södermalm");
		expect(json_res[0].opening_hours).toContain("Monday");
		expect(json_res[0].opening_hours).toContain("8:00 AM");
	});

	test("It should response with restaurants containing closing hours on Monday to be 3:00 PM", async () => {
		const response = await request(app).get("/restaurant?day=Monday&endTime=3:00+PM");
		json_res = response.body;
		expect(response.statusCode).toBe(200);
		expect(json_res[0].name).toBe("Tamarindo");
		expect(json_res[0].opening_hours).toContain("Monday");
		expect(json_res[0].opening_hours).toContain("3:00 PM");
	});

	test("It should response with status code 422 because of the invalid day", async () => {
		const response = await request(app).get("/restaurant?day=monday!@#");
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("day");
		expect(json_res[0].msg).toBe("Invalid value");
	});

	test("It should response with status code 422 because of the invalid startTime", async () => {
		const response = await request(app).get("/restaurant?startTime=8:00@!+AM");
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("startTime");
		expect(json_res[0].msg).toBe("Invalid startTime");
	});

	test("It should response with status code 422 because of the invalid startTime", async () => {
		const response = await request(app).get("/restaurant?endTime=9:00@!+PM");
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("endTime");
		expect(json_res[0].msg).toBe("Invalid endTime");
	});

	test("It should response with status code 422 because of the invalid startTime", async () => {
		const response = await request(app).get("/restaurant?endTime=9:00@!+PM");
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("endTime");
		expect(json_res[0].msg).toBe("Invalid endTime");
	});

	test("It should response with restaurants with specific rating of 4.4", async () => {
		const response = await request(app).get("/restaurant?rating=4.4");
		json_res = response.body;
		expect(response.statusCode).toBe(200);
		expect(json_res[0].name).toBe("Tamarindo");
		expect(json_res[0].rating).toBe(4.4);
	});

	test("It should response with status code 422 because of the invalid rating field", async () => {
		const response = await request(app).get("/restaurant?rating=eee");
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("rating");
		expect(json_res[0].msg).toBe("Invalid value");
	});

	test("It should response with restaurants sorted by highest to lowest rating", async () => {
		const response = await request(app).get("/restaurant?sort=rating");
		json_res = response.body;
		expect(json_res[0].rating).toBe(4.8);
		expect(json_res[1].rating).toBeLessThanOrEqual(4.8);
		expect(response.statusCode).toBe(200);
	});

	test("It should response with restaurants sorted by lowest to highest rating", async () => {
		const response = await request(app).get("/restaurant?sort=rating&sortType=1");
		json_res = response.body;
		expect(json_res[0].rating).toBe(3.6);
		expect(3.6).toBeLessThanOrEqual(json_res[1].rating);
		expect(response.statusCode).toBe(200);
	});

	test("It should response with restaurants sorted by highest to lowest price level", async () => {
		const response = await request(app).get("/restaurant?sort=price_level");
		json_res = response.body;
		expect(json_res[0].price_level).toBe(2);
		expect(json_res[1].price_level).toBeLessThanOrEqual(2);
		expect(response.statusCode).toBe(200);
	});

	test("It should response with restaurants sorted by lowest to highest price level", async () => {
		const response = await request(app).get("/restaurant?sort=price_level&sortType=1");
		json_res = response.body;
		expect(json_res[0].price_level).toBe(1);
		expect(1).toBeLessThanOrEqual(json_res[1].price_level);
		expect(response.statusCode).toBe(200);
	});

	test("It should response with status code 422 because of the invalid sorting field", async () => {
		const response = await request(app).get("/restaurant?sort=icon");
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("sort");
		expect(json_res[0].msg).toBe("Invalid sort field");
	});

	test("It should response with status code 422 because of the invalid sortType field", async () => {
		const response = await request(app).get("/restaurant?sortType=www");
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("sortType");
		expect(json_res[0].msg).toBe("Invalid sort type");
	});
});

describe("Test the API for inserting resturant", () => {
	// test("It should response with the inserted resturant", async () => {
	// 	const response = await request(app)
	// 		.post("/restaurant")
	// 		.send({
	// 			name: "King",
	// 			address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
	// 			location: {
	// 				lat: 59.31781179999999,
	// 				lng: 18.0701277,
	// 			},
	// 			opening_hours: [
	// 				"Monday: 11:00 AM – 3:00 PM",
	// 				"Tuesday: 11:00 AM – 3:00 PM",
	// 				"Wednesday: 11:00 AM – 3:00 PM",
	// 				"Thursday: 11:00 AM – 3:00 PM",
	// 				"Friday: 11:00 AM – 3:00 PM",
	// 				"Saturday: Closed",
	// 				"Sunday: Closed",
	// 			],
	// 			phone_number: "08-641 20 77",
	// 			rating: 4.4,
	// 			price_level: 2,
	// 			icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
	// 			google_maps_url: "https://maps.google.com/?cid=9369167126300605621",
	// 			website: "http://www.tamarindo.se/",
	// 			photo: "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg",
	// 		})
	// 		.set("Authorization", jwt);

	// 	json_res = response.body;
	// 	expect(response.statusCode).toBe(200);

	// 	expect(json_res.name).toBe("King");
	// 	expect(json_res.address).toBe("Repslagargatan 8, 118 46 Stockholm, Sweden");
	// 	expect(json_res.opening_hours[0]).toBe("Monday: 11:00 AM – 3:00 PM");
	// 	expect(json_res.phone_number).toBe("08-641 20 77");
	// 	expect(json_res.rating).toBe(4.4);
	// 	expect(json_res.price_level).toBe(2);
	// 	expect(json_res.icon).toBe("https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png");
	// 	expect(json_res.google_maps_url).toBe("https://maps.google.com/?cid=9369167126300605621");
	// 	expect(json_res.website).toBe("http://www.tamarindo.se/");
	// 	expect(json_res.photo).toBe("https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg");

	// 	json_res = response.body;
	// });

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
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("name");
		expect(json_res[0].msg).toBe("Restaurant with that name already in use");
	});

	test("It should response with the restaurant invalid name", async () => {
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
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("name");
		expect(json_res[0].msg).toBe("Invalid name");
	});

	test("It should response with the restaurant invalid address", async () => {
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
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("address");
		expect(json_res[0].msg).toBe("Invalid address");
	});

	test("It should response with the restaurant invalid opening hours", async () => {
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
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("opening_hours");
		expect(json_res[0].msg).toBe("Invalid opening hours");
	});

	test("It should response with the restaurant invalid phone number", async () => {
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
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("phone_number");
		expect(json_res[0].msg).toBe("Invalid phone number");
	});

	test("It should response with the restaurant invalid rating", async () => {
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
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("rating");
		expect(json_res[0].msg).toBe("Invalid rating");
	});

	test("It should response with the restaurant invalid price level", async () => {
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
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("price_level");
		expect(json_res[0].msg).toBe("Invalid price_level");
	});

	test("It should response with the restaurant invalid icon link", async () => {
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
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("icon");
		expect(json_res[0].msg).toBe("Invalid value");
	});

	test("It should response with the restaurant invalid google map url link", async () => {
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
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("google_maps_url");
		expect(json_res[0].msg).toBe("Invalid google map url");
	});

	test("It should response with the restaurant invalid website link", async () => {
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
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("website");
		expect(json_res[0].msg).toBe("Invalid value");
	});

	test("It should response with the restaurant invalid photo link", async () => {
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
		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("photo");
		expect(json_res[0].msg).toBe("Invalid value");
	});
});

afterAll(() => {
	jwt = null;
});
