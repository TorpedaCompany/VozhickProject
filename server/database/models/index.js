module.exports = {
    // Загрузить модель юзера (пользователя)
    // На *nix-ах все файлы чуствительны к регистру
    users: require('./users'),
    rest: require('./rest'),
    orders: require('./orders'),
};



// const mongoose = require('mongoose');
// let Schema = new mongoose.Schema({

// });
// module.exports = mongoose.model('', Schema, '');