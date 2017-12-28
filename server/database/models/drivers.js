const mongoose = require('mongoose');

let driversSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "firstNameRequired"],
        maxlength: [32, "tooLongFirstName"],
        minlength: [3, "tooShortFirstName"]
    },
    lastName: {
        type: String,
        required: [true, "lastNameRequired"],
        maxlength: [32, "tooLongLastName"],
        minlength: [3, "tooShortLastName"]
    },
    middleName: {
        type: String,
        required: [true, "middleNameRequired"],
        maxlength: [32, "tooLongMiddleName"],
        minlength: [3, "tooShortMiddleName"]
    },
    phone: {
        type: String,
        required: [true, "phoneRequired"],
        maxlength: [14, "tooLongPhone"],
        minlength: [7, "tooShortPhone"]
    },
    carModel: { //Модель машины
        type: String,
        maxlength: [25, "tooLongСarModel"],
        minlength: [3, "tooShortСarModel"]
    },
    carNumber: { //Номер машины
        type: String,
        maxlength: [12, "tooLongСarModel"],
        minlength: [6, "tooShortСarModel"]
    },
    kmDay: {
        type: Number,
        max: 9999,
        min: 0
    },
    kmMonth: {
        type: Number,
        max: 99999,
        min: 0
    },
    kmYear: {
        type: Number,
        max: 999999,
        min: 0
    },
    kmTotal: {
        type: Number,
        max: 999999,
        min: 0
    },
    ordersDay: {
        type: Number,
        max: 9999,
        min: 0
    },
    ordersMonth: {
        type: Number,
        max: 9999,
        min: 0
    },
    ordersYear: {
        type: Number,
        max: 9999,
        min: 0
    },
    ordersTotal: {
        type: Number,
        max: 999999,
        min: 0
    },
    moneyDay: {
        type: Number,
        max: 9999,
        min: 0
    },
    moneyMonth: {
        type: Number,
        max: 99999,
        min: 0
    },
    moneyYear: {
        type: Number,
        max: 999999,
        min: 0
    },
    moneyTotal: {
        type: Number,
        max: 999999,
        min: 0
    },
});
module.exports = mongoose.model('drivers', driversSchema, 'drivers');