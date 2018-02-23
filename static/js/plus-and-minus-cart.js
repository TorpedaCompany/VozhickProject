//Когда документ прогружен начинаем;
document.addEventListener("DOMContentLoaded", UpdatePlusAndMinus());
	//Объявляем переменные кнопок + и -;
	function UpdatePlusAndMinus() {
		var Plus = document.getElementsByClassName("inpPlus");
		var Minus = document.getElementsByClassName("inpMinus");
		for (let i = 0; i < Plus.length; i++) {
			Plus[i].addEventListener("click", plus, false);
		}
		for (let i = 0; i < Minus.length; i++) {
			Minus[i].addEventListener("click", minus, false);
		}
	}
	//Функция для прибавления 1 к значению в инпуте;
	function plus() {
		let Parent = this.parentElement;
		let MyInput = Parent.getElementsByClassName("dishCount");
		let serialObj = {};
		let CountDishArr = 0;
		let TotalPriceDish = 0;
		for (let i = 0; i < MyInput.length; i++) {
			let val = parseFloat(MyInput[i].value);
			let Step = parseFloat(MyInput[i].getAttribute('Step'));
			if (val == 50) {} else {
				let DishId = this.getAttribute("data-id-dish");
				let Arr = JSON.parse(localStorage.getItem('Cart'));
				for (let a = 0; a < Arr.length; a++) {
					if (Arr[a].id == DishId) {
						CountDishArr = Arr[a].CountDish;
						CountDishArr += Step;
						Arr[a].CountDish = CountDishArr;
						if(MyInput[i].getAttribute("data-portions-status-dish") == "true"){
							if (CountDishArr % 1 == 0) {
								TotalPriceDish = Arr[a].Price8 * CountDishArr;
								Arr[a].TotalPriceDish = parseFloat(TotalPriceDish);
								
							} else {
								TotalPriceDish = Arr[a].Price8 * parseInt(CountDishArr) + Arr[a].Price4;
								Arr[a].TotalPriceDish = parseFloat(TotalPriceDish);
							}
						}else{
							TotalPriceDish = Arr[a].Price * CountDishArr;
							Arr[a].TotalPriceDish = parseFloat(TotalPriceDish);
						}
					}
				}
				serialObj = JSON.stringify(Arr);
				localStorage.setItem('Cart', serialObj);
				val += Step;
				MyInput[i].value = val;
				CountAndPriceCart();
				TotalCart();
			}
		}
	}
	//Функция для отнимания 1 от значения в инпуте;
	function minus() {
		let Parent = this.parentElement;
		let MyInput = Parent.getElementsByClassName("dishCount");
		let serialObj = {};
		let CountDishArr = 0;
		let TotalPriceDish = 0;
		for (let i = 0; i < MyInput.length; i++) {
			let val = parseFloat(MyInput[i].value);
			let Step = parseFloat(MyInput[i].getAttribute('Step'));
			if (val == Step) {} else {
				let DishId = this.getAttribute("data-id-dish");
				let Arr = JSON.parse(localStorage.getItem('Cart'));
				for (let a = 0; a < Arr.length; a++) {
					if (Arr[a].id == DishId) {
						CountDishArr = Arr[a].CountDish;
						CountDishArr -= Step;
						Arr[a].CountDish = CountDishArr;
						if(MyInput[i].getAttribute("data-portions-status-dish") == "true"){
							if (CountDishArr % 1 == 0) {
								TotalPriceDish = Arr[a].Price8 * CountDishArr;
								Arr[a].TotalPriceDish = parseFloat(TotalPriceDish);
							} else {
								TotalPriceDish = Arr[a].Price8 * parseInt(CountDishArr) + Arr[a].Price4;
								Arr[a].TotalPriceDish = parseFloat(TotalPriceDish);
							}
						}else{
							TotalPriceDish = Arr[a].TotalPriceDish - Arr[a].Price;
							Arr[a].TotalPriceDish = parseFloat(TotalPriceDish);
						}
					}
				}
				serialObj = JSON.stringify(Arr);
				localStorage.setItem('Cart', serialObj);
				val -= Step;
				MyInput[i].value = val;
				CountAndPriceCart();
				TotalCart();
			}
		}
	}