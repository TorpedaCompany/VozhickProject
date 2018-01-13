const mongoose = require('mongoose');

// var ObjectId = mongoose.Schema.Types.ObjectId;

let dishSchema = new mongoose.Schema({
    dishID: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: String,
    category: String,
    img: {
        type: String,
        default: "../image/rest/rest_placeholder.svg"
    },
    description: String,
    composition: String,
    grams: String,
    price: Number
})

let restsSchema = new mongoose.Schema({
    restName: {
        type: String,
        required: [true, "restNameRequired"],
        maxlength: [20, "tooLongRestName"],
        minlength: [2, "tooShortRestName"],
        unique: true
    },
    restCategory: {
        type: String,
        lowercase: true,
    },
    restDishes: {
        type: [dishSchema],
        default: []
    },
    restImage: {
        type: String,
        default: '../image/rest/rest_placeholder.svg'
    },
    restConstructor: {
        type: Boolean,
        default: false
    },
    restOpenTime: {
        type: String
    },
    restCloseTime: {
        type: String
    },
    ordersOfDay: {
        type: Number,
        max: [9999, "incorrectNumOrdersDay"],
        min: [0, "incorrectNumOrdersDay"],
    },
    ordersOfMonth: {
        type: Number,
        max: [9999, "incorrectNumOrdersMonth"],
        min: [0, "incorrectNumOrdersMonth"],
    },
    ordersOfYear: {
        type: Number,
        max: [99999, "incorrectNumOrdersYear"],
        min: [0, "incorrectNumOrdersYear"],
    },
    ordersOfTotal: {
        type: Number,
        max: [999999, "incorrectNumOrdersTotal"],
        min: [0, "incorrectNumOrdersTotal"],
    },

});

// restsSchema.pre('save', function(next) {
//     const user = this;
//     if (this.isModified('password') || this.isNew) {
//         bCrypt.genSalt(10, (error, salt) => {
//             if (error) return next(error);
//             bCrypt.hash(user.password, salt, (error, hash) => {
//                 if (error) return next(error);
//                 user.password = hash;
//                 next();
//             });
//         });
//     } else {
//         return next();
//     }
// });

module.exports = {
        rests: mongoose.model('rests', restsSchema, 'rests'),
        dish: mongoose.model('dish', dishSchema, 'rests')
    }
    // module.exports = mongoose.model('rests', restsSchema, 'rests');