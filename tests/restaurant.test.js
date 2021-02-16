const request = require("supertest");
const app = require("./../app.js");

describe("Test the API for getting all restaurants", () => {
	test("It should response the GET method", async () => {
		const response = await request(app).get("/restaurant");

		json_res = response.body;
		expect(response.statusCode).toBe(200);
	});
});
