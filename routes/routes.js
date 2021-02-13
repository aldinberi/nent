module.exports = (router, mongoose, config, express) => {
	let public_router = express.Router();
	require("./public/public_routes")(public_router, mongoose, config, express);
	router.use(public_router);

	let private_router = express.Router();
	require("./private/private_routes")(private_router, mongoose, config, express);
	router.use(private_router);

};