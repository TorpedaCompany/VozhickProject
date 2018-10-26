const Logger = require('../logger');
const logger = new Logger();
let app = new(require('express').Router)();
const models = require('../database/models');
const passport = require('passport');

var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}


app.post('/adm/dashboard/rests/dish', passport.isAuthenticated, (req, res) => {
    let newDish = req.body.dish;
    let restName = req.body.restName;

    models.rests.findOne({ "restName": restName }, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        else {
            let dish = new models.dishes();
            for (key in newDish) {
                dish[key] = newDish[key];
            }
            data.restDishes.push(dish);

            data.markModified('restDishes');
            data.save(function(err, data) {
                if (err)
                    return res.status(500).send({ error: err.message });
                else {
                    logger.info("Добавлено блюдо из ресторана: " + restName + " ID: " + dish._id);
                    return res.status(200).send(dish._id);
                }
            });
        }

    });

})

app.put('/adm/dashboard/rests/dish', passport.isAuthenticated, (req, res) => {
    let idDish = req.body.idDish;
    let updDish = req.body.dish;
    let restName = req.body.restName;

    models.rests.findOne({ "restName": restName }, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        else {
            data.restDishes.forEach(function(obj) {
                if (obj._id == idDish) {
                    for (key in updDish) {
                        obj[key] = updDish[key];
                    }
                }
            });
            data.markModified('restDishes');
            data.save(function(err, data) {
                if (err)
                    return res.status(500).send({ error: err.message });
                else {
                    logger.info("Изменено блюдо из ресторана: " + restName + " ID: " + idDish);
                    return res.status(200).send(idDish);
                }
            });
        }

    });

})

app.delete('/adm/dashboard/rests/dish', passport.isAuthenticated, (req, res) => {
    let idDish = req.body.idDish;
    let restName = req.body.restName;

    models.rests.findOne({ "restName": restName }, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        else {
            data.restDishes.forEach(function(obj, index) {
                if (obj._id == idDish) {
                    data.restDishes.splice(index, 1);
                }
            });
            data.markModified('restDishes');
            data.save(function(err, data) {
                if (err)
                    return res.status(500).send({ error: err.message });
                else {
                    logger.info("Удалено блюдо из ресторана: " + restName + " ID: " + idDish);
                    return res.status(200).send(idDish);
                }
            });
        }

    });
})

module.exports = app;