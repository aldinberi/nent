const express = require('express');
const app = express();

/* Configuration import */
let config;
if (!process.env.HEROKU) {
	config = require("./config");
}



app.get('/', (req, res) => res.send('Hello World'));

module.exports = app;


