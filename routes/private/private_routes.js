module.exports = (router, mongoose, jwt, config, express) => {
	let restaurant_router = express.Router();
	require("./restaurant.js")(restaurant_router, mongoose, jwt, config, express);
	router.use(restaurant_router);


};