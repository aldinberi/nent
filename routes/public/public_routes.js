module.exports = (router, mongoose, config, express) => {

	let restaurant_router = express.Router();
	require("./restaurant")(restaurant_router);
	router.use('/restaurant', restaurant_router);

    let user_router = express.Router();
	require("./user")(user_router, mongoose, config, express);
	router.use('/user',user_router);

};