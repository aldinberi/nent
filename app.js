const express = require('express');
const mongoose = require('mongoose');
const app = express();

/* Configuration import */
let config;
if (!process.env.HEROKU) {
	config = require("./config");
}

mongoose.connect(process.env.MONGODB_URL || config.MONGODB_URL, {useUnifiedTopology: true, useNewUrlParser: true});

//app.get('/', (req, res) => res.send('Hello World'));

let router = express.Router();
require("./routes/routes.js")(router, mongoose, config, express);
app.use(router);



module.exports = app;


