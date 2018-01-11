const Logger = require('../logger');
const logger = new Logger();

const app = new(require('express').Router)();

app.use(require('./users'));
app.use(require('./rests'));
app.use(require('./admin'));
app.use(require('./orders'));

app.use('*', function(req, res) {
    res.render('404', { data404: null }, function(err, html) {
        res.send(html);
        console.log(err);
    });
});

// app.use(require('./post'));

module.exports = app;