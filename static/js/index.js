// Initialize Swiper
document.addEventListener("DOMContentLoaded", function(event) {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        autoHeight: true, //enable auto height
        spaceBetween: 0,
        // setWrapperSize: true,
        loop: true,
        disableOnInteraction: false,
        autoplay: {
            delay: 4200,
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    addEventCtgRest();
});
var bLazy = new Blazy({});

//Обработчики на кнопки категорий выбора ресторана по их ID
function addEventCtgRest() {
    var arrCtgRest = document.querySelectorAll("#ctgRest > div");

    for (var i = 0; i < arrCtgRest.length; i++) {
        arrCtgRest[i].addEventListener("click", selectCtg, false);
    }
}

function rmActive() {
    var activeArr = document.querySelectorAll(".type-restaurant_active");
    for (i = 0; i < activeArr.length; i++) {
        activeArr[i].classList.remove("type-restaurant_active");
    }
}

function restCtg() {
    var id_rest = document.querySelectorAll("[data-id-rest]");
    var ctg = [];
    for (i = 0; i < id_rest.length; i++) {
        ctg.push({
            numRest: id_rest[i].dataset.idRest,
            category: id_rest[i].dataset.ctgRest.toLowerCase().split(',')
        })
    }
    return ctg;
}

function selectCtg() {
    //Удалить все активные классы 
    rmActive();
    //Добавить активный класс
    this.classList.toggle("type-restaurant_active");
    //Показать все рестораны
    fadeIn();

    var ctg = restCtg();
    var result = [];
    var _id = this.id.toLowerCase();

    //Проверка на категорию
    if (this.id != "Все") {
        ctg.forEach(function(item) {
            if (!(item.category.indexOf(_id) != -1)) {
                // Скрыть ресторан если не подходит
                fadeOut(item.numRest);
            }
        })
    }

    bLazy.revalidate();

    return false;
}

//Функции анимации
function fadeOut(num) {
    var el = document.querySelector("[data-id-rest='" + num + "']");
    // el.style.opacity = 0.3;
    el.style.display = "none";
    el.style.pointerEvents = "none";
    el.setAttribute("data-rest-display", "hide");
}

function fadeIn(el, display) {
    var hiddenItems = document.querySelectorAll("[data-rest-display='hide']");
    if (hiddenItems.length != 0) {
        for (var i = 0; i < hiddenItems.length; i++) {
            hiddenItems[i].style.opacity = 1;
            hiddenItems[i].style.display = "block";
            hiddenItems[i].style.pointerEvents = "all";
            // el.style.display = display || "block";
            hiddenItems[i].removeAttribute("data-rest-display");
        }
    }
}