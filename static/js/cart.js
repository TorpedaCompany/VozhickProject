document.addEventListener("DOMContentLoaded", CheckVariables());

function ErrorRestoraunt() {
	swal({
		text: "В одном заказе может быть только один ресторан(",
		icon: "error",
	});
	var CardDishContent = document.querySelectorAll(".card-dish-content a");
	for (var n = 0; n < CardDishContent.length; n++) {
		CardDishContent[n].style.display = "none";
	}
}

function CheckVariables() {
	var ua = navigator.userAgent;
	var event = (ua.match(/iPad/i) || ua.match(/iPhone/)) ? "touchstart" : "click";
	var AddCardButton = document.getElementsByClassName("addToCard");
	var i = 0;
	var Cart = [];
	var NameRest = document.querySelector(".rest-caption").innerText;
	var Arr = JSON.parse(localStorage.getItem('Cart'));
	if (Arr == null) {
		for (let i = 0; i < AddCardButton.length; i++) {
			AddCardButton[i].addEventListener(event, cart, false);
		}
	} else {
		if (Arr[0].NameRest == NameRest) {
			var length = Arr.length;
			for (let a = 0; a < length; a++) {
				Cart.push(Arr[a]);
			}

			for (let i = 0; i < AddCardButton.length; i++) {
				AddCardButton[i].addEventListener(event, cart, false);
			}
		} else {
			ErrorRestoraunt();

		}
	}

	function cart() {
		var Arr = JSON.parse(localStorage.getItem('Cart'));
		let Parent = this.parentElement.parentElement.parentElement.parentElement;
		let NameDishBlock = Parent.querySelectorAll(".card-dish-description > span");
		let ImgDishBlock = Parent.querySelectorAll(".card-dish-img > img");
		let PriceDishBlock = Parent.querySelectorAll(".card-dish-footer > .card-dish-info > .dish-price");
		let CountDishBlock = Parent.querySelectorAll(".card-dish-footer > .card-dish-action > .dishCount");
		let IdDish = Parent.getAttribute('data-id-dish');
		let NameDish = NameDishBlock[0].innerText;
		let ImgDish = ImgDishBlock[0].src;
		let PriceDish = parseFloat(PriceDishBlock[0].innerText);
		let CountDish = parseFloat(CountDishBlock[0].value);
		let Step = CountDishBlock[0].getAttribute('Step');
		let TotalPriceDish = 0;
		let CountDishArr = 0;
		let PriceDish8 = 0;
		let PriceDish4 = 0;
		if (PriceDishBlock[0].getAttribute("data-portions-status") == "true") {
			PriceDish8 = parseFloat(PriceDishBlock[0].getAttribute("data-portions-price-8"));
			PriceDish4 = parseFloat(PriceDishBlock[0].getAttribute("data-portions-price-4"));
			if (CountDish % 1 == 0) {
				TotalPriceDish = PriceDish8 * CountDish;
				TotalPriceDish = parseFloat(TotalPriceDish);
			} else {
				TotalPriceDish = PriceDish8 * parseInt(CountDish) + PriceDish4;
				TotalPriceDish = parseFloat(TotalPriceDish);
			}
			Cart.push({
				"id": IdDish,
				"Name": NameDish,
				"NameRest": NameRest,
				"Image": ImgDish,
				"PortionsStatus": PriceDishBlock[0].getAttribute("data-portions-status"),
				"Price4": PriceDish4,
				"Price8": PriceDish8,
				"CountDish": CountDish,
				"TotalPriceDish": TotalPriceDish
			});
			var serialObj = JSON.stringify(Cart);
			localStorage.setItem('Cart', serialObj);
			CountAndPriceCart();
			CountDishBlock[0].value = Step;
		} else {
			TotalPriceDish = PriceDish * CountDish;
			TotalPriceDish = parseFloat(TotalPriceDish);
			Cart.push({
				"id": IdDish,
				"Name": NameDish,
				"NameRest": NameRest,
				"Image": ImgDish,
				"PortionsStatus": PriceDishBlock[0].getAttribute("data-portions-status"),
				"Price": PriceDish,
				"CountDish": CountDish,
				"TotalPriceDish": TotalPriceDish
			});
			var serialObj = JSON.stringify(Cart);
			localStorage.setItem('Cart', serialObj);
			CountAndPriceCart();
			CountDishBlock[0].value = Step;
		}
		if (Arr != null) {
			var length = Arr.length;
			for (let i = 0; i < length; i++) {
				if (Arr[i].id === IdDish) {
					if (PriceDishBlock[0].getAttribute("data-portions-status") == "true") {
						CountDishArr = Arr[i].CountDish;
						CountDishArr += CountDish;
						Arr[i].CountDish = CountDishArr;
						console.log(CountDishArr);
						if (CountDishArr % 1 == 0) {
							TotalPriceDish = Arr[i].Price8 * CountDishArr;
							Arr[i].TotalPriceDish = parseFloat(TotalPriceDish);
							serialObj = JSON.stringify(Arr);
							localStorage.setItem('Cart', serialObj);
							CountAndPriceCart();
						} else {
							TotalPriceDish = Arr[i].Price8 * parseInt(CountDishArr) + Arr[i].Price4;
							Arr[i].TotalPriceDish = parseFloat(TotalPriceDish);
							serialObj = JSON.stringify(Arr);
							localStorage.setItem('Cart', serialObj);
							CountAndPriceCart();
						}
					} else {
						CountDishArr = Arr[i].CountDish;
						CountDishArr += CountDish;
						Arr[i].CountDish = CountDishArr;
						TotalPriceDish = Arr[i].Price * CountDishArr;
						Arr[i].TotalPriceDish = parseFloat(TotalPriceDish);
						serialObj = JSON.stringify(Arr);
						localStorage.setItem('Cart', serialObj);
						CountAndPriceCart();
					}
					// console.log(JSON.parse(localStorage.getItem('Cart')));
				}
			}
		}
		swal({
			text: "" + NameDish + " добавлена ;)",
			button: false,
			timer: 650,
		});

	}
}