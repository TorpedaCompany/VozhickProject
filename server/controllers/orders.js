let app = new(require('express').Router)();
// const mongoose = require('mongoose');
const models = require('../database/models');

app.get('/orders', (req, res) => {
    models.orders.find({}, function(err, data) {
        if (err)
            return res.status(500).send({ error: err });
        else
            return res.status(200).send(data);
    });
})
app.get('/orders/:id', (req, res) => {
    models.orders.findById(req.params.id, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        else
            return res.status(200).send(data);
    });
})
app.post('/orders', (req, res) => {
    let order = new models.orders();
    for (key in req.body) {
        order[key] = req.body[key];
    }
    order.save(function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        else
            return res.status(200).send(data._id);
    })
})
app.put('/orders/:id', (req, res) => {
    models.orders.findById(req.params.id, function(err, data) {
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
app.delete('/orders/:id', (req, res) => {
    models.orders.findById(req.params.id, function(err, data) {
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
module.exports = app;