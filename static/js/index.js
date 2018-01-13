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
    console.log(window.rests);
});
var bLazy = new Blazy({});

//Имитация БД
let listRest = [{
        'numRest': 1,
        'category': ['Суши', 'Здоровая']
    },
    {
        'numRest': 2,
        'category': ['Бургеры', 'Пицца']
    },
    {
        'numRest': 3,
        'category': ['Десерты', 'Европейская']
    }
]

//Обработчики на кнопки категорий выбора ресторана по их ID
function addEventCtgRest() {
    let arrCtgRest = document.querySelectorAll("#ctgRest > div");

    for (let i = 0; i < arrCtgRest.length; i++) {
        arrCtgRest[i].addEventListener("click", selectCtg, false);
    }

    function rmActive() {
        let activeArr = document.querySelectorAll(".type-restaurant_active");
        for (i = 0; i < activeArr.length; i++) {
            activeArr[i].classList.remove("type-restaurant_active");
        }
    }

    function restCtg() {
        let id_rest = document.querySelectorAll("[data-id-rest]");
        let ctg = [];
        for (i = 0; i < id_rest.length; i++) {
            ctg.push({
                numRest: id_rest[i].dataset.idRest,
                category: id_rest[i].dataset.ctgRest.split(',')
            })
        }
        return ctg;
    }

    function selectCtg() {
        rmActive();
        this.classList.toggle("type-restaurant_active");

        let ctg = restCtg();
        let result = [];

        ctg.forEach(function(item) {
            item.category.forEach(function(subctg) {
                console.log(subctg);
            })
        })
    }
}
//Поиск ресторанов, скрытие лишних


//Функции анимации
function fadeOut(el) {
    el.style.opacity = 1;
    el.setAttribute("data-rest-display", "hide");
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    el.removeAttribute("data-rest-display");

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}