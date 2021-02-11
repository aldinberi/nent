module.exports = (router, mongoose, jwt, config, express) => {
	let public_router = express.Router();
	require("./public/public_routes.js")(public_router, mongoose, jwt, config, express);
	router.use(public_router);

	let private_router = express.Router();
	require("./private/private_routes.js")(private_router, mongoose, jwt, config, express);
	router.use(private_router);

};