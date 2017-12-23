const express = require("express");
const path = require('path')
const port = 5000;
const app = express();

const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db_connect = 'mongodb://User_client:1234509@localhost:27017/order';
// const db_connect = 'mongodb://User_client:1234509@178.159.46.250:27017/order';
// var ObjectID = require('mongodb').ObjectID;
// const mongoose = require('mongoose');

app.use(express.static('./static'))

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
})

MongoClient.connect(db_connect, function(err, db) {
    if (err) {
        console.log(err)
    } else
        console.log('Connect DB success')
        //-----------------------------------------------------
    app.get('/getOrders', (req, res) => {
        db.collection('pending_orders').find({}).toArray(function(error, documents) {
            if (err) throw error;
            res.send(documents);
            console.log("Отправлены данные --" + new Date());
        });
    })
    app.post('/sendOrder', (req, res) => {
        const ord = { data_time: req.body.data_time, login: req.body.login, food: req.body.food };
        db.collection('pending_orders').insert(ord, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
            console.log("Добавлена запись  --" + new Date());
        });
    });

    app.listen(port, () => {
        console.log('Server start http://localhost:' + port)
    })

})