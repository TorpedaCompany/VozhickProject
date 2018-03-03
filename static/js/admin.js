document.addEventListener("DOMContentLoaded", function() {

    let notifBtn = document.getElementById("notifBtn").addEventListener("click", function() {
        notif();
    }, false);

    //Раздел принятых заказов
    let accepted_ord_container = document.querySelector(".container-done-order-panel .container-items-order-panel");

    //-----------------Сокет---------------------
    let socket = io.connect();
    //Новый заказ, создание блока.
    socket.on('new_orders', function(data) {
        generateOrdBlock(data);
    });
    //Заказ был принят
    socket.on('accept_orders', function(id) {

        let el = document.getElementById(id);
        if (el) {
            el.remove();
            accepted_ord_container.insertBefore(el, accepted_ord_container.firstChild);
        }

    });
    //Заказ был удален
    socket.on('delete_orders', function(id) {
        let el = document.getElementById(id);
        if (el) {
            el.remove();
        }
    });
    //-------------------------------------------

    let spoiler = document.getElementsByClassName("spoiler");
    //Функция для открытия спойлера
    function spoilerFunc() {
        let Child = this.querySelector('.content-spoiler');
        Child.classList.toggle('open-spoiler');
    }
    for (let i = 0; i < spoiler.length; i++) {
        spoiler[i].addEventListener("click", spoilerFunc, false);
    }

    //Функция подтверждения заказа
    function btn_orderFunc() {

        if (this.dataset.typeOrder == "accept") {
            swal({
                    title: "Вы хотите подтвердить данный заказ?",
                    text: "",
                    icon: "warning",
                    dangerMode: true,
                    buttons: {
                        not: {
                            text: "Отмена",
                            value: false
                        },
                        ok: {
                            text: "Подтвердить",
                            className: "swal-btn-accept",
                            value: true
                        }
                    }
                })
                .then((willAccept) => {
                    if (willAccept) {
                        let _this = this;
                        axios.post('../orders/' + this.dataset.idOrder + '/accept', {})
                            // axios.post('https://voztest.ga/orders/' + this.dataset.idOrder + '/accept', {})
                            .then(function(response) {
                                console.log(response);
                                swal("Заказ был подтвержден!", {
                                    icon: "success",
                                });
                                //Сокет переместит блок заказа в другой раздел
                            })
                            .catch(function(error) {
                                swal("Ошибка", {
                                    text: "Возможно заказ уже был подтвержден. Обновите страницу",
                                    icon: "error",
                                });

                                console.log(error);
                            });
                    }
                });

        }
        if (this.dataset.typeOrder == "delete") {
            swal({
                    title: "Вы хотите удалить данный заказ?",
                    text: "",
                    icon: "warning",
                    dangerMode: true,
                    buttons: {
                        not: {
                            text: "Отмена",
                            value: false
                        },
                        ok: {
                            text: "Удалить",
                            className: "swal-btn-delete",
                            value: true
                        }
                    },
                })
                .then((willDelete) => {
                    if (willDelete) {

                        axios.delete('../orders/' + this.dataset.idOrder, {})
                            // axios.delete('https://voztest.ga/orders/' + this.dataset.idOrder, {})
                            .then(function(response) {
                                swal("Заказ был удален!", {
                                    icon: "success",
                                });
                                //Сокет удалит заказ
                            })
                            .catch(function(error) {
                                swal("Ошибка", {
                                    text: "Ошибка удаления",
                                    icon: "error",
                                });
                            });
                    }
                });

        }
    }
    let btn_order = document.getElementsByClassName("btn-order");
    for (let i = 0; i < btn_order.length; i++) {
        btn_order[i].addEventListener("click", btn_orderFunc, false);
    }



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
        cardOrder.id = data._id;
        cardOrder.innerHTML =
            '<div class="container-date-and-time">' +
            '<div class="items-order date-and-time-items-order">Получено: ' + data.dateTimeIn + ' — ' + data.status + ' </div>' +
            '</div>' +
            '<div class="container-row">' +
            '<div class="container-customer">' +
            '<div class="items-order name-items-order">Имя: ' + data.firstName + ' </div>' +
            '<div class="items-order surname-items-order">Фамилия: ' + data.lastName + ' </div>' +
            '<div class="items-order patronymic-items-order">Отчество: ' + data.middleName + ' </div>' +
            '<div class="items-order phone-items-order">Телефон: ' + data.phone + ' </div>' +
            '</div>' +
            '<div class="container-address">' +
            '<div class="items-order street-items-order">Улица: ' + data.street + '</div>' +
            '<div class="items-order home-items-order">Дом: ' + data.house + '</div>' +
            '<div class="items-order porch-items-order">Подъезд: ' + data.entrance + '</div>' +
            '<div class="items-order level-items-order">Этаж: ' + data.floor + '</div>' +
            '<div class="items-order apartment-items-order">Квартира: ' + data.apartment + '</div>' +
            '<div class="items-order comment-items-order">Комментарий: ' + data.comment + '</div>' +
            '<div class="items-order promocode-items-order">Промокод: ' + data.promocode + '</div>' +
            '</div>' +
            '</div>' +
            '<div class="name-restaurant">Заведение: ' + data.restName + '</div>' +
            '<div id="" class="spoiler-items-order-panel spoiler">' +
            '<div class="title-spoiler">' +
            '<div class="icon-basket fa fa-shopping-basket"></div>' +
            '<div class="name-spoiler">Заказанные блюда</div>' +
            '<div class="icon-spoiler fa fa-chevron-down"></div>' +
            '</div>' +
            '<div class="content-spoiler close-spoiler">' + listDish + '</div>' +
            '</div>' +
            '<div class="container-count-and-price">' +
            '<div>Кол-во: <span class="redBoldText"> ' + data.totalCount + '</span></div>' +
            '<div>Общая стоимость: <span class="redBoldText"> ' + data.totalPrice.toFixed(2) + ' руб.</span></div>' +
            '</div>' +
            '<button type="submit" class="btn-order btn-order_delete" data-id-order="' + data._id + '" data-type-order="delete">Удалить заказ</button>' +
            '<button type="submit" class="btn-order btn-order_accept" data-id-order="' + data._id + '" data-type-order="accept">Подвердить заказ</button>' +
            '<button class="btn-order btn-order_copy">Копировать заказ</button>' +
            '</div>';

        //Вставить новый блок        
        container.insertBefore(cardOrder, container.firstChild);
        //Событие на новый элемент
        let spoiler = document.getElementsByClassName("spoiler");
        spoiler[0].addEventListener("click", spoilerFunc, false);
        let btn_order = document.getElementsByClassName("btn-order");
        btn_order[0].addEventListener("click", btn_orderFunc, false);
        btn_order[1].addEventListener("click", btn_orderFunc, false);

        //Вызов уведомления
        notif();
    }


    Push.config({ serviceWorker: '../../serviceWorker.min.js' });
    console.log(Push);

    function notif() {
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
            },
            vibrate: [200, 100, 200, 100, 200, 100, 200]
        });
    }
    let logout = document.getElementById("logout");
    logout.addEventListener('click', function() {
        axios.get('../logout', {})
            // axios.delete('https://voztest.ga/orders/' + this.dataset.idOrder, {})
            .then(function(response) {
                location.replace("../adm");
            })
            .catch(function(error) {});
    }, false);
});