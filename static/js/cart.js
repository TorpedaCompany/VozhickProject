document.addEventListener("DOMContentLoaded", CheckVariables());
var AddCardButton = document.querySelectorAll(".addToCard");

function ErrorRestoraunt(ErrorMessage) {
	swal({
//		text: "В одном заказе может быть только один ресторан(",
		text: ErrorMessage,
		icon: "error",
	});
	var AddCardButtonError = document.querySelectorAll(".addToCard");
	//	var CardDishContent1 = document.querySelectorAll(".card-dish-content");
	var CardDishContent2 = document.querySelectorAll(".card-dish-content a");
	for (var n = 0; n < AddCardButtonError.length; n++) {
		AddCardButtonError[n].classList.add("addToCard-disabled");
		//		CardDishContent1[n].style.display = "none";
	}
	for (var n = 0; n < CardDishContent2.length; n++) {
		CardDishContent2[n].style.display = "none";
	}
}

function CheckVariables() {
//	var Hours = new Date().getHours();
//	var RestOpen = document.querySelector(".rest-caption").getAttribute("data-opentime-rest").slice(0, -3);
//	var RestClose = document.querySelector(".rest-caption").getAttribute("data-closetime-rest").slice(0, -3);
//	var ErrorMessage = "";
//	if(Hours < parseInt(RestOpen)){
//		ErrorMessage = "Ресторан ещё закрыт";
//		ErrorRestoraunt(ErrorMessage);
//	}else if(Hours >= parseInt(RestClose)){
//		ErrorMessage = "Ресторан уже закрыт";
//		ErrorRestoraunt(ErrorMessage);
//	}else{}
	var Arr = JSON.parse(localStorage.getItem('Cart'));
	var NameRest = document.querySelector(".rest-caption").innerText;
	if (Arr == null) {} else {
		if (Arr[0].NameRest == NameRest) {} else {
			ErrorMessage = "В одном заказе может быть только один ресторан(";
			ErrorRestoraunt(ErrorMessage);
		}
	}
}

function Cart() {
	var Cart = [];
	var serialObj = '';
	var FindId = false;
	var NumberElementDish = 0;
	var Arr = JSON.parse(localStorage.getItem('Cart'));
	var NameRest = document.querySelector(".rest-caption").innerText;
	var Parent = this.parentElement.parentElement.parentElement.parentElement;
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

	if (Arr == null) {
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
			serialObj = JSON.stringify(Cart);
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
			serialObj = JSON.stringify(Cart);
			localStorage.setItem('Cart', serialObj);
			CountAndPriceCart();
			CountDishBlock[0].value = Step;
		}
	} else {
		for (let a = 0; a < Arr.length; a++) {
			Cart.push(Arr[a]);
			console.log(Arr[a]);
		}
		for (let i = 0; i < Arr.length; i++) {
			if (Arr[i].id === IdDish) {
				FindId = true;
				NumberElementDish = i;
			}
		}
		if (FindId === true) {
			if (PriceDishBlock[0].getAttribute("data-portions-status") == "true") {
				CountDishArr = Arr[NumberElementDish].CountDish;
				CountDishArr += CountDish;
				Arr[NumberElementDish].CountDish = CountDishArr;
				if (CountDishArr % 1 == 0) {
					TotalPriceDish = Arr[NumberElementDish].Price8 * CountDishArr;
					Arr[NumberElementDish].TotalPriceDish = parseFloat(TotalPriceDish);
					serialObj = JSON.stringify(Arr);
					localStorage.setItem('Cart', serialObj);
					CountAndPriceCart();
				} else {
					TotalPriceDish = Arr[NumberElementDish].Price8 * parseInt(CountDishArr) + Arr[NumberElementDish].Price4;
					Arr[NumberElementDish].TotalPriceDish = parseFloat(TotalPriceDish);
					serialObj = JSON.stringify(Arr);
					localStorage.setItem('Cart', serialObj);
					CountAndPriceCart();
				}
			} else {
				CountDishArr = Arr[NumberElementDish].CountDish;
				CountDishArr += CountDish;
				Arr[NumberElementDish].CountDish = CountDishArr;
				TotalPriceDish = Arr[NumberElementDish].Price * CountDishArr;
				Arr[NumberElementDish].TotalPriceDish = parseFloat(TotalPriceDish);
				serialObj = JSON.stringify(Arr);
				localStorage.setItem('Cart', serialObj);
				CountAndPriceCart();
			}
		} else {
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
				serialObj = JSON.stringify(Cart);
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
				serialObj = JSON.stringify(Cart);
				localStorage.setItem('Cart', serialObj);
				CountAndPriceCart();
				CountDishBlock[0].value = Step;
			}
		}
	}
	swal({
		text: "" + NameDish + " добавлена ;)",
		button: false,
		timer: 650,
	});
}

for (let i = 0; i < AddCardButton.length; i++) {
	if (AddCardButton[i].classList.contains("addToCard-disabled")) {} else {
		AddCardButton[i].addEventListener("click", Cart, false);
	}
}