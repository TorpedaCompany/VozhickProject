let app = new(require('express').Router)();
// const models = require('../database/models');
const models = require('../database/models/rests');
// console.log(models.dish);
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
                // res.send("asd");
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
    // app.post('/rests/:name', (req, res) => {
    //     models.rests.findOne({ "restName": req.params.name }, function(err, data) {
    //         if (err)
    //             return res.status(500).send({ error: err.message });
    //         if (!data)
    //             return res.status(404).send({ error: "Not found" });
    //         // for (key in req.body) {
    //         //     data[key] = req.body[key];
    //         // }
    //         data.restDishes.push(req.body.restDishes.test = { $inc: { dishID: 1 } });
    //         // data.restDishes.push({ "name": "Хито3", "category": "суши", "img": "../image/sushi_1/Авокадо маки@2x.jpg", "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla odit magnam, molestiae accusamus voluptatem. Illo quam in iusto dolores at libero voluptate architecto provident beatae sunt, qui sapiente dictavoluptatum deserunt hic necessitatibus nemo distinctio eveniet, ea, nostrum optio doloremque temporibus esse rerum? Optio quidem non repudiandae reprehenderit aliquam?", "composition": "Жмых, вода, папирус, тростник", "grams": "110/100", "price": 8.30 })

//         data.save(function(err, data) {
//             if (err)
//                 return res.status(500).send({ error: err.message });
//             else
//                 return res.status(200).send(data._id);
//         });

//     })
// })

app.post('/rests/:name', (req, res) => {
    models.rests.findOne({ "restName": req.params.name }, function(err, data) {
        if (err)
            return res.status(500).send({ error: err.message });
        if (!data)
            return res.status(404).send({ error: "Not found" });
        // for (key in req.body) {
        //     data[key] = req.body[key];
        // }
        // data.restDishes.push(req.body.restDishes["dishID"] = data.restName + (data.restDishes[data.restDishes.length - 1].dishID || 0) + 1);
        // data.restDishes.push(req.body.restDishes);

        // // data.restDishes.push({ "name": "Хито3", "category": "суши", "img": "../image/sushi_1/Авокадо маки@2x.jpg", "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla odit magnam, molestiae accusamus voluptatem. Illo quam in iusto dolores at libero voluptate architecto provident beatae sunt, qui sapiente dictavoluptatum deserunt hic necessitatibus nemo distinctio eveniet, ea, nostrum optio doloremque temporibus esse rerum? Optio quidem non repudiandae reprehenderit aliquam?", "composition": "Жмых, вода, папирус, тростник", "grams": "110/100", "price": 8.30 })
        // console.log(data.restDishes);

        let dd = new models.dish({
            name: req.body.name
        })
        console.log(dd);
        data.restDishes.push(dd);

        console.log(req.body);

        data.save(function(err, data) {
            if (err)
                return res.status(500).send({ error: err.message });
            // console.log("asd");
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

// app.use(multer({ dest: './tmp/', fieldSize: '2' }).single('avatar'));

// app.post('/file_upload', function(req, res) {
//     console.log(req.file);
//     let extension = req.file.mimetype.split(/[/ ]/).pop();

//     let allowedMimeTypes = ["image/jpeg", "image/pjpeg", "image/png"];
//     if (allowedMimeTypes.indexOf(req.file.mimetype) == -1) {
//         console.log(req.file.mimetype + ' FALSE');
//     } else {
//         console.log(req.file.mimetype + ' TRUE')
//     }

//     var file = __dirname + "/tmp" + req.file.name + '.png';

//     fs.readFile(req.file.path, function(err, data) {
//         fs.writeFile(file, data, function(err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 response = {
//                     message: 'File uploaded successfully',
//                     filename: req.file.name
//                 };
//             }
//             console.log(response);
//             res.end(JSON.stringify(response));
//         });
//     });
// })



module.exports = app;