module.exports = (router) => {
	const modelRestaurant = require('../../models/mongoose/restaurant');
  const RestaurantDao = require('../../dao/RestaurantDao');

  const restaurantDao = new RestaurantDao(modelRestaurant);

	router.get("", (req, res) => {
    if( req.query.day || req.query.startTime || req.query.endTime ){
      restaurantDao.get_by_hours(req, res);
    }else{
      restaurantDao.get_by_fields(req, res);
    }
  });
};