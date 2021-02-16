const request = require("supertest");
const app = require("../app.js");

beforeAll(async () => {
	const response = await request(app).post("/user/login").send({
		email: "campo@gmail.com",
		password: "dfklldke",
	});
	jwt = response.body.jwt;
});

describe("Test the API for deleting restaurants", () => {
	test("It should response with status code 422 because of the invalid id", async () => {
		const response = await request(app).delete("/restaurant/5c8264790ba!!!#$#@#555001448f471").set("Authorization", jwt);
		let json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("restaurantId");
		expect(json_res[0].msg).toBe("Invalid value");
	});

	test("It should response with deleting the restaurant", async () => {
		const responseInsert = await request(app)
			.post("/restaurant")
			.send({
				name: "Jabuke",
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
		let json_res_ins = responseInsert.body;
		expect(responseInsert.statusCode).toBe(200);

		expect(json_res_ins.name).toBe("Jabuke");

		const responseDel = await request(app)
			.delete("/restaurant/" + json_res_ins._id)
			.set("Authorization", jwt);
		let json_res_del = responseDel.body;
		expect(responseDel.statusCode).toBe(200);
		expect(json_res_del.ok).toBe(1);
	});
});

afterAll(() => {
	jwt = null;
});
