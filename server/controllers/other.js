const Logger = require('../logger');
const logger = new Logger();
const path = require('path');
let app = new(require('express').Router)();
const models = require('../database/models');
// const passport = require('passport');

app.get('/', (req, res) => {
    models.rests.rests.find({}, function(err, data) {
        if (err)
            return res.status(500).send({ error: err });
        else {
            return res.render('index', { rests: data }, function(err, html) {
                if (!err)
                    res.status(200).send(html);
                else {
                    logger.error(err);
                    res.redirect("/error");
                }
            });
        }
    });
})
app.get('/cart', function(req, res) {
    res.render('cart', function(err, html) {
        if (!err)
            res.status(200).send(html);
        else {
            logger.error(err);
        }
    });
});
app.get('/delivery', function(req, res) {
    res.render('delivery', function(err, html) {
        if (!err)
            res.status(200).send(html);
        else {
            logger.error(err);
        }
    });
});
app.get('/news', function(req, res) {
    res.render('news', function(err, html) {
        if (!err)
            res.status(200).send(html);
        else {
            logger.error(err);
        }
    });
});
app.get('/help', function(req, res) {
    res.render('help', function(err, html) {
        if (!err)
            res.status(200).send(html);
        else {
            logger.error(err);
        }
    });
});
app.get('/info', function(req, res) {
    res.render('info', function(err, html) {
        if (!err)
            res.status(200).send(html);
        else {
            logger.error(err);
        }
    });
});
app.get('/mail', function(req, res) {
    res.render('mail', function(err, html) {
        if (!err)
            res.status(200).send(html);
        else {
            logger.error(err);
        }
    });
});
var email = require("emailjs");
app.post('/sendm', function(req, res) {
    var server = email.server.connect({
        user: "vozadm@yandex.by",
        password: "01020304",
        host: "smtp.yandex.ru",
        ssl: true
    });
    // send the message and get a callback with an error or details of the message that was sent
    server.send({
            text: "i hope this works",
            from: "vozadm@yandex.by",
            to: "djcrosss1@gmail.com",
            cc: "else <else@your-email.com>",
            subject: "testing emailjs",
            attachment: {
                data: "<html lang='ru'> <head> <meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1.0'> <!-- <link rel='stylesheet' href='../css/style.css'> <link rel='stylesheet' href='../css/header.css'> <link rel='stylesheet' href='../css/footer.css'> <link rel='stylesheet' href='../css/wrapper.css'> <link rel='stylesheet' href='../css/cart-style.css'> <link rel='stylesheet' href='../css/legal-style.css'> --> <!-- <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'> --> <!-- <link href='https://fonts.googleapis.com/css?family=PT+Sans+Narrow' rel='stylesheet'> --> <!-- <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css'> --> </head> <body> <style> * { margin: 0; padding: 0; } .Header { height: 70px; width: 100%; background-color: #fff; box-shadow: 0 0 25px rgba(0, 0, 0, 0.15); padding: 0; font-size: 14px; } .button-menubar { display: flex; justify-content: center; align-items: center; height: 100%; padding: 0; max-width: 70px; } .Menuline { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 0; } .menubar-item { display: flex; flex-direction: column; justify-content: center; align-items: center; /* flex-grow: 1;*/ text-align: center; /* padding: 10px;*/ height: 100%; cursor: pointer; } .menubar-item-a { display: flex; flex-direction: column; justify-content: center; align-items: center; flex-grow: 1; text-align: center; padding: 10px; height: 100%; cursor: pointer; } .container-menubar { display: flex; align-items: center; justify-content: center; height: 100%; padding: 0; } .Phone { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; } .wrapper { font-size: 16px; } .container-cart { /* margin-top: 75px; */ background-color: #fff; box-shadow: 0 0 25px rgba(0, 0, 0, 0.15); padding: 20px; margin-top: 20px; /* padding-top: 70px; */ } .title-cart { font-size: 21px; text-align: center; color: #ff501c; /* font-weight: bold; */ } .main-eat-container-cart { display: flex; flex-direction: column; /* width: 100%; */ /* padding: 10px; */ } .container-eat-cart { display: flex; /* flex-direction: row; */ /* justify-content: flex-start; */ /* align-items: center; */ width: 50%; margin: 0 auto; /* font-size: 18px; */ padding: 0 10px; border: 1px solid #e2e3e0; /* border-bottom: 1px solid; */ } .container-image-eat-cart { display: flex; align-items: center; height: 50px; } .container-button-eat-cart { display: flex; justify-content: flex-end; align-items: center; flex-grow: 1; } .container-price-eat-cart { margin: 0 10px; } .card-dish-action { margin-right: 20px; } .container-all-price-eat-cart { /* display: flex; */ /* justify-content: flex-end; */ /* align-items: center; */ width: 50%; text-align: center; margin: 0px auto; margin-top: 20px; font-size: 18px; padding-bottom: 10px; padding-right: 30px; padding-left: 30px; } .Logo { width: 160px; height: 100%; padding: 0; margin: 0 auto; } img { display: block; /* width: 100%; */ height: 60px; line-height: 60px; } </style> <div class='wrapper'> <div class='col Header'> <div class='Logo'> <!-- <img src='../image/Logo/LogoTest.png' /> --> <img src='cid:my-image' width='100' height='50'> </div> </div> <div class='container-cart'> <div class='title-cart'>Ваш заказ</div> <div class='main-eat-container-cart'> <div class='main-eat-container-cart'> <div class='container-eat-cart'> <div class='container-image-eat-cart'> <div class='container-name-eat-cart'> <span>Пицца 'Ветчина и грибы'</span> </div> </div> <div class='container-button-eat-cart'> <div class='container-price-eat-cart'> <span>10 руб.</span> </div> <div class='card-dish-action'> <div class='dishCount'>1 шт.</div> </div> </div> </div> <div class='container-eat-cart'> <div class='container-image-eat-cart'> <div class='container-name-eat-cart'> <span>Пицца 'Ветчина и грибы'</span> </div> </div> <div class='container-button-eat-cart'> <div class='container-price-eat-cart'> <span>10 руб.</span> </div> <div class='card-dish-action'> <div class='dishCount'>1 шт.</div> </div> </div> </div> </div> <div class='container-all-price-eat-cart'>Общая стоимость: 0 руб.</div> </div> </div> </div> </body> </html>",
                alternative: true,
                related: [{
                    path: path.join(__dirname, "../../static/image/Logo/LogoTest.png"),
                    type: "image/jpeg",
                    name: "rest_1.jpg",
                    headers: { "Content-ID": "<my-image>" }
                }]
            }
        },
        function(err, message) {
            if (!err)
                res.status(200).send(message);
            else {
                logger.error(err);
            }
        });
});




//Должно быть написано в конце всех /
app.use('*', function(req, res) {
    res.render('404', { data404: null }, function(err, html) {
        if (err) {
            logger.error(err);
            return res.status(500).res.end()
        } else {
            res.send(html);
        }

    });
});

module.exports = app;