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

app.set('views', __dirname + '/../static/pug')
app.set('view engine', 'pug')

app.use(require('./controllers')); //Инициализация контролллеров post/get/..
// var routes = require('./router')(passport);
// app.use('/', routes);

app.use(require('./errorHandler'));

// app.io = require('socket.io')();

// app.io.on('connection', function(socket) {
//     console.log("000000000000000000000000000000000000000000");
//     console.log("Connect");
//     socket.on('SocketEm', function(data) {
//         console.log("000000000000000000000000000000000000000000");
//         console.log(data);
//     });
//     socket.on('disconnect', function() {
//         console.log('user disconnected');
//     });
// });


var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.io = io;
io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('order', function(data) {
        console.log(data);
        // client.emit('messages', 'Hello from server');
    });
    // client.on('lucky', function(data) {
    //     console.log(data);
    // });

});


server.listen(config.port, (err) => {
    if (err) throw err;
    logger.info('Server start http://localhost:' + config.port);
})