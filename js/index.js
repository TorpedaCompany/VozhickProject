// Initialize Swiper
document.addEventListener("DOMContentLoaded", function (event) {
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
function addEventCtgRest(){
    let arrCtgRest = document.querySelectorAll("#ctgRest > div");

    for(let i = 0; i < arrCtgRest.length; i++){
        arrCtgRest[i].addEventListener("click", selectCtg, false);
    }

    function selectCtg (){
        let activeCl = document.querySelector(".type-restaurant_active") || false; 
            if(activeCl)
                activeCl.classList.remove("type-restaurant_active");
                
        this.classList.add("type-restaurant_active");
        let hiddenItems = document.querySelectorAll("[data-rest-display='hide'");
        if( hiddenItems.length == 0 ){
            findRest(listRest,this.id);
        }else{
            for(let i = 0; i < hiddenItems.length; i++)
                fadeIn(hiddenItems[i], "block");
        }
    }
}
//Поиск ресторанов, скрытие лишних
let findRest = function (ctgRest, ctg = '') {
    console.log("findRest....")
    let result = [];
    ctgRest.forEach(function (item) {
        if (item.category.indexOf(ctg) != -1) {
            result.push(item.numRest);
        }
    })
    let arrRest = document.querySelectorAll("[data-id-rest]");
    for (i = 0; i < arrRest.length; i++) {
        if (result.indexOf(parseInt(arrRest[i].getAttribute("data-id-rest"))) == -1) {
            fadeOut(arrRest[i]);
        }
    }
    //Возврат массива с номерами ресторанов
    return result;
}

//Функции анимации
function fadeOut(el) {
    el.style.opacity = 1;
    el.setAttribute("data-rest-display","hide");
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