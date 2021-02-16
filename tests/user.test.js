const request = require("supertest");
const app = require("./../app.js");

describe("Test the API for login in the user", () => {
	test("It should response with the JWT token contaning user information", async () => {
		const response = await request(app).post("/user/login").send({
			email: "campo@gmail.com",
			password: "dfklldke",
		});
		json_res = response.body;
		expect(response.statusCode).toBe(200);
		expect(json_res.jwt).not.toBeNull();
	});

	test("It should response with status code 403 because of the invalid credentials", async () => {
		const response = await request(app).post("/user/login").send({
			email: "campo@gmail.com",
			password: "dfdke",
		});

		json_res = response.body;
		expect(response.statusCode).toBe(403);
		expect(json_res.message).toBe("Incorrect credentials");
	});

	test("It should response with status code 422 because of the invalid email format", async () => {
		const response = await request(app).post("/user/login").send({
			email: "campo",
			password: "dfdke",
		});

		json_res = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_res[0].param).toBe("email");
		expect(json_res[0].msg).toBe("Invalid value");
	});
});

describe("Test the API for register user", () => {
	test("It should response with the user information inserted", async () => {
		const response = await request(app).post("/user/register").send({
			email: "nihad@email.com",
			password: "dfklldke",
			first_name: "nihad",
			last_name: "fer",
		});
		json_response = response.body;
		expect(response.statusCode).toBe(200);
		expect(json_response.email).toBe("nihad@email.com");
		expect(json_response.first_name).toBe("nihad");
		expect(json_response.last_name).toBe("fer");
	});

	test("It should response with email already in use", async () => {
		const response = await request(app).post("/user/register").send({
			email: "aldin@gmail.com",
			password: "dfklldke",
			first_name: "aldin",
			last_name: "berisa",
		});
		json_response = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_response[0].msg).toBe("E-mail already in use");
	});

	test("It should response with breached password used", async () => {
		const response = await request(app).post("/user/register").send({
			email: "hanka@gmail.com",
			password: "123",
			first_name: "aldin",
			last_name: "berisa",
		});
		json_response = response.body;
		expect(response.statusCode).toBe(422);
		expect(json_response[0].msg).toBe("Password has been breached");
	});
});
