const mongoose = require("mongoose");
const express = require("express");

/* Configuration import */
let config;

if (!process.env.HEROKU) {
	config = require("./config");
}

const app = express();
app.use(express.json());

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
