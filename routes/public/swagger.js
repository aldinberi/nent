module.exports = (router, config, swaggerJSDoc, swaggerUi) => {
	const swaggerDefinition = {
		info: {
			title: "NENT Coding test Swagger API Documentation",
			version: "1.0.0",
		},
		host: process.env.SWAGGER_HOST || config.SWAGGER_HOST,
		basePath: "/",
		securityDefinitions: {
			bearerAuth: {
				type: "apiKey",
				name: "Authorization",
				scheme: "bearer",
				in: "header",
			},
		},
	};

	const options = {
		swaggerDefinition,
		apis: ["./models/swagger/*.js"],
	};

	const swaggerSpec = swaggerJSDoc(options);

	router.get("/swagger.json", function (req, res) {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});

	router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
