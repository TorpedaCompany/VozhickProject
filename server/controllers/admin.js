const Logger = require('../logger');
const logger = new Logger();
let app = new(require('express').Router)();
const models = require('../database/models');
const passport = require('passport');

app.get('/adm', function(req, res) {
    res.render('authAdmin', function(err, html) {
        res.send(html);
        console.log(err);
    });
    var email = require("emailjs");
    // let em = document.getElementById("sendEm");
    // function() {
    var server = email.server.connect({
        user: "vozadm@yandex.by",
        password: "01020304",
        host: "smtp.yandex.ru",
        ssl: true
    });
    console.log(server);
    // send the message and get a callback with an error or details of the message that was sent
    server.send({
            text: "i hope this works",
            from: "vozadm@yandex.by",
            to: "djcrosss1@gmail.com",
            cc: "else <else@your-email.com>",
            subject: "testing emailjs",
            attachment: [
                { path: "rest_1.jpg", type: "image/jpg", headers: { "Content-ID": "my-image" } },
                { data: "<html>i <i>hope</i> this works! here is an image: <img src='cid:my-image' width='100' height ='50'> </html>" },
            ]
        },
        function(err, message) { console.log(err || message); });
    // }, false);
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