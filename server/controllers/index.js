const Logger = require('../logger');
const logger = new Logger();

const app = new(require('express').Router)();

app.use(require('./users'));
app.use(require('./rests'));
app.use(require('./admin'));
app.use(require('./orders'));

app.use('*', function(req, res) {
    res.render('404', { data404: null }, function(err, html) {
        if (err) {
            logger.error(err);
            return res.status(500).res.end()
        } else {
            res.send(html);
        }

    });
});

// app.use(require('./post'));

module.exports = app;