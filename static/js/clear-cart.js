document.addEventListener("DOMContentLoaded", function () {
    var ClearButton = document.getElementById("button-cart-clear");
    ClearButton.addEventListener("click", function () {
        var BlockContainer = document.getElementById("main-eat-container-cart");
        var BlockPriceContainer = document.getElementById("container-all-price-eat-cart");
        var LS = JSON.parse(localStorage.getItem("Cart"));
        var div = "";
        var StrPrice = ""
        var Price = 0;
        localStorage.removeItem("Cart");
        div = '<div class="clear-cart">Ваша корзина пуста</div>';
        StrPrice = 'Общая стоимость: 0 руб.';
        BlockContainer.innerHTML = div;
        BlockPriceContainer.innerHTML = StrPrice;
		CountAndPriceCart();
    });
});