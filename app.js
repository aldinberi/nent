const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");

/* Configuration import */
let config;

if (!process.env.HEROKU) {
	config = require("./config");
}

console.log("It is hope " + process.env.HEROKU);

const app = express();
app.use(bodyParser.json());

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
