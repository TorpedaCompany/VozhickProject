let app = new(require('express').Router)();
const models = require('../database/models');

app.get('/users', (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    models.users.find({}, function(err, data) {
        if (err)
            res.status(404).send(err.message);
        else
            res.status(200).send(data);
    });
})
app.get('/users/:id', (req, res) => {
    let search = req.params.id;
    models.users.find({ "_id": search }, function(err, data) {
        if (err)
            res.status(404).send(err.message);
        else
            res.status(200).send(data);
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
    newUsers.save(function(err, data) {
        if (err) {
            res.status(409).send(err.message);

        } else
            res.status(201).send(data._id);
    });
})
app.put('/users/:id', (req, res) => {
    models.users.findById(req.params.id, function(err, user) {
        if (!user) {
            return res.status(404).send(err.message);
        }
        for (key in req.body) {
            user[key] = req.body[key];
        }
        user.save(function(err, data) {
            if (err)
                res.status(409).send(err.message);
            else
                res.status(201).send(data._id);
        });
    })
})
app.delete('/users/:id', (req, res) => {
    // let search = Object.keys(req.params).toString();
    models.users.findOneAndRemove(req.params.id, function(err, data) {
        if (err)
            res.status(404).send(err.message);
        else
            res.status(200).send(data._id);
    });
})

module.exports = app;