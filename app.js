const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");

/* Configuration import */
let config;

if (!process.env.HEROKU) {
	config = require("./config");
}

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Please go to /api-docs for OpenAPI specification");
});

mongoose.connect(process.env.MONGODB_URL || config.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

let router = express.Router();
require("./routes/routes")(router, config, express);
app.use(router);

module.exports = app;
