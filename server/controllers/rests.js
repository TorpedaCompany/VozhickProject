let app = new(require('express').Router)();
const models = require('../database/models');

app.get('/rests', (req, res) => {
    models.rests.find({}, function(err, users) {
        res.send(users.reduce(function(userMap, item) {
            userMap[item.restName] = item;
            return userMap;
        }, {}));
    });
})
app.get('/rests/:name', (req, res) => {
    let name = req.params.name;
    models.rests.find({ 'restName': name }, function(err, data) {
        res.send(data);
    });
})
app.post('/rests', (req, res) => {
    // console.log(req.body.restName);
    var newRest = new models.rests({
        restName: req.body.restName,
    });
    newRest.save(function(err) {
        if (err) return console.log(err);
        console.log("Сохранен объект user", newRest);
    });
    res.send(200);
})

module.exports = app;


// var newRest = new Rests({
//     restName: 'Rest NewYork',
//     restCategory: ['hot', 'sup', 'dessert'],
//     restDishes: [{
//         name: 'dish_1',
//         category: 'hot',
//         price: 2
//     }]
// });

// user.save(function(err) {
//     mongoose.disconnect();

//     if (err) return console.log(err);

//     console.log("Сохранен объект user", user);
// });