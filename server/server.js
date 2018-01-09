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
const multer = require('multer');

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
    secret: 'your secret here',
    resave: true,
    saveUninitialized: true,
    key: 'jsessionid',
    cookie: {
        maxAge: null, //1800000), 
        expires: null //1800000) 
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

app.use(express.static(path.join(__dirname, '../static')))

app.set('views', __dirname + '../../static/pug')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'index.html'));
    res.render('index', function(err, html) {
        res.send(html);
        logger.error(err);
    });
})

app.use(require('./controllers')); //Инициализация контролллеров post/get/..
// var routes = require('./router')(passport);
// app.use('/', routes);

app.use(require('./errorHandler'));

app.listen(config.port, (err) => {
    if (err) throw err;
    logger.info('Server start http://localhost:' + config.port);
})