module.exports = (router, config, express, jwt) => {
	const swaggerJSDoc = require("swagger-jsdoc");
	const swaggerUi = require("swagger-ui-express");

	let restaurant_router = express.Router();
	require("./restaurant")(restaurant_router);
	router.use("/restaurant", restaurant_router);

	let user_router = express.Router();
	require("./user")(user_router, config, jwt);
	router.use("/user", user_router);

	let swagger_router = express.Router();
	require("./swagger.js")(swagger_router, config, swaggerJSDoc, swaggerUi);
	router.use(swagger_router);
};
