let app = new(require('express').Router)();
const models = require('../database/models');
app.get('/users', (req, res) => {
    models.users.find({}, function(err, data) {
        res.send(data.reduce(function(userMap, item) {
            userMap[item.firstName] = item;
            return userMap;
        }, {}));
    });
})
module.exports = app;