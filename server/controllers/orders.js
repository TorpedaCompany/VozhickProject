const Logger = require('../logger');
const logger = new Logger();
let app = new(require('express').Router)();
// const mongoose = require('mongoose');
const models = require('../database/models');
const passport = require('passport');
const sendMail = require('./sendMail');

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
    let restName = (req.body.restName != undefined) ? req.body.restName.trim() : "none";
    models.rests.rests.findOne({ "restName": restName }, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Ресторан не найден" });
        else {
            if (req.body.dishes.length <= 0)
                return res.status(500).send({ error: "Блюда не были обработаны" });

            let ordDishes = req.body.dishes;
            let arr = [],
                arrIngred = [];


            //Сравнение блюд с клиента с сервером, выборка с сервера
            ordDishes.forEach(function(ord) {
                if (ord.idDish.split(" ")[0] == "Блинчик") {
                    let priceIng = 0;
                    arrIngred = ord.idDish.substring(9).slice(0, -1).split(", ");
                    for (let i = 0; i < arrIngred.length; i++)
                        data.constructorPancake.forEach(function(item) {
                            if (item.name == arrIngred[i]) {
                                priceIng += item.price;
                            }
                        })
                    ord.name = ord.idDish;
                    ord.price = priceIng.toFixed(2);
                    arr.push(ord);
                }
                if (ord.idDish.split(" ")[0] == "Пицца") {
                    let priceIng = 0;
                    arrIngred = ord.idDish.substring(7).slice(0, -1).split(", ");
                    for (let i = 0; i < arrIngred.length; i++)
                        data.constructorPizza.forEach(function(item) {
                            if (item.name == arrIngred[i]) {
                                priceIng += parseFloat(item.price);
                            }
                        })
                    ord.name = ord.idDish;
                    ord.price = (parseFloat(priceIng) + 1).toFixed(2);
                    arr.push(ord);
                }
                if (ord.idDish.split(" ")[0] == "Буррито") {
                    let priceIng = 0;
                    arrIngred = ord.idDish.substring(9).slice(0, -1).split(", ");
                    for (let i = 0; i < arrIngred.length; i++) {
                        data.constructorBurrito.forEach(function(item) {
                            if (item.name == arrIngred[i]) {
                                priceIng += item.price;
                            }
                        })
                    }
                    ord.name = ord.idDish;
                    ord.price = priceIng.toFixed(2);
                    arr.push(ord);
                }
                data.restDishes.forEach(function(obj) {
                    if (obj._id == ord.idDish) {
                        //Если блюдо порциями
                        if (obj.portions.status)
                            if (ord.count % 1 == 0)
                                obj.price = obj.portions.portionsPrice8 * ord.count;
                            else
                                obj.price = obj.portions.portionsPrice8 * parseInt(ord.count) + obj.portions.portionsPrice4;

                        obj.count = ord.count;
                        arr.push(obj);
                    }
                });
            })
            let order = new models.orders();
            //Перебор полей с клиента, формирование заказа
            // console.info("---------------------body");
            // console.info(req.body);
            for (key in req.body) {
                if (key != "dishes") {
                    order[key] = req.body[key];
                }
            }
            // console.info("---------------------order");
            // console.info(order);
            //Добавить проверенные блюда в заказ
            order.dishes = arr;

            //Подсчет итоговой цены заказа
            let tmpPrice = 0;
            order.dishes.forEach(function(item) {
                // console.log('portion status :');
                // console.log(item);

                //Костыль, нужно переделать логику конструктора

                try {

                    if (item.portions.status)
                        tmpPrice += parseFloat(item.price);
                    else
                        tmpPrice += (parseFloat(item.price) * parseFloat(item.count));

                } catch (err) {
                    logger.warn('Обработана ошибка: Cannot read property status of undefined ');
                    tmpPrice += parseFloat(item.price);

                }

                // if (!typeof item.portions.status === 'undefined') {
                //     if (item.portions.status)
                //         tmpPrice += parseFloat(item.price);
                //     else
                //         tmpPrice += (parseFloat(item.price) * parseFloat(item.count));
                // } else {
                //     tmpPrice += parseFloat(item.price);
                // }
            })

            order.totalCount = arr.length;
            // order.totalPrice = (tmpPrice > 20) ? tmpPrice.toFixed(2) : (parseFloat(tmpPrice) + parseFloat(2)).toFixed(2);
            order.totalPrice = ((tmpPrice > 20) || (restName == "Пиццерия 'Корица'")) ? tmpPrice.toFixed(2) : (parseFloat(tmpPrice) + parseFloat(2)).toFixed(2);

            //Установить дату/время заказа
            order.dateTimeIn = new Date().toLocaleDateString() + "  " + new Date().toLocaleTimeString();

            //Сохранение заказа в БД
            order.save(function(err, data) {
                if (err) {
                    let msg = '';
                    if (err.name == 'ValidationError') {
                        for (field in err.errors) {
                            msg += err.errors[field].message + '; ';
                        }
                        return res.status(406).send({ error: msg });
                    }
                    logger.error(err.message);
                    return res.status(500).send({ error: "Ошибка сервера" });
                } else {
                    if (ordDishes.length != arr.length)
                        return res.status(500).send({ error: "Некоторые блюда не были обработаны" });
                    else {
                        req.app.io.emit("new_orders", data);

                        // sendMail.manager(function(callback) {
                        //     if (!callback.status) {
                        //         logger.error(callback.message);
                        //     } else
                        //         logger.info(callback.message);
                        // });

                        logger.info("Поступил новый заказ");
                        return res.status(200).send("ok");
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
                if (data.status == "Новый") {
                    data.status = "Принят";
                    data.save(function(err, data) {
                        if (err)
                            return res.status(500).send({ error: err.message });
                        else {
                            //Отправка почты
                            sendMail.client(data.email, data.dishes, data.totalPrice, function(callback) {
                                if (!callback.status) {
                                    logger.error(callback.message);
                                } else
                                    logger.info(callback.message);
                            });
                            req.app.io.emit("accept_orders", data._id);
                            return res.status(200).send(data._id);
                        }
                    });
                } else {
                    return res.status(500).send({ message: "Заказ уже принят!" });
                }

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
app.delete('/orders/:id', passport.isAuthenticated, (req, res) => {
    models.orders.findById(req.params.id, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        data.remove(function(err, data) {
            if (err)
                return res.status(500).send({ error: err.message });
            else {
                req.app.io.emit("delete_orders", data._id);
                return res.status(200).send(data._id);
            }
        });
    });
})
module.exports = app;