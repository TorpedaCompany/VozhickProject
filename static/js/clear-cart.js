document.addEventListener("DOMContentLoaded", function () {
    var ClearButton = document.getElementById("button-cart-clear");
    var AjaxCardButton = document.getElementById("button-cart-post");
    ClearButton.addEventListener("click", function () {
        var BlockContainer = document.getElementById("main-eat-container-cart");
        var BlockPriceContainer = document.getElementById("container-all-price-eat-cart");
        var div = "";
        var StrPrice = ""
        var Price = 0;
        localStorage.removeItem("Cart");
        div = '<div class="clear-cart">Ваша корзина пуста</div>';
        StrPrice = 'Общая стоимость: 0 руб.';
        BlockContainer.innerHTML = div;
        BlockPriceContainer.innerHTML = StrPrice;
		var LS = JSON.parse(localStorage.getItem("Cart"));
		if(LS == null){
			AjaxCardButton.classList.add("button-cart-post-disabled");
		}
		CountAndPriceCart();
    });
});