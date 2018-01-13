const Logger = require('../logger');
const logger = new Logger();
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
                logger.error(err);
            });
        }
    });
})
app.get('/cart', function(req, res) {
    res.render('cart', function(err, html) {
        res.send(html);
        console.log(err);
    });
});
app.get('/delivery', function(req, res) {
    res.render('delivery', function(err, html) {
        res.send(html);
        console.log(err);
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
// app.get('/constructor', function(req, res) {
//     res.render('constructor', function(err, html) {
//         res.send(html);
//         console.log(err);
//     });
// });


// app.get('/adm', function(req, res) {
//     res.render('authAdmin', function(err, html) {
//         res.send(html);
//         console.log(err);
//     });
// });
// app.get('/adm', function(req, res) {
//     res.render('authAdmin', function(err, html) {
//         res.send(html);
//         console.log(err);
//     });
// });
// app.get('/adm', function(req, res) {
//     res.render('authAdmin', function(err, html) {
//         res.send(html);
//         console.log(err);
//     });
// });

module.exports = app;