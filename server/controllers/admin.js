let app = new(require('express').Router)();
const models = require('../database/models');
const passport = require('passport');

var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

app.get('/adm', function(req, res) {
    // if (req.isAuthenticated()) {
    res.render('authAdmin', function(err, html) {
        res.send(html);
        console.log(err);
    });
});

app.post('/adm', passport.authenticate('login', {
    successRedirect: '/adm/dashboard',
    failureRedirect: '/',
    // failureFlash: true
}));
app.get('/adm/dashboard', isAuthenticated, function(req, res) {
    // if (req.isAuthenticated()) {
    res.render('admin_orders', { dataAdmin: null }, function(err, html) {
        res.send(html);
        // console.log(err);
    });
    // }
    // if the user is not authenticated then redirect him to the login page
    // res.redirect('/error');
});
module.exports = app;