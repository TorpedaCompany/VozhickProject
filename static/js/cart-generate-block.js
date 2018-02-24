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
			if(Bly[i].PortionsStatus == "true"){
			   div += '<div class="container-eat-cart"><div class="container-image-eat-cart"><img src="' + Bly[i].Image + '"><div class="container-name-eat-cart"><span>' + Bly[i].Name + '</span></div></div><div class="container-button-eat-cart"><div class="container-price-eat-cart"><span>0.5 - ' + Bly[i].Price4 + ' / 1 - '+ Bly[i].Price8 +' руб.</span></div><div class="card-dish-action"><div data-id-dish="' + Bly[i].id + '" data-portions-status-dish="true" class="inpMinus">-</div><input data-portions-status-dish="true" class="dishCount" type="number" step="0.5" min="0.5" max="50" name="dishCount" value="' + Bly[i].CountDish + '" readonly><div data-id-dish="' + Bly[i].id + '" data-portions-status-dish="true" class="inpPlus">+</div><div data-id-dish="' + Bly[i].id + '" class="container-button-cancel-eat-cart"><span class="fa fa-times"></span></div></div></div></div>';
			}else{
				div += '<div class="container-eat-cart"><div class="container-image-eat-cart"><img src="' + Bly[i].Image + '"><div class="container-name-eat-cart"><span>' + Bly[i].Name + '</span></div></div><div class="container-button-eat-cart"><div class="container-price-eat-cart"><span>' + Bly[i].Price + ' руб.</span></div><div class="card-dish-action"><div data-id-dish="' + Bly[i].id + '" data-portions-status-dish="false" class="inpMinus">-</div><input data-portions-status-dish="false" class="dishCount" type="number" step="1" min="1" max="50" name="dishCount" value="' + Bly[i].CountDish + '" readonly><div data-id-dish="' + Bly[i].id + '" data-portions-status-dish="false" class="inpPlus">+</div><div data-id-dish="' + Bly[i].id + '" class="container-button-cancel-eat-cart"><span class="fa fa-times"></span></div></div></div></div>';
			}
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
		if(Price < 20){
			Price += 2;
		}
		StrPrice = "Общая стоимость: " + Price.toFixed(2) + " руб."
		BlockPriceContainer.innerText = StrPrice;
	}
}