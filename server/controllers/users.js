let app = new(require('express').Router)();
const models = require('../database/models');

app.get('/users', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    models.users.find({}, function(err, data) {
        res.send(data.reduce(function(userMap, item) {
            userMap[item.id] = item;
            return userMap;
        }, {}));
    });
})

app.get('/users/:lastName', (req, res) => {
    let search = req.params.name;
    models.users.find({ "lastName": search }, function(err, data) {
        res.send(data);
    });
})

app.post('/users', (req, res) => {
    var newUsers = new models.users({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        street: req.body.street,
        entrance: req.body.entrance,
        floor: req.body.floor,
        apartment: req.body.apartment
    });
    newUsers.save(function(err) {
        if (err) return console.log(err);
        console.log("Сохранен объект user", newUsers);
    });
    res.send(200);
})

app.post('/users1', (req, res) => {
    console.log(req.body);
    console.log();
    res.send(200);
})

module.exports = app;