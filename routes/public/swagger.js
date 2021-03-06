module.exports = (router, config, swaggerJSDoc, swaggerUi) => {
	const swaggerDefinition = {
		info: {
			title: "Swagger API Documentation",
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
		res.json(swaggerSpec);
	});

	router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
