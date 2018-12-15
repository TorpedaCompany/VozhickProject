const express = require("express");
const path = require('path');
const pug = require('pug');
var fs = require("fs");
var passport = require('passport');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const config = require('./config');
const Logger = require('./logger');
const logger = new Logger(); //  Загрузить логгер!
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer'); //Для загрузки файлов на сервер

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var flash = require('connect-flash');
app.use(flash());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(session({ //Сессии
    secret: 'mkvGLHUp',
    resave: false,
    saveUninitialized: false,
    key: 'jsessionid',
    cookie: {
        // expires: 1000000 //1800000) 
        secure: false,
        maxAge: null //1800000), 
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./passport');
initPassport(passport);

app.use(require('./database/rt')); //время выполения запросов
require('./database/dbinit'); // Инициализация датабазы

//app.use(express.static(path.join(__dirname, '../static')))

app.set('views', __dirname + '/../static/pug')
app.set('view engine', 'pug')

let server = require('http').createServer(app);
let io = require('socket.io')(server);
// app.set('socketio', io);
app.io = io;
io.on('connection', function(client) {
    console.log('Client connected... Слушаю события: [new_orders, accept_orders, delete_orders]');

    client.on('new_orders', function(data) {
        console.log(":ON new_orders " + data);
    });
    client.on('accept_orders', function(data) {
        console.log(":ON accept_order " + data);
    });
    client.on('delete_orders', function(data) {
        console.log(":ON delete_orders " + data);
    });
});

app.use(require('./controllers')); //Инициализация контролллеров post/get/..

app.use(require('./errorHandler')); //Обработка ошибок

server.listen(config.port, (err) => {
    if (err) throw err;
    logger.info('Server start http://localhost:' + config.port);
})