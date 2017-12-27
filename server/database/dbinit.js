// Инициализация датабазы!
// Загрузим mongoose
var mongoose = require('mongoose');
const Logger = require('../logger');
const logger = new Logger(); //  Загрузить логгер!
// Подключимся к серверу MongoDB
// В дальнейшем адрес сервера будет загружаться с конфигов
const config = require('../config');

mongoose.connect(config.mongoUri, {
    useMongoClient: true,
    poolSize: 10
        // Поставим количество подключений в пуле
        // 10 рекомендуемое количество для моего проекта.
        // Вам возможно понадобится и то меньше...

});

// В случае ошибки будет вызвано данная функция
mongoose.connection.on('error', (err) => {
    logger.error("Database Connection Error: " + err);
    process.exit(2);
});

// Данная функция будет вызвано когда подключение будет установлено
mongoose.connection.on('connected', () => {
    // Подключение установлено
    logger.info("Succesfully connected to MongoDB Database");
    // В дальнейшем здесь мы будем запускать сервер.
});
console.log(mongoose.connection);
require('./models'); // Попытка проиницилизировать модели (скомпилировать)