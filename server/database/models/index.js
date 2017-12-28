module.exports = {
    // Загрузить модель юзера (пользователя)
    // На *nix-ах все файлы чуствительны к регистру
    users: require('./users'),
    rests: require('./rests'),
    orders: require('./orders'),
    drivers: require('./drivers'),
};



// const mongoose = require('mongoose');
// let Schema = new mongoose.Schema({

// });
// module.exports = mongoose.model('', Schema, '');