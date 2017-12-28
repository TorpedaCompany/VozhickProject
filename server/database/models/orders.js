const mongoose = require('mongoose');
// Информация о заказе: 
// Заказчик 
// Из какого ресторана 
// Какие блюда 
// Стоимость заказа 
// Время заказа 
// Каким водителем был выполнен 

let ordersSchema = new mongoose.Schema({
    client: String,
    rest: String,
    dishes: [{}],
    price: Number,
    dateTimeIn: Date,
    status: String,
    driver: String,
    dateTimeOut: Date
});


// Компилируем и Экспортируем модель
module.exports = mongoose.model('orders', ordersSchema, 'orders');