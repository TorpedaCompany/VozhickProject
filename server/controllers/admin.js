const Logger = require('../logger');
const logger = new Logger();
let app = new(require('express').Router)();
const models = require('../database/models');
const passport = require('passport');

app.get('/adm', function(req, res) {
    res.render('authAdmin', function(err, html) {
        res.send(html);
        // console.log(err);
    });
});

app.post('/adm', passport.authenticate('login', {
    successRedirect: '/adm/dashboard',
    failureRedirect: '/',
    // failureFlash: true
}));

app.get('/adm/dashboard', passport.isAuthenticated, function(req, res) {
    models.orders.find({}, function(err, data) {
        if (err)
            return res.status(500).send({ error: err });
        else
            return res.render('admin_orders', { dataAdmin: data }, function(err, html) {
                if (!err)
                    res.status(200).send(html);
                logger.error(err);
            });
    });
});
module.exports = app;