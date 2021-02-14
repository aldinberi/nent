module.exports = (router, config, express, jwt) => {
	router.use((req, res, next) => {
		let authorization = req.get("Authorization");
		if (authorization) {
			jwt.verify(authorization, process.env.JWT_SECRET || config.JWT_SECRET, (error, decoded) => {
				if (error) {
					res.status(401).send({ message: "Unauthorized access: " + error.message });
				} else {
					next();
				}
			});
		} else {
			res.status(401).json({ message: "Unauthorized access." });
		}
	});

	let restaurant_router = express.Router();
	require("./restaurant")(restaurant_router, config, express);
	router.use("/restaurant", restaurant_router);
};
