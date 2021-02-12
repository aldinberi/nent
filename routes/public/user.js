module.exports = (router, mongoose, config, express) => {
	let model = require('../../models/mongoose/restaurant');

    router.get("/aaa", (req, res) => {
        req.body.id = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 43) + 43);
        model.find({}).then(doc => {
          console.log(doc);
        })
	});
};