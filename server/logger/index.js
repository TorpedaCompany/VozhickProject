const stackTrace = require('stack-trace'); // Для получения имени родительского модуля
const chalk = require('chalk')
const util = require('util'); //util.inspect()
const path = require('path'); //path.relative() path.sep
const projectname = require('../../package').name; //package.json -> project name

module.exports = class Logger // Класс логера 
    {
        constructor() {
            function generateLogFunction(level, color = 'white') // Функция генератор функий логгера :)
            {
                return function(message, meta) {

                    var date = new Date();
                    var dd = date.getDate();
                    if (dd < 10) dd = '0' + dd;
                    var mm = date.getMonth() + 1;
                    if (mm < 10) mm = '0' + mm;
                    var yy = date.getFullYear() % 100;
                    if (yy < 10) yy = '0' + yy;
                    var hh = date.getHours();
                    var min = date.getMinutes();
                    if (min < 10) min = '0' + min;
                    var ss = date.getSeconds();
                    if (ss < 10) ss = '0' + ss;
                    var dateTime = '[' + dd + '-' + mm + '-' + yy + ' ' + hh + ':' + min + ':' + ss + ']';

                    //var d = Date.now(); // Будем потом записовать время вызова
                    var mes = dateTime + ' ' + this.module + " -- ";
                    mes += level + " -- ";
                    mes += message; // прицепить сообщение
                    if (meta) mes += "  " + util.inspect(meta) + " "; // Записать доп инфу (Object||Error)
                    mes += '\n'; // Конец строки :)

                    this.write(chalk[color](mes));
                    // Записать во все потоки наше сообщение
                }
            };

            this.trace = stackTrace.get()[1]; // Получить стек вызова
            this.filename = this.trace.getFileName(); // Получить имя файла которое вызвало конструктор
            this.module = projectname + path.sep + path.relative('.', this.filename); // Записать име модуля
            this.streams = [process.stdout]; // Потоки в которые мы будем записовать логи
            // В дальнейшем здесь будет стрим к файлу
            this.log = generateLogFunction('Log', 'blue'); // Лог поведения
            this.info = generateLogFunction('Info', 'green'); // Лог информативный
            this.error = generateLogFunction('Error', 'red'); // Лог ошибок
            this.warn = generateLogFunction('Warning', 'yellow'); // Лог предупреждений
        }
        write(d) {
            // console.log(chalk.red('-----------------------------------------LOG------------------------------------------------'));
            this.streams.forEach((stream) => {
                stream.write(d);
            });
        }
    }