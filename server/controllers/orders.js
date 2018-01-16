let app = new(require('express').Router)();
// const mongoose = require('mongoose');
const models = require('../database/models');
const passport = require('passport');

var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

app.get('/orders', isAuthenticated, (req, res) => {
    models.orders.find({}, function(err, data) {
        if (err)
            return res.status(500).send({ error: err });
        else
            return res.status(200).send(data);
    });
})

app.get('/orders/:id', isAuthenticated, (req, res) => {
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
    models.rests.rests.findOne({ "restName": req.body.restName }, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        else {
            let ordDishes = req.body.dishes;
            let arr = [];
            // console.log(ordDishes);
            ordDishes.forEach(function(ord) {
                data.restDishes.forEach(function(obj) {
                    if (obj._id == ord.idDish) {
                        obj.count = ord.count
                        arr.push(obj);
                    }
                });
            })
            let order = new models.orders();
            for (key in req.body) {
                if (key != "dishes") {
                    order[key] = req.body[key];
                    // console.log(key + "  " + req.body[key]);
                }
            }
            order.dishes = arr;

            let tmpPrice = 0;
            order.dishes.forEach(function(item) {
                tmpPrice += (parseInt(item.price) * parseInt(item.count))
            })
            order.totalPrice = tmpPrice;

            order.save(function(err, data) {
                if (err)
                    return res.status(500).send({ error: err.message });
                else {
                    if (ordDishes.length != arr.length)
                        return res.status(500).send({ message: "Некоторые блюда не были обработаны" });
                    else
                        return res.status(200).send(data._id);
                }
            })

        }
    });
})

app.put('/orders/:id', isAuthenticated, (req, res) => {
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
app.delete('/orders/:id', isAuthenticated, (req, res) => {
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