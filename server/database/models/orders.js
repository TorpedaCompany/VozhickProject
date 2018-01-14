const mongoose = require('mongoose');
// Информация о заказе: 
// Заказчик 
// Из какого ресторана 
// Какие блюда 
// Стоимость заказа 
// Время заказа 
// Каким водителем был выполнен 

let ordersSchema = new mongoose.Schema({
    // client: String,
    firstName: {
        type: String,
        required: [true, "firstNameRequired"],
        maxlength: [32, "tooLongFirstName"],
        minlength: [3, "tooShortFirstName"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "lastNameRequired"],
        maxlength: [32, "tooLongLastName"],
        minlength: [3, "tooShortLastName"],
        trim: true
    },
    middleName: {
        type: String,
        required: [true, "middleNameRequired"],
        maxlength: [32, "tooLongMiddleName"],
        minlength: [3, "tooShortMiddleName"],
        trim: true
    },
    phone: {
        type: String,
        required: [true, "phoneRequired"],
        maxlength: [14, "tooLongPhone"],
        minlength: [7, "tooShortPhone"],
        match: [/^\+375[0-9]{2}[0-9]{7}$/, "phoneIncorrect"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "emailRequired"],
        match: [/@/, "emailIncorrect"],
    },
    street: {
        type: String,
        maxlength: [25, "tooLongStreet"],
        minlength: [4, "tooShortStreet"],
    },
    entrance: {
        type: Number,
        max: [999, "tooBigNumberEntrance"],
        min: [0, "incorrectNumEntrance"],
    },
    house: {
        type: Number,
        max: [999, "tooBigNumberFloor"],
        min: [0, "incorrectNumFloor"],
    },
    floor: {
        type: Number,
        max: [999, "tooBigNumberFloor"],
        min: [0, "incorrectNumFloor"],
    },
    apartment: {
        type: Number,
        max: [999, "tooBigNumberApartment"],
        min: [0, "incorrectNumApartment"],
    },
    dateTimeIn: {
        type: String,
        default: new Date().toLocaleDateString() + "  " + new Date().toLocaleTimeString()
    },
    rest: String,
    dishes: [{
        idDish: String,
        count: Number
    }],
    totalPrice: Number,
    status: {
        type: String,
        default: "Новый"
    },
    driver: String,
    dateTimeOut: Date
});
// Компилируем и Экспортируем модель
module.exports = mongoose.model('orders', ordersSchema, 'orders');