const Logger = require('../logger');
const logger = new Logger();
const path = require('path');
const config = require('../config');
const email = require("emailjs");
module.exports = function(mailTo, dishes, totalPrice, callback) {
    var server = email.server.connect({
        user: config.email.user,
        password: config.email.pwd,
        host: config.email.host,
        ssl: true
    });
    let listDish = '';
    dishes.forEach(element => {
        listDish += '<tr class="listDishes"><td class="dish">' + element.name + '</td><td class="count">' + element.count + ' шт.</td><td class="price">' + element.price + ' руб.</td></tr>';
    });
    let htmlPage = "<html lang='ru'> <head> <meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1.0'> </head> <body> <style> table { border-collapse: collapse; border-spacing: 0; width: 550px; /* margin: 0 auto; */ font-family: Arial, sans-serif; font-size: 16px; padding: 10px 5px; } td { padding: 10px 5px; /* border: 1px solid black; */ } .img { text-align: center; } .title { text-align: center; background: rgb(238, 238, 238); font-size: 20px; padding: 20px; color: #ff501c; } .listDishes { border-bottom: 1px solid grey; } .dish { min-width: 250px; } .price, .count { text-align: center; width: 70px; } .container { height: 100%; width: 100%; } .totalPrice { text-align: right; } .totalPrice span { font-weight: bold; color: #ff501c; } </style><table class='container'> <tr> <td align='center' valign='top'> <table class='card'> <tr> <td colspan='3' class='img'> <img src='cid:my-image' width='100' height='50'> </td> </tr> <tr> <td colspan='3' class='title'>Ваш заказ принят</td> </tr> " + listDish + " <tr class='totalPrice'> <td colspan='3'>Общая стоимость: <span>" + totalPrice + " руб.</span></td> </tr> </table> </td> </tr> </table> </body> </html>";
    return server.send({
            text: "Заказ на доставку",
            from: config.email.user,
            to: mailTo,
            cc: "",
            subject: "Доставка",
            attachment: {
                data: htmlPage,
                alternative: true,
                related: [{
                    path: path.join(__dirname, "../../static/image/Logo/LogoTest.png"),
                    type: "image/jpeg",
                    name: "logo.jpg",
                    headers: { "Content-ID": "<my-image>" }
                }]
            }
        },
        function(err, message) {
            if (!err) {
                // logger.info("Cообщение отправлено: " + mailTo);
                callback({ "status": true, "message": "Cообщение отправлено: " + mailTo });

            } else {
                // logger.error(err);
                callback({ "status": false, "message": "Cообщение не отправлено: " + mailTo, "error": err });
            }
        });
}