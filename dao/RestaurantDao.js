class RestaurantDao {
	constructor(model) {
		if (!!RestaurantDao.instance) {
			return RestaurantDao.instance;
		}

		RestaurantDao.instance = this;
		this.model = model;

		return this;
	}

    get_by_hours(req, res) {
        let limit = Number(req.query.limit) || 5;
		let offset = Number(req.query.offset) || 0;
        let startString = "";
        let endString = "";
        let dayString = req.query.day || "";
  
        if(req.query.startTime){
          startString = startString + ": " + req.query.startTime;
        }
  
        if(req.query.endTime){
          endString = endString + " – " + req.query.endTime;
        }
  
        this.model.aggregate([
          { $unwind: "$opening_hours" },
          { $match: {opening_hours: {$regex: dayString, $options: 'i' } } },
          { $match: {opening_hours: {$regex: startString, $options: 'i' } } },
          { $match: {opening_hours: {$regex: endString, $options: 'i' } } },
          { $skip: offset },
          { $limit: limit }
      ]).then(docs => {
          res.json(docs);
        });  
    }

    get_by_fields(req, res){
        let limit = Number(req.query.limit) || 5;
		let offset = Number(req.query.offset) || 0;

        let toSort = {
            [req.query.sort] : Number(req.query.sortType) || -1,
          };
      
          let filter = {
            [ req.query.name && "name"] : { $regex:req.query.name, $options: 'i' },
            [ req.query.address && "address"] : { $regex:req.query.address, $options: 'i' },
          }
      
          delete filter[undefined];
          delete toSort[undefined];
      
          this.model.find(filter).skip(offset).limit(limit).sort(toSort).then(docs => {
            res.json(docs);
          });
    }
}

module.exports = RestaurantDao;
