// var express = require('express');
// var path = require('path');
// var serveStatic = require('serve-static');
// app = express();
// // console.log(__dirname + '\html\index.html');
// app.use(serveStatic('./static'));
// var port = process.env.PORT || 5000;
// app.listen(port);
// console.log('server started ' + port);

const express = require("express");
const path = require('path')
const port = 5000;
const app = express();

const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db_connect = require('./db');
// var ObjectID = require('mongodb').ObjectID;
// const mongoose = require('mongoose');

app.use(express.static('./static'))

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
})

console.log(path.join(__dirname, '..', './static/index.html'));
MongoClient.connect(db_connect.url, function(err, db) {
    if (err) {
        throw error;
    } else
        console.log('Connect DB success')
        //-----------------------------------------------------
    app.get('/getOrders', (req, res) => {
        db.collection('pending_orders').find({}).toArray(function(error, documents) {
            if (err) throw error;
            res.send(documents);
            console.log("Записи получены");
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
            console.log("Добавлена запись");
        });
    });

    app.listen(port, () => {
        console.log('Server start http://localhost:' + port)
    })

})