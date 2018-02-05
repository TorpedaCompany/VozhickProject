document.addEventListener("DOMContentLoaded", CountAndPriceCart());

function CountAndPriceCart() {
	var CartPrice = document.getElementById("shopping-cart-price");
	var CartCount = document.querySelector(".count-dish-circle");
	var Arr = JSON.parse(localStorage.getItem('Cart'));
	var Price = 0;
	var Count = 0;
	if (Arr == null) {
		CartPrice.innerText = '0 руб.';
		CartCount.innerText = '0';
	} else {
		for (var i = 0; i < Arr.length; i++) {
			Price += parseFloat(Arr[i].TotalPriceDish);
			Count += parseInt(Arr[i].CountDish);
		}
		if(Price < 20){
			Price += 2;
		}
		CartPrice.innerText = Price.toFixed(2) + ' руб.';
		CartCount.innerText = Count;
	}
}