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
            delay: 3000,
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});

// document.querySelectorAll("[data-id-rest='1']")[0].parentNode.nodeName;
// document.getElementById('sushi').addEventListener('click', function () {
//     let visible = document.querySelectorAll("[data-id-rest='1']")[0].parentNode.style.display;
//     if (visible == "") {
//         document.querySelectorAll("[data-id-rest='1']")[0].parentNode.style.display = 'none';
//     } else {
//         document.querySelectorAll("[data-id-rest='1']")[0].parentNode.style.display = '';
//     }

//     // document.querySelectorAll("[data-list-rest]")[0].parentNode.style.display = 'none';
// }, false);



var bLazy = new Blazy({
});

// let findRest = function() {
//     let el = document.querySelectorAll(".container-type-restaurant .type-restaurant");

//     let addEvent = function(){

//     }
//     // document.querySelectorAll("[data-list-rest]")
//     for(i=0 ; i<els.length ; i++){
//         els[i].addEventListener("click", addEvent, false);
//     }
// }

let listRest = [
    {
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
document.getElementById('sushi').addEventListener('click', function () {
    document.getElementById('sushi').classList.add("active_type-restaurant");
    findRest(listRest, "Суши");
}, false);

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
            arrRest[i].style.display = 'none';
        }
    }
    // .getAttribute("data-id-rest")
    // document.querySelectorAll("[data-id-rest='1']")
    return result;
}