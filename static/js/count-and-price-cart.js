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
			//			if (CountDish % 1 == 0) {
			Price += parseFloat(Arr[i].TotalPriceDish);
			Count += parseFloat(Arr[i].CountDish);
			//			} else {}

		}
		if (Arr[0].NameRest === "Огонь") {
			if (Price < 10) {
				Price += 2;
			}
		} else {
			if (Price < 20) {
				if (Arr[0].NameRest != "Пиццерия 'Корица'") {
					Price += 2;
				}
			}
		}
		CartPrice.innerText = Price.toFixed(2) + ' руб.';
		CartCount.innerText = Count;
	}
}