let app = new(require('express').Router)();


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