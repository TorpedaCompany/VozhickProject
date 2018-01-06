const app = new(require('express').Router)();
const passport = require('passport');
const models = require('../database/models');
// res.header("Access-Control-Allow-Origin", "*");
app.get('/users', (req, res) => {
    models.users.find({}, function(err, data) {
        if (err)
            return res.status(500).send({ error: err });
        else
            return res.status(200).send(data);
    });
})
app.get('/users/:id', (req, res) => {
    models.users.findById(req.params.id, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        else
            return res.status(200).send(data);
    });
})
app.post('/users', (req, res) => {
    let user = new models.users();
    for (key in req.body) {
        user[key] = req.body[key];
    }
    user.save(function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        else
            return res.status(200).send(data._id);
    })
})
app.post('/login', passport.authenticate('login', {
    successRedirect: '/success',
    failureRedirect: '/error',
    failureFlash: true
}));
// router.post('/login', passport.authenticate('login', {
//     successRedirect: '/home',
//     failureRedirect: '/',
//     failureFlash: true
// }));
// app.post('/users/lg', (req, res) => {
//     models.users.findOne({ email: req.body.email }, (error, user) => {
//         if (error) throw error;

//         if (!user) res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
//         else {
//             user.comparePassword(req.body.password, (error, matches) => {
//                 if (matches && !error) {
//                     // const token = jwt.sign({ user }, config.secret);
//                     res.json({ success: true });
//                 } else {
//                     res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
//                 }
//             });
//         }
//     });
// })
app.put('/users/:id', (req, res) => {
    models.users.findById(req.params.id, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        for (key in req.body) {
            data[key] = req.body[key];
        }
        data.save(function(err, data) {
            if (err)
                return res.status(500).send({ error: err.message });
            else
                return res.status(200).send(data._id);
        });
    })
})
app.delete('/users/:id', (req, res) => {
    models.users.findById(req.params.id, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        data.remove(function(err, data) {
            if (err)
                return res.status(500).send({ error: err.message });
            else
                return res.status(200).send(data._id);
        });
    });
})

module.exports = app;