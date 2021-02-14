module.exports = (router, config, express, jwt) => {
	let restaurant_router = express.Router();
	require("./restaurant")(restaurant_router);
	router.use("/restaurant", restaurant_router);

	let user_router = express.Router();
	require("./user")(user_router, config, jwt);
	router.use("/user", user_router);
};
