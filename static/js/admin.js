document.addEventListener("DOMContentLoaded", function() {

    var Spoiler = document.getElementsByClassName("spoiler");

    function spoilerfunc() {
        let Child = this.querySelector('.content-spoiler');
        Child.classList.toggle('open-spoiler');
    }
    for (let i = 0; i < Spoiler.length; i++) {
        Spoiler[i].addEventListener("click", spoilerfunc, false);
    }

    let socket = io.connect();
    socket.on('msg', function(data) {
        console.log("in msg admin-panel");
        console.log(data);
        generateOrdBlock(data);
        // socket.emit('msg', '| admin dashboard :Emit');
    });

    function generateOrdBlock(data) {
        let container = document.querySelector(".container-items-order-panel"),
            div = '',
            cardOrder = '',
            listDish = '';
        //Генерация списка блюд
        for (item in data.dishes) {
            listDish += '<div class="container-item-spoiler"><div class="name-dish">' + data.dishes[item].name + '</div><div class="count-dish">' + data.dishes[item].count + '</div></div>'
        }
        var divDishes = document.createElement('div');
        divDishes.className = "container-item-spoiler";
        divDishes.innerHTML = listDish;

        cardOrder = document.createElement('div');
        cardOrder.className = "main-items-order-panel";
        cardOrder.innerHTML = '<div class="container-date-and-time"><div class="items-order date-and-time-items-order">Получено: ' + data.dateTimeIn + ' </div></div><div class="container-row"><div class="container-customer"><div class="items-order name-items-order">Имя: ' + data.firstName + ' </div><div class="items-order surname-items-order">Фамилия: ' + data.lastName + ' </div><div class="items-order patronymic-items-order">Отчество: ' + data.middleName + ' </div><div class="items-order phone-items-order">Телефон: ' + data.phone + ' </div></div><div class="container-address"><div class="items-order street-items-order">Улица: ' + data.street + '</div><div class="items-order home-items-order">Дом: ' + data.house + '</div><div class="items-order porch-items-order">Подъезд: ' + data.entrance + '</div><div class="items-order porch-items-order">Этаж: ' + data.floor + '</div><div class="items-order apartment-items-order">Квартира: ' + data.apartment + '</div></div></div><div class="name-restaurant">Заведение: ' + data.restName + '</div><div id="" class="spoiler-items-order-panel spoiler"><div class="title-spoiler"><div class="icon-basket fa fa-shopping-basket"></div><div class="name-spoiler">Заказанные блюда</div><div class="icon-spoiler fa fa-chevron-down"></div></div><div class="content-spoiler close-spoiler">' + listDish + '</div></div><div class="container-count-and-price"><div>Кол-во: <span class="redBoldText"> ' + data.totalCount + '</span></div><div>Общая стоимость: <span class="redBoldText"> ' + data.totalPrice + ' руб.</span></div></div>'


        container.insertBefore(cardOrder, container.firstChild);
        // container.appendChild(cardOrder);

        let spoiler = document.getElementsByClassName("spoiler");
        spoiler[0].addEventListener("click", spoilerfunc, false);
        notif();
    }

    function notif() {

        // var audio = new Audio(); // Создаём новый элемент Audio
        // audio.src = '../Elara.mp3';
        // audio.play(); // Автоматически запускаем
        function play() {
            var playPromise = document.querySelector('audio').play();
            // In browsers that don’t yet support this functionality,
            // playPromise won’t be defined.
            if (playPromise !== undefined) {
                playPromise.then(function() {
                    // Automatic playback started!
                }).catch(function(error) {
                    // Automatic playback failed.
                    // Show a UI element to let the user manually start playback.
                });
            }
        }
        play();
        Push.create("Новый заказ!", {
            body: "Проверьте список заказов",
            icon: '../image/other_icon/icons8-чек-96.png',
            // timeout: 4000,
            onClick: function() {
                window.focus();
                this.close();
            }
        });
    }
    // var email = require("./path/to/emailjs/email");
    // let em = document.getElementById("sendEm");
    // em.addEventListener("click", function() {
    //     var server = email.server.connect({
    //         user: "vozadm@yandex.by",
    //         password: "01020304",
    //         host: "smtp.yandex.ru",
    //         ssl: true
    //     });

    //     // send the message and get a callback with an error or details of the message that was sent
    //     server.send({
    //         text: "i hope this works",
    //         from: "vozadm@yandex.by",
    //         to: "djcrosss1@gmail.com",
    //         cc: "else <else@your-email.com>",
    //         subject: "testing emailjs"
    //     }, function(err, message) { console.log(err || message); });
    // }, false);





});

/* <div class="clearfix container-items-order-panel"
<div class="main-items-order-panel">
  <div class="container-date-and-time">
    <div class="items-order date-and-time-items-order">Получено: '+ data.dateTimeIn +' </div>
  </div>
  <div class="container-row">
    <div class="container-customer">
      <div class="items-order name-items-order">Имя: '+ data.firstName +' </div>
      <div class="items-order surname-items-order">Фамилия: '+ data.lastName +' </div>
      <div class="items-order patronymic-items-order">Отчество: '+ data.middleName +' </div>
      <div class="items-order phone-items-order">Телефон: '+ data.phone +' </div>
    </div>
    <div class="container-address">
      <div class="items-order street-items-order">Улица: '+ data.street +'</div>
      <div class="items-order home-items-order">Дом: '+ data.house +'</div>
      <div class="items-order porch-items-order">Подъезд: '+ data.entrance +'</div>
      <div class="items-order porch-items-order">Этаж: '+ data.floor +'</div>
      <div class="items-order apartment-items-order">Квартира: '+ data.apartment +'</div>
    </div>
  </div>
  <div class="name-restaurant">Заведение: '+ data.restName +'</div>
  <div id="" class="spoiler-items-order-panel spoiler">
    <div class="title-spoiler">
      <div class="icon-basket fa fa-shopping-basket"></div>
      <div class="name-spoiler">Заказанные блюда</div>
      <div class="icon-spoiler fa fa-chevron-down"></div>
    </div>
    <div class="content-spoiler close-spoiler">
      <div class="container-item-spoiler">
        <div class="name-dish"></div>
        <div class="count-dish"></div>
      </div>
    </div>
  </div>
  <div class="container-count-and-price">
    <div>Кол-во: <span class="redBoldText"> '+ data. +'</span></div>
    <div>Общая стоимость: <span class="redBoldText"> '+ data.totalPrice +'руб.</span></div>
  </div>
</div>
</div> */