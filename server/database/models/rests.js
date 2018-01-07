const mongoose = require('mongoose');
let restsSchema = new mongoose.Schema({
    restName: {
        type: String, // тип: String
        required: [true, "restNameRequired"],
        maxlength: [20, "tooLongRestName"],
        minlength: [2, "tooShortRestName"],
        unique: true // Оно должно быть уникальным
    },
    restCategory: {
        type: [String],
        lowercase: true, // Always convert `test` to lowercase
        // required: true
    },
    restDishes: {
        type: Object,
        // default: []
    },
    restImage: {
        type: String,
        default: './image/rest/rest_placeholder.svg'
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
module.exports = mongoose.model('rests', restsSchema, 'rests');