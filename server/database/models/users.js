const mongoose = require('mongoose');
// Информация о пользователе:
// Имя 
// Фамилия 
// Номер телефона 
// Email 
// Пароль 
// Улица 
// Подъезд 
// Этаж 
// Квартира
let usersSchema = new mongoose.Schema({
    firstName: {
        type: String, // тип: String
        required: [true, "firstNameRequired"],
        // Данное поле обязательно. Если его нет вывести ошибку с текстом usernameRequired
        maxlength: [32, "tooLongFirstName"],
        // Максимальная длинна 32 Юникод символа (Unicode symbol != byte)
        minlength: [3, "tooShortFirstName"],
        trim: true,
        // Слишком короткий Логин!
        // match: [/^[a-z0-9]+$/, "usernameIncorrect"],
        // Мой любимй формат! ЗАПРЕТИТЬ НИЖНЕЕ ТИРЕ!
    },
    lastName: {
        type: String, // тип: String
        required: [true, "lastNameRequired"],
        // Данное поле обязательно. Если его нет вывести ошибку с текстом usernameRequired
        maxlength: [32, "tooLongLastName"],
        // Максимальная длинна 32 Юникод символа (Unicode symbol != byte)
        minlength: [3, "tooShortLastName"],
        trim: true
            // Слишком короткий Логин!
            // match: [/^[a-z0-9]+$/, "usernameIncorrect"],
    },
    middleName: {
        type: String,
        required: [true, "middleNameRequired"],
        maxlength: [32, "tooLongMiddleName"],
        minlength: [3, "tooShortMiddleName"],
        trim: true
    },
    phone: {
        type: String, // тип: String
        required: [true, "phoneRequired"],
        // Данное поле обязательно. Если его нет вывести ошибку с текстом usernameRequired
        maxlength: [14, "tooLongPhone"],
        minlength: [7, "tooShortPhone"],
        // Слишком короткий Логин!
        match: [/^\+375[0-9]{2}[0-9]{7}$/, "phoneIncorrect"],
        unique: true
            // Мой любимй формат! ЗАПРЕТИТЬ НИЖНЕЕ ТИРЕ!
    },
    email: {
        type: String, // тип: String
        required: [true, "emailRequired"],
        // Данное поле обязательно. Если его нет вывести ошибку с текстом usernameRequired
        // Слишком короткий Логин!
        match: [/@/, "emailIncorrect"],
    },
    password: {
        type: String, // тип String
        // В дальнейшем мы добавим сюда хеширование
        maxlength: [32, "tooLong"],
        minlength: [6, "tooShort"],
        match: [/^[A-Za-z0-9]+$/, "passwordIncorrect"],
        required: [true, "passwordRequired"]
    },
    street: { //Улица
        type: String, // тип String
        // В дальнейшем мы добавим сюда хеширование
        maxlength: [25, "tooLongStreet"],
        minlength: [4, "tooShortStreet"],
        // match: [/^[A-Za-z0-9]+$/, "passwordIncorrect"],
        // required: [true, "passwordRequired"]
    },
    entrance: { //Подъезд
        type: Number, // тип String
        // В дальнейшем мы добавим сюда хеширование
        max: [999, "tooBigNumberEntrance"],
        min: [0, "incorrectNumEntrance"],
        // match: [/^[A-Za-z0-9]+$/, "passwordIncorrect"],
        // required: [true, "passwordRequired"]
    },
    floor: { //Этаж
        type: Number, // тип String
        // В дальнейшем мы добавим сюда хеширование
        max: [999, "tooBigNumberFloor"],
        min: [0, "incorrectNumFloor"],
        // match: [/^[A-Za-z0-9]+$/, "passwordIncorrect"],
        // required: [true, "passwordRequired"]
    },
    apartment: { //Квартира
        type: Number, // тип String
        // В дальнейшем мы добавим сюда хеширование
        max: [999, "tooBigNumberApartment"],
        min: [0, "incorrectNumApartment"],
        // match: [/^[A-Za-z0-9]+$/, "passwordIncorrect"],
        // required: [true, "passwordRequired"]
    },
});

// Теперь подключим плагины (внешнии модули)



// Компилируем и Экспортируем модель
module.exports = mongoose.model('users', usersSchema, 'users');