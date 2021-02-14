class RestaurantDao {
	constructor(model) {
		if (!!RestaurantDao.instance) {
			return RestaurantDao.instance;
		}

		RestaurantDao.instance = this;
		this.model = model;

		return this;
	}

    async get_by_hours  (req, res) {
        const {limit, offset, startTime, endTime, day} = req.query
        let limitNumber = Number(limit) || 5;
		    let offsetNumber = Number(offset) || 0;
        let startString = "";
        let endString = "";
        let dayString = day || "";
  
        if(startTime){
          startString = startString + ": " + startTime;
        }
  
        if(endTime){
          endString = endString + " – " + endTime;
        }
  
        let docs = await this.model.aggregate([
          { $unwind: "$opening_hours" },
          { $match: {opening_hours: {$regex: dayString, $options: 'i' } } },
          { $match: {opening_hours: {$regex: startString, $options: 'i' } } },
          { $match: {opening_hours: {$regex: endString, $options: 'i' } } },
          { $skip: offsetNumber },
          { $limit: limitNumber }
        ]);
        res.json(docs);
    }

    async get_by_fields(req, res){
        const {limit, offset, sortType, sort, name, address} = req.query
        let limitNumber = Number(limit) || 5;
		    let offsetNumber = Number(offset) || 0;

        let toSort = {
            [sort] : Number(sortType) || -1,
          };
      
          let filter = {
            [ name && "name"] : { $regex:name, $options: 'i' },
            [ address && "address"] : { $regex:address, $options: 'i' },
          }
      
          delete filter[undefined];
          delete toSort[undefined];
          
          let docs = await this.model.find(filter).skip(offsetNumber).limit(limitNumber).sort(toSort);
          res.json(docs);
    }
}

module.exports = RestaurantDao;
