let app = new(require('express').Router)();


app.get('/adm', function(req, res) {
    // if (req.isAuthenticated()) {
    res.render('authAdmin', function(err, html) {
        res.send(html);
        console.log(err);
    });
});