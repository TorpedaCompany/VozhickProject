let app = new(require('express').Router)();
// const mongoose = require('mongoose');
const models = require('../database/models');

app.get('/orders', (req, res) => {

    models.orders.find({}, function(err, users) {
        res.send(users.reduce(function(userMap, item) {
            userMap[item.id] = item;
            return userMap;
        }, {}));
    });

    // db.collection('pending_orders').find({}).toArray(function(error, documents) {
    //     if (err) throw error;
    //     res.send(documents);
    //     console.log("Отправлены данные --" + new Date());
    // });
})

module.exports = app;