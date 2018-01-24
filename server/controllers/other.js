const Logger = require('../logger');
const logger = new Logger();
const path = require('path');
let app = new(require('express').Router)();
const models = require('../database/models');
// const passport = require('passport');

app.get('/', (req, res) => {
    models.rests.rests.find({}, function(err, data) {
        if (err)
            return res.status(500).send({ error: err });
        else {
            return res.render('index', { rests: data }, function(err, html) {
                if (!err)
                    res.status(200).send(html);
                else {
                    logger.error(err);
                    res.redirect("/error");
                }
            });
        }
    });
})
app.get('/cart', function(req, res) {
    res.render('cart', function(err, html) {
        if (!err)
            res.status(200).send(html);
        else {
            logger.error(err);
        }
    });
});
app.get('/delivery', function(req, res) {
    res.render('delivery', function(err, html) {
        if (!err)
            res.status(200).send(html);
        else {
            logger.error(err);
        }
    });
});
app.get('/news', function(req, res) {
    res.render('news', function(err, html) {
        if (!err)
            res.status(200).send(html);
        else {
            logger.error(err);
        }
    });
});
app.get('/help', function(req, res) {
    res.render('help', function(err, html) {
        if (!err)
            res.status(200).send(html);
        else {
            logger.error(err);
        }
    });
});
app.get('/info', function(req, res) {
    res.render('info', function(err, html) {
        if (!err)
            res.status(200).send(html);
        else {
            logger.error(err);
        }
    });
});

//Должно быть написано в конце всех /
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

module.exports = app;