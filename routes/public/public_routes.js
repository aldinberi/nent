module.exports = (router, mongoose, config, express) => {

	let restaurant_router = express.Router();
	require("./restaurant.js")(restaurant_router);
	router.use('/restaurant', restaurant_router);

    let user_router = express.Router();
	require("./user.js")(user_router, mongoose, config, express);
	router.use('/user',user_router);

};