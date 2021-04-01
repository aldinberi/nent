const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const app = express();

/* Configuration import */
let config;

if (!process.env.HEROKU) {
	config = require("./config");
}

app.use(express.json());

//middleware for logging requests
let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));

mongoose.connect(process.env.MONGODB_URL || config.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

//Import all routes
let router = express.Router();
require("./routes/routes")(router, config, express);
app.use(router);

module.exports = app;
