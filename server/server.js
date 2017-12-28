const express = require("express");
const path = require('path');
// const cors = require('cors')
const app = express();
const config = require('./config');
const Logger = require('./logger');
const logger = new Logger(); //  Загрузить логгер!
const mongoose = require('mongoose');

// app.use(cors({ origin: 'http://127.0.0.1:5000' }));

app.use(require('./database/rt')); //время выполения запросов

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

require('./database/dbinit'); // Инициализация датабазы

app.use(express.static(path.join(__dirname, '../static')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.use(require('./controllers')); //Инициализация контролллеров post/get/..

app.use(require('./errorHandler'));


app.listen(config.port, (err) => {
    if (err) throw err;
    logger.info('Server start http://localhost:' + config.port);
})

// var ObjectID = require('mongodb').ObjectID;
// MongoClient.connect(db_connect, function(err, db) {
//     if (err) {
//         console.log(err)
//     } else
//         console.log('Connect DB success')
//         //-----------------------------------------------------
//     app.get('/getOrders', (req, res) => {
//         db.collection('pending_orders').find({}).toArray(function(error, documents) {
//             if (err) throw error;
//             res.send(documents);
//             console.log("Отправлены данные --" + new Date());
//         });
//     })
//     app.post('/sendOrder', (req, res) => {
//         const ord = { data_time: req.body.data_time, login: req.body.login, food: req.body.food };
//         db.collection('pending_orders').insert(ord, (err, result) => {
//             if (err) {
//                 res.send({ 'error': 'An error has occurred' });
//             } else {
//                 res.send(result.ops[0]);
//             }
//             console.log("Добавлена запись  --" + new Date());
//         });
//     });

//     app.listen(port, () => {
//         console.log('Server start http://localhost:' + port)
//     })

// })