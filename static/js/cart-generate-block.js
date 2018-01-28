document.addEventListener("DOMContentLoaded", ShowCart());

function ShowCart() {
	var Bly = JSON.parse(localStorage.getItem('Cart'));
	var BlockContainer = document.getElementById("main-eat-container-cart");
	var div = '';
	var PriceDiv = '';
	if (Bly == null) {
		BlockContainer.innerHTML = div;
	} else {
		for (var i = 0; i < Bly.length; i++) {
			div += '<div class="container-eat-cart"><div class="container-image-eat-cart"><img src="' + Bly[i].Image + '"><div class="container-name-eat-cart"><span>' + Bly[i].Name + '</span></div></div><div class="container-button-eat-cart"><div class="container-price-eat-cart"><span>' + Bly[i].Price.toFixed(2) + ' руб.</span></div><div class="card-dish-action"><div data-id-dish="' + Bly[i].id + '" class="inpMinus">-</div><input class="dishCount" type="number" step="1" min="1" max="50" name="dishCount" value="' + Bly[i].CountDish + '" readonly><div data-id-dish="' + Bly[i].id + '" class="inpPlus">+</div><div data-id-dish="' + Bly[i].id + '" class="container-button-cancel-eat-cart"><span class="fa fa-times"></span></div></div></div></div>';
		}
		BlockContainer.innerHTML = div;
		TotalCart();
	}
	//    if (Bly == null) {
	//        BlockContainer.innerHTML = div;
	//    } else {
}

function TotalCart() {
	let Bly = JSON.parse(localStorage.getItem('Cart'));
	var StrPrice = '';
	let BlockPriceContainer = document.getElementById("container-all-price-eat-cart");
	let Price = 0;
	if (Bly == null) {
		StrPrice = "Общая стоимость: 0 руб."
		BlockPriceContainer.innerText = StrPrice;
	} else {
		for (var i = 0; i < Bly.length; i++) {
			Price += parseFloat(Bly[i].TotalPriceDish);
		}
		StrPrice = "Общая стоимость: " + Price.toFixed(2) + " руб."
		BlockPriceContainer.innerText = StrPrice;
	}
}