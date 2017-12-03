document.addEventListener("DOMContentLoaded", function(event) {
    var ModalAuthorizationOpenTwo = document.getElementById("modal-authorization-open-two");
    var ModalAuthorizationOpen = document.getElementById("modal-authorization-open");
    var ModalAuthorizationClose = document.getElementById("modal-authorization-close");
    var ModalRegistrationOpen = document.getElementById("modal-registration-open");
    var ModalRegistrationClose = document.getElementById("modal-registration-close");
    var Ovelay = document.getElementById("ovelay");
    var ModalAuthorization = document.getElementById("modal-authorization");
    var ModalRegistration = document.getElementById("modal-registration");
    
    ModalAuthorizationOpenTwo.addEventListener("click", function(){
        $("html,body").css("overflow","hidden");
        ModalRegistration.classList.remove("modal-active");
        Ovelay.classList.add("ovelay-active");
        ModalAuthorization.classList.add("modal-active");
    });
    
    ModalAuthorizationOpen.addEventListener("click", function(){
        $("html,body").css("overflow","hidden");
        Ovelay.classList.add("ovelay-active");
        ModalAuthorization.classList.add("modal-active");
    });
    
    ModalAuthorizationClose.addEventListener("click", function(){
        $("html,body").css("overflow","auto");
        ModalAuthorization.classList.remove("modal-active");
        Ovelay.classList.remove("ovelay-active");
    });
    
    ModalAuthorizationClose.addEventListener("click", function(){
        $("html,body").css("overflow","auto");
        ModalAuthorization.classList.remove("modal-active");
        Ovelay.classList.remove("ovelay-active");
    });
    
    
    ModalRegistrationOpen.addEventListener("click", function(){
        $("html,body").css("overflow","hidden");
        ModalAuthorization.classList.remove("modal-active");
        ModalRegistration.classList.add("modal-active");
    });
    
    ModalRegistrationClose.addEventListener("click", function(){
        $("html,body").css("overflow","auto");
        ModalRegistration.classList.remove("modal-active");
        Ovelay.classList.remove("ovelay-active");
    });
});