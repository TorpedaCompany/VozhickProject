const Logger = require('../logger');
const logger = new Logger();

let app = new(require('express').Router)();

// app.use(require('./auth'));
app.use(require('./orders'));
// app.use(require('./post'));

module.exports = app;