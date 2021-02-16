const request = require("supertest");
const app = require("./../app.js");

// let server, agent;

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

	test("It should response with restaurants containing closing hours on Monday to be 3:00 PM", async () => {
		const response = await request(app).get("/restaurant?day=Monday&endTime=3:00+PM");
		json_res = response.body;
		expect(response.statusCode).toBe(200);
		expect(json_res[0].name).toBe("Tamarindo");
		expect(json_res[0].opening_hours).toContain("Monday");
		expect(json_res[0].opening_hours).toContain("3:00 PM");
	});

	test("It should response with restaurants containing closing hours on Monday to be 3:00 PM", async () => {
		const response = await request(app).get("/restaurant?day=Monday&endTime=3:00+PM");
		json_res = response.body;
		expect(response.statusCode).toBe(200);
		expect(json_res[0].name).toBe("Tamarindo");
		expect(json_res[0].opening_hours).toContain("Monday");
		expect(json_res[0].opening_hours).toContain("3:00 PM");
	});

	test("It should response with restaurants with specific rating of 4.4", async () => {
		const response = await request(app).get("/restaurant?rating=4.4");
		json_res = response.body;
		expect(response.statusCode).toBe(200);
		expect(json_res[0].name).toBe("Tamarindo");
		expect(json_res[0].rating).toBe(4.4);
	});

	test("It should response with restaurants sorted by highest to lowest rating", async () => {
		const response = await request(app).get("/restaurant?sort=rating");
		json_res = response.body;
		expect(json_res[0].rating).toBe(4.8);
		expect(json_res[1].rating).toBeLessThanOrEqual(4.8);
		expect(response.statusCode).toBe(200);
	});
});
