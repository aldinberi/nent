module.exports = (router, mongoose, config, express) => {
	let restaurant_router = express.Router();
	require("./restaurant.js")(restaurant_router, mongoose, config, express);
	router.use("restaurant/", restaurant_router);


};