document.addEventListener("DOMContentLoaded", function (event) {
	var AddCardButton = document.getElementsByClassName("addToCard");
	var i = 0;
	var Cart = [];

	var Arr = JSON.parse(localStorage.getItem('Cart'));
	if (Arr == null) {

	} else {
		var length = Arr.length;
		for (let a = 0; a < length; a++) {
			Cart.push(Arr[a]);
		}
	}

	function cart() {
		let Parent = this.parentElement.parentElement.parentElement.parentElement;
		let NameDishBlock = Parent.querySelectorAll(".card-dish-description > span");
		let ImgDishBlock = Parent.querySelectorAll(".card-dish-img > img");
		let PriceDishBlock = Parent.querySelectorAll(".card-dish-footer > .card-dish-info > .dish-price");
		let CountDishBlock = Parent.querySelectorAll(".card-dish-footer > .card-dish-action > .dishCount");
		let IdDish = Parent.getAttribute('data-id-dish');
		let NameDish = NameDishBlock[0].innerText;
		let NameRest = document.querySelector(".rest-caption").innerText;
		let ImgDish = ImgDishBlock[0].src;
		let PriceDish = PriceDishBlock[0].innerText;
		let CountDish = CountDishBlock[0].value;
		PriceDish = PriceDish.substr(0, PriceDish.length - 3)
		Cart.push({
			"id": IdDish,
			"Name": NameDish,
			"NameRest": NameRest,
			"Image": ImgDish,
			"Price": PriceDish,
			"CountDish": CountDish
		});

		var serialObj = JSON.stringify(Cart);
		localStorage.setItem('Cart', serialObj);

	}

	for (let i = 0; i < AddCardButton.length; i++) {
		AddCardButton[i].addEventListener("click", cart, false);
	}
});