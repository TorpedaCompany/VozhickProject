const Logger = require('../logger');
const logger = new Logger();
let app = new(require('express').Router)();
const models = require('../database/models');
const passport = require('passport');

app.get('/adm', function(req, res) {
    res.render('authAdmin', function(err, html) {
        res.send(html);
    });
});

app.post('/adm', passport.authenticate('login', {
    successRedirect: '/adm/dashboard',
    failureRedirect: '/adm',
    // failureFlash: true
}));
app.get('/logout', function(req, res, next) {
    // req.session.destroy(function() {
    //     res.clearCookie('jsessionid');
    //     res.redirect('/');
    // });

    req.logout();
    req.session.destroy();
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.redirect('/adm');
});
app.get('/adm/dashboard', passport.isAuthenticated, function(req, res) {
    let rests = [];
    models.rests.find({}, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        else {
            rests = data;
        }
    });

    models.orders.find({}, function(err, data) {
        if (err)
            return res.status(500).send({ error: err });
        else
            return res.render('admin_orders', { dataAdmin: data.reverse(), restsList: rests }, function(err, html) {
                if (!err)
                    res.status(200).send(html);
                // logger.error(err);
            });
    });


});
module.exports = app;