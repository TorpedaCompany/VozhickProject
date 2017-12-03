document.addEventListener("DOMContentLoaded", function(event) {
    var ModalAuthorizationOpenTwo = document.getElementById("modal-authorization-open-two");
    var ModalAuthorizationOpen = document.getElementById("modal-authorization-open");
    var ModalAuthorizationClose = document.getElementById("modal-authorization-close");
    var ModalRegistrationOpen = document.getElementById("modal-registration-open");
    var ModalRegistrationClose = document.getElementById("modal-registration-close");
    var Ovelay = document.getElementById("ovelay");
    var ModalAuthorization = document.getElementById("modal-authorization");
    var ModalRegistration = document.getElementById("modal-registration");
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
            e.returnValue = false;  
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }
    
    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
            window.onwheel = preventDefault; // modern standard
            window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
            window.ontouchmove  = preventDefault; // mobile
            document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
            window.onmousewheel = document.onmousewheel = null; 
            window.onwheel = null; 
            window.ontouchmove = null;  
            document.onkeydown = null;  
    }
    
    ModalAuthorizationOpenTwo.addEventListener("click", function(){
        disableScroll();
        ModalRegistration.classList.remove("modal-active");
        Ovelay.classList.add("ovelay-active");
        ModalAuthorization.classList.add("modal-active");
    });
    
    ModalAuthorizationOpen.addEventListener("click", function(){
        disableScroll();
        Ovelay.classList.add("ovelay-active");
        ModalAuthorization.classList.add("modal-active");
    });
    
    ModalAuthorizationClose.addEventListener("click", function(){
        enableScroll();
        ModalAuthorization.classList.remove("modal-active");
        Ovelay.classList.remove("ovelay-active");
    });
    
    ModalAuthorizationClose.addEventListener("click", function(){
        enableScroll();
        ModalAuthorization.classList.remove("modal-active");
        Ovelay.classList.remove("ovelay-active");
    });
    
    
    ModalRegistrationOpen.addEventListener("click", function(){
        disableScroll();
        ModalAuthorization.classList.remove("modal-active");
        ModalRegistration.classList.add("modal-active");
    });
    
    ModalRegistrationClose.addEventListener("click", function(){
        enableScroll();
        ModalRegistration.classList.remove("modal-active");
        Ovelay.classList.remove("ovelay-active");
    });
});