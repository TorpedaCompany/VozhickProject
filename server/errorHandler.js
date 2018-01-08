const Logger = require('./logger');
const logger = new Logger(); //  Загрузить логгер!
// Все обработчики ошибок должны иметь 4 параметра, иначе они будут обычными контроллерами
module.exports = function(err, req, res, next) {
    // if (res.headersSent) {
    //     return next(err);
    // }

    // err всегда установлен ибо Express.js проверяет была ли передана ошибка или нет, и вызывает обработчики только если ошибка есть;
    logger.warn("Error handler");
    logger.error(err);
    // В дальнейшем мы будем отправлять ошибки по почте, записывать в файл и так далее.
    logger.error(err.stack || err.message);
    res.status(503).send(err.stack || err.message);
    // Здесь можно вызвать next() или самим сообщить об ошибке клиенту.
    // В будущем можно сделать страниц 503 с ошибкой
};