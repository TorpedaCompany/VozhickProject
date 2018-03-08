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
        required: [true, "Необходимо указать Имя"],
        maxlength: [40, "Слишком длинное Имя"],
        minlength: [2, "Короткое Имя"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Необходимо указать Фамилию"],
        maxlength: [40, "Слишком длинная Фамилия"],
        minlength: [2, "Короткая Фамилия"],
        trim: true
    },
    middleName: {
        type: String,
        maxlength: [40, "Слишком длинное Отчество"],
        trim: true
    },
    phone: {
        type: String,
        required: [true, "Необходимо указать телефон"],
        maxlength: [14, "tooLongPhone"],
        minlength: [7, "tooShortPhone"],
        match: [/^\+375[0-9]{2}[0-9]{7}$/, "Неверный формат телефона"],
        trim: true,
        unique: false
    },
    email: {
        type: String,
        required: [true, "Необходимо указать Email"],
        match: [/@/, "Неверный Email"],
        trim: true
    },
    street: {
        type: String,
        maxlength: [35, "Слишком длинное название улицы"],
        minlength: [2, "Короткое название улицы"],
    },
    entrance: {
        type: Number,
        max: [999, "Неверный номер подъезда"],
        min: [0, "Неверный номер подъезда"],
        trim: true
    },
    house: {
        type: String,
        max: [999, "Неверный номер дома"],
        min: [0, "Неверный номер дома"],
    },
    floor: {
        type: Number,
        max: [999, "Неверный номер этажа"],
        min: [0, "Неверный номер этажа"],
    },
    apartment: {
        type: Number,
        max: [999, "Неверный номер квартиры"],
        min: [0, "Неверный номер квартиры"],
    },
    dateTimeIn: {
        type: String,
        default: new Date().toLocaleDateString() + "  " + new Date().toLocaleTimeString()
    },
    restName: String,
    dishes: Array,
    totalPrice: Number,
    totalCount: Number,
    status: {
        type: String,
        default: "Новый"
    },
    driver: String,
    dateTimeOut: Date,
    promocode: {
        type: String,
        maxlength: [30, "Слишком длинный промокод"],
        default: ""
    },
    comment: {
        type: String,
        maxlength: [60, "Слишком длинный комментарий"],
        default: ""
    },
    paymentMethod: {
        type: Boolean,
        default: false
    }
});
// Компилируем и Экспортируем модель
module.exports = mongoose.model('orders', ordersSchema, 'orders');