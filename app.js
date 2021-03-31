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

let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", (req, res) => {
	res.redirect("/api-docs");
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
