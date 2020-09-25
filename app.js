const express = require('express');
const server = require('./server');
const app = express();

// server bootstrap
server(app, __dirname);

module.exports = app;
