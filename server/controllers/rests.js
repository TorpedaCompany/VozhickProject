let app = new(require('express').Router)();
const models = require('../database/models');

app.get('/rests', (req, res) => {
    models.rests.find({}, function(err, data) {
        if (err)
            return res.status(500).send({ error: err });
        else {
            return res.status(200).send(data);
        }
    });
})
app.get('/rests/:name', (req, res) => {
    models.rests.findOne({ "restName": req.params.name }, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        else
            return res.render('rest', { dataRest: data }, function(err, html) {
                res.send(html);
                console.log(err);
            });
    });
})
app.post('/rests', (req, res) => {
    let rest = new models.rests();
    for (key in req.body) {
        rest[key] = req.body[key];
    }
    rest.save(function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        else
            return res.status(200).send(data._id);
    });
})
app.put('/rests/:id', (req, res) => {
    models.rests.findById(req.params.id, function(err, data) {
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
app.delete('/rests/:id', (req, res) => {
    models.rests.findById(req.params.id, function(err, data) {
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