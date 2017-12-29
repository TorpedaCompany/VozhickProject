const Logger = require('./logger');
const logger = new Logger(); //  Загрузить логгер!
// Все обработчики ошибок должны иметь 4 параметра, иначе они будут обычными контроллерами
module.exports = function(err, req, res, next) {
    // if (res.headersSent) {
    //     return next(err);
    // }
    console.log('ERROR AAAAAAAA');
    // err всегда установлен ибо Express.js проверяет была ли передана ошибка или нет, и вызывает обработчики только если ошибка есть;
    logger.error(err);
    // В дальнейшем мы будем отправлять ошибки по почте, записывать в файл и так далее.
    res.status(503).send(err.stack || err.message);
    // Здесь можно вызвать next() или самим сообщить об ошибке клиенту.
    // В будущем можно сделать страниц 503 с ошибкой
};

// app.use(function(req, res, next){
//     res.status(404);
//     log.debug('Not found URL: %s',req.url);
//     res.send({ error: 'Not found' });
//     return;
// });

// app.use(function(err, req, res, next){
//     res.status(err.status || 500);
//     log.error('Internal error(%d): %s',res.statusCode,err.message);
//     res.send({ error: err.message });
//     return;
// });