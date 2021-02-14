module.exports = (router, config, express) => {
	const jwt = require("jsonwebtoken");

	let public_router = express.Router();
	require("./public/public_routes")(public_router, config, express, jwt);
	router.use(public_router);

	let private_router = express.Router();
	require("./private/private_routes")(private_router, config, express, jwt);
	router.use(private_router);
};
