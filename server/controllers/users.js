const app = new(require('express').Router)();
const passport = require('passport');
const models = require('../database/models');
// res.header("Access-Control-Allow-Origin", "*");
app.get('/users', (req, res) => {
    models.users.find({}, function(err, data) {
        if (err)
            return res.status(500).send({ error: err });
        else
            return res.status(200).send(data);
    });
})
app.get('/users/:id', (req, res) => {
    models.users.findById(req.params.id, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        else
            return res.status(200).send(data);
    });
})
app.post('/users', (req, res) => {
    let user = new models.users();
    for (key in req.body) {
        user[key] = req.body[key];
    }
    user.save(function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        else
            return res.status(200).send(data._id);
    })
})

app.put('/users/:id', (req, res) => {
    models.users.findById(req.params.id, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        for (key in req.body) {
            data[key] = req.body[key];
        }
        data.save(function(err, data) {
            if (err)
                return res.status(500).send({ error: err.message });
            else
                return res.status(200).send(data._id);
        });
    })
})
app.delete('/users/:id', (req, res) => {
    models.users.findById(req.params.id, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        data.remove(function(err, data) {
            if (err)
                return res.status(500).send({ error: err.message });
            else
                return res.status(200).send(data._id);
        });
    });
})

app.post('/admin', passport.authenticate('login', {
    successRedirect: '/admin.html',
    failureRedirect: '/fail',
    failureFlash: true
}));
const path = require('path');
app.get('/fail', (req, res) => {
    res.render('http://localhost:5000');
})

var isAuthenticated = function(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}
app.get('/rest.html', isAuthenticated, function(req, res) {
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
});

module.exports = app;