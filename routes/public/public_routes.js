module.exports = (router, config, express, jwt) => {
	const swaggerJSDoc = require("swagger-jsdoc");
	const swaggerUi = require("swagger-ui-express");

	//Import all public routes for restaurant
	let restaurant_router = express.Router();
	require("./restaurant")(restaurant_router);
	router.use("/restaurant", restaurant_router);

	//Import all public routes for user
	let user_router = express.Router();
	require("./user")(user_router, config, jwt);
	router.use("/user", user_router);

	//Import all swagger routes
	let swagger_router = express.Router();
	require("./swagger.js")(swagger_router, config, swaggerJSDoc, swaggerUi);
	router.use(swagger_router);
};
