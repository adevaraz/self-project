const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', routes);

module.exports = app;