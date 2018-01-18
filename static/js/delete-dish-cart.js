document.addEventListener("DOMContentLoaded", Update());

function Update() {
	var DeleteButton = document.getElementsByClassName("container-button-cancel-eat-cart");
	for (let i = 0; i < DeleteButton.length; i++) {
		DeleteButton[i].addEventListener("click", DeleteDish, false);
	}
}

function DeleteDish() {
	var Cart = JSON.parse(localStorage.getItem("Cart"));
	let IdDishButton = this.getAttribute("data-id-dish");
	let lenght = Cart.length;
	let Index = Cart.findIndex(obj => obj.id == IdDishButton);
	Cart.splice(Index, 1);
	if (Cart.length == 0) {
		localStorage.removeItem("Cart");
		ShowCart();
		Update();
		CountAndPriceCart();
		UpdatePlusAndMinus()
	} else {
		localStorage.removeItem("Cart");
		var serialObj = JSON.stringify(Cart);
		localStorage.setItem("Cart", serialObj);
		ShowCart();
		Update();
		CountAndPriceCart();
		UpdatePlusAndMinus()
	}
}