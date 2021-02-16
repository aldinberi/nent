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
describe("Test the API for updating restaurants", () => {
	test("It should response with status code 422 because of the invalid id", async () => {
		const response = await request(app)
			.put("/restaurant/5c8264790ba!!!#$#@#555001448f471")
			.send({
				name: "Tikva",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("restaurantId");
		expect(json_res[0].msg).toBe("Invalid value");
	});

	test("It should response with updated restaurant", async () => {
		const response = await request(app)
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
				price_level: 1,
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(200);
		expect(json_res.address).toBe("Repslagargatan 8, 118 46 Stockholm, Sweden");
	});

	test("It should response with name already taken ", async () => {
		const response = await request(app)
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
				name: "Tikva",
				address: "Repslagargatan 8, 118 46 Stockholm, Sweden",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("name");
		expect(json_res[0].msg).toBe("Restaurant with that name already in use");
	});

	test("It should response with invalid name", async () => {
		const response = await request(app)
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
				name: "Jaka@#",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("name");
		expect(json_res[0].msg).toBe("Invalid name");
	});

	test("It should response with invalid address", async () => {
		const response = await request(app)
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
				address: "Repslagar+#@$%#gatan 8, 118 46 Stockholm, Sweden",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("address");
		expect(json_res[0].msg).toBe("Invalid address");
	});

	test("It should response with invalid address", async () => {
		const response = await request(app)
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
				address: "Repslagar+#@$%#gatan 8, 118 46 Stockholm, Sweden",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("address");
		expect(json_res[0].msg).toBe("Invalid address");
	});

	test("It should response with invalid opening hours", async () => {
		const response = await request(app)
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
				opening_hours: [
					"Monday: 11:00 $#$%#^AM – 3:00 PM",
					"Tuesday: 11:00 AM – 3:00 PM",
					"Wednesday: 11:00 AM – 3:00 PM",
					"Thursday: 11:00 AM – 3:00 PM",
					"Friday: 11:00 AM – 3:00 PM",
					"Saturday: Closed",
					"Sunday: Closed",
				],
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("opening_hours");
		expect(json_res[0].msg).toBe("Invalid opening hours");
	});

	test("It should response with invalid phone number", async () => {
		const response = await request(app)
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
				phone_number: "08-641 ASDW 20 77",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("phone_number");
		expect(json_res[0].msg).toBe("Invalid phone number");
	});

	test("It should response with invalid rating", async () => {
		const response = await request(app)
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
				rating: 464,
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("rating");
		expect(json_res[0].msg).toBe("Invalid rating");
	});

	test("It should response with invalid price level", async () => {
		const response = await request(app)
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
				price_level: 678,
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("price_level");
		expect(json_res[0].msg).toBe("Invalid price_level");
	});

	test("It should response with invalid icon link", async () => {
		const response = await request(app)
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
				icon: "dfgdfd",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("icon");
		expect(json_res[0].msg).toBe("Invalid value");
	});

	test("It should response with invalid google map url link", async () => {
		const response = await request(app)
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
				google_maps_url: "https://hello.com/?cid=9369167126300605621",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("google_maps_url");
		expect(json_res[0].msg).toBe("Invalid google map url");
	});

	test("It should response with invalid website link", async () => {
		const response = await request(app)
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
				website: "fbdfbdfc",
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("website");
		expect(json_res[0].msg).toBe("Invalid value");
	});

	test("It should response with invalid photo link", async () => {
		const response = await request(app)
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
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
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
				location: {
					lat: 100,
					lng: 18.0701277,
				},
			})
			.set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("location");
		expect(json_res[0].msg).toBe("Invalid latitude");
	});
	test("It should response with invalid latitude", async () => {
		const response = await request(app)
			.put("/restaurant/602bf4ae61721417fa99723a")
			.send({
				location: {
					lat: 59.31781179999999,
					lng: 200,
				},
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
