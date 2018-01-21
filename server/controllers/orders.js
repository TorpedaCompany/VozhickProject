let app = new(require('express').Router)();
// const mongoose = require('mongoose');
const models = require('../database/models');
const passport = require('passport');


// var isAuthenticated = function(req, res, next) {
//     if (req.isAuthenticated())
//         return next();
//     res.redirect('/');
// }

app.get('/orders', passport.isAuthenticated, (req, res) => {
    models.orders.find({}, function(err, data) {
        if (err)
            return res.status(500).send({ error: err });
        else {
            return res.status(200).send(data);
        }
    });
})

app.get('/orders/:id', passport.isAuthenticated, (req, res) => {
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
    models.rests.rests.findOne({ "restName": req.body.restName.trim() }, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        else {
            let ordDishes = req.body.dishes;
            let arr = [];
            //Сравнение блюд с клиента с сервером, выборка с сервера
            ordDishes.forEach(function(ord) {
                data.restDishes.forEach(function(obj) {
                    if (obj._id == ord.idDish) {
                        obj.count = ord.count
                        arr.push(obj);
                    }
                });
            })
            let order = new models.orders();
            //Перебор полей с клиента, формирование заказа
            for (key in req.body) {
                if (key != "dishes") {
                    order[key] = req.body[key];
                }
            }
            //Подсчет итоговой цены заказа
            let tmpPrice = 0;
            order.dishes.forEach(function(item) {
                    tmpPrice += (parseInt(item.price) * parseInt(item.count))
                })
                //Добавить проверенные блюда в заказ
            order.dishes = arr;
            order.totalCount = arr.length;
            order.totalPrice = tmpPrice;

            //Сохранение блюда в БД
            order.save(function(err, data) {
                if (err)
                    return res.status(500).send({ error: err.message });
                else {
                    if (ordDishes.length != arr.length)
                        return res.status(500).send({ message: "Некоторые блюда не были обработаны" });
                    else {
                        req.app.io.emit("msg", data);
                        return res.status(200).send("OK");
                    }
                }
            })

        }
    });
})
app.post('/orders/:id/accept', passport.isAuthenticated, (req, res) => {
        models.orders.findById(req.params.id, function(err, data) {
            if (err)
                return res.status(500).send({ error: err.message });
            if (!data)
                return res.status(404).send({ error: "Not found" });
            else {
                data.status = "Принят";
                data.save(function(err, data) {
                    if (err)
                        return res.status(500).send({ error: err.message });
                    else
                        return res.status(200).send(data._id);
                });
            }

            // return res.status(200).send(data);
        });
    })
    // app.put('/orders/:id', passport.isAuthenticated, (req, res) => {
    //     models.orders.findById(req.params.id, function(err, data) {
    //         if (err)
    //             return res.status(500).send({ error: err.message });
    //         if (!data)
    //             return res.status(404).send({ error: "Not found" });
    //         for (key in req.body) {
    //             data[key] = req.body[key];
    //         }
    //         data.save(function(err, data) {
    //             if (err)
    //                 return res.status(500).send({ error: err.message });
    //             else
    //                 return res.status(200).send(data._id);
    //         });
    //     })
    // })
    // app.delete('/orders/:id', passport.isAuthenticated, (req, res) => {
    //     models.orders.findById(req.params.id, function(err, data) {
    //         if (err)
    //             return res.status(500).send({ error: err.message });
    //         if (!data)
    //             return res.status(404).send({ error: "Not found" });
    //         data.remove(function(err, data) {
    //             if (err)
    //                 return res.status(500).send({ error: err.message });
    //             else
    //                 return res.status(200).send(data._id);
    //         });
    //     });
    // })
module.exports = app;