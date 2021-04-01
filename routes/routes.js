module.exports = (router, config, express) => {
	const jwt = require("jsonwebtoken");

	//redirect to swagger specification
	router.get("/", (req, res) => {
		res.redirect("/api-docs");
	});

	//Import all public routes
	let public_router = express.Router();
	require("./public/public_routes")(public_router, config, express, jwt);
	router.use(public_router);

	//Import all private routes
	let private_router = express.Router();
	require("./private/private_routes")(private_router, config, express, jwt);
	router.use(private_router);
};
