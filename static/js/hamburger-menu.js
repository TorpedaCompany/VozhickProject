document.addEventListener("DOMContentLoaded", function(event) { 
    var HamburgerMenuOpen = document.getElementById("hamburger-menu-open");
    var HamburgerMenuClose = document.getElementById("hamburger-menu-close");
    var HamburgerMenu = document.getElementById("hamburger-menu");
    
    HamburgerMenuOpen.addEventListener("click", function(){
        HamburgerMenu.classList.remove("close");
        HamburgerMenu.classList.add("open");
        console.log("Меню открыто");
        
    });
    
    HamburgerMenuClose.addEventListener("click", function(){
        HamburgerMenu.classList.remove("open");
        HamburgerMenu.classList.add("close");
        console.log("Меню закрыто");
    });
});