const Logger = require('../logger');
const logger = new Logger();
const app = new(require('express').Router)();

app.use(require('./users'));
app.use(require('./dishes'));
app.use(require('./rests'));
app.use(require('./admin'));
app.use(require('./orders'));
app.use(require('./other'));

module.exports = app;