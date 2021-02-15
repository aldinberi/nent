const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

/* Configuration import */
let config;
if (!process.env.HEROKU) {
	config = require("./config");
}

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL || config.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

app.get("/", (req, res) => res.send("Hello World"));

let router = express.Router();
require("./routes/routes")(router, config, express);
app.use(router);

module.exports = app;
