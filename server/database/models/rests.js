const mongoose = require('mongoose');
const dishSchema = require('./dishes');

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
        type: [dishSchema.Schema],
        default: []
    },
    restImage: {
        type: String,
        default: '../image/rest/rest_placeholder.svg'
    },
    restImageNigth: {
        type: String,
        default: '../image/rest/rest_placeholder.svg'
    },
    restConstructor: {
        type: Boolean,
        default: false
    },
    constructorPancake: {
        type: Array,
        default: []
    },
    constructorPizza: {
        type: Array,
        default: []
    },
    constructorBurrito: {
        type: Array,
        default: []
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

module.exports = mongoose.model('rests', restsSchema, 'rests')
    // module.exports = mongoose.model('rests', restsSchema, 'rests');