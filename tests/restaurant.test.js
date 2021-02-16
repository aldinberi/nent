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

describe("Test the root path", () => {
	test("It should response the GET method", (done) => {
		request(app)
			.get("/restaurant")
			.then((response) => {
				expect(response.statusCode).toBe(200);
				done();
			});
	});
});

describe("Test the root path", () => {
	test("It should response the GET method", (done) => {
		request(app)
			.get("/restaurant")
			.then((response) => {
				expect(response.statusCode).toBe(200);
				done();
			});
	});
});
