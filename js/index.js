// Initialize Swiper
document.addEventListener("DOMContentLoaded", function (event) {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        autoHeight: true, //enable auto height
        spaceBetween: 0,
        loop: true,
        disableOnInteraction: false,
        // autoplay: {
        //     delay: 3000,
        // },
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});

var bLazy = new Blazy({
});