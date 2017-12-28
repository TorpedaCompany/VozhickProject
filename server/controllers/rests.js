let app = new(require('express').Router)();
const models = require('../database/models');

app.get('/rests', (req, res) => {
    models.rests.find({}, function(err, data) {
        if (err)
            res.status(404).send(err.message);
        else
            res.status(200).send(data);
    });
})
app.get('/rests/:name', (req, res) => {
    let search = req.params.name;
    models.rests.find({ "restName": search }, function(err, data) {
        if (err)
            res.status(404).send(err.message);
        else
            res.status(200).send(data);
    });
})
app.post('/rests', (req, res) => {
    var newRest = new models.rests({
        restName: req.body.restName,
        restCategory: req.body.restCategory,
        restDishes: req.body.restDishes,
        restImage: req.body.restImage,
        restOpenTime: req.body.restOpenTime,
        restCloseTime: req.body.restCloseTime,
        ordersOfDay: req.body.ordersOfDay,
        ordersOfMonth: req.body.ordersOfMonth,
        ordersOfYear: req.body.ordersOfYear,
        ordersOfTotal: req.body.ordersOfTotal
    });
    newRest.save(function(err, data) {
        if (err)
            res.status(409).send(err.message);
        else
            res.status(201).send(data._id);
    });
})
app.put('/rests/:id', (req, res) => {
    models.rests.findById(req.params.id, function(err, rest) {
        if (!rest) {
            return res.status(404).send(err);
        }
        for (key in req.body) {
            rest[key] = req.body[key];
        }
        rest.save(function(err, data) {
            if (err)
                res.status(409).send(err.message);
            else
                res.status(201).send(data._id);
        });
    })
})
app.delete('/rests/:id', (req, res) => {
    models.rests.findOneAndRemove(req.params.id, function(err, data) {
        if (err)
            res.status(404).send(err.message);
        else
            res.status(200).send(data._id);
    });
})

module.exports = app;