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



var bLazy = new Blazy({});

// let findRest = function() {
//     let el = document.querySelectorAll(".container-type-restaurant .type-restaurant");

//     let addEvent = function(){

//     }
//     // document.querySelectorAll("[data-list-rest]")
//     for(i=0 ; i<els.length ; i++){
//         els[i].addEventListener("click", addEvent, false);
//     }
// }

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




function addEventCtgRest(){
    let arrCtgRest = document.querySelectorAll("#ctgRest > div");

    function selectCtg (){
        this.classList.toggle("active_type-restaurant");
        let hiddenItems = document.querySelectorAll("[data-rest-display='hide'");
        if( hiddenItems.length == 0 ){
            findRest(listRest,this.id);
        }else{
            for(let i = 0; i < hiddenItems.length; i++)
                fadeIn(hiddenItems[i], "block");
        }
    }
    for(let i = 0; i < arrCtgRest.length; i++){
        arrCtgRest[i].addEventListener("click", selectCtg, false);
    }
}

// document.getElementById('Суши').addEventListener('click', function () {
//         document.getElementById('Суши').classList.add("active_type-restaurant");
        
//         let hiddenItems = document.querySelectorAll("[data-rest-display='hide'");
//         if( hiddenItems.length == 0 ){
//             findRest(listRest, "Суши");
//         }else{
//             for(let i = 0; i < hiddenItems.length; i++)
//                 fadeIn(hiddenItems[i], "block");
//         }

// }, false);

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
            // arrRest[i].classList.toggle('hideRest');
            fadeOut(arrRest[i]);
            // arrRest[i].style.display = 'none';
        }
    }
    // .getAttribute("data-id-rest")
    // document.querySelectorAll("[data-id-rest='1']")
    return result;
}

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

// fade in

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

var el = document.querySelector("[data-id-rest='1']");

//   fadeOut(el);
//   fadeIn(el);
//   fadeIn(el, "inline-block");
// document.querySelector('.js-btn1').addEventListener('click', function () {
//     scrollIt(document.querySelector('#ListRest'), 300, 'easeOutQuad', function () {
//       return console.log('Just finished scrolling to ' + window.pageYOffset + 'px');
//     });
//   });
