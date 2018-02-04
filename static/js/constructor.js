document.addEventListener("DOMContentLoaded", Update());

function Update() {
    var PlusIngredients = document.getElementsByClassName("ingredients-items-plus");
    var MinusIngredients = document.getElementsByClassName("ingredients-items-minus");
    var ContainerCunstructorMy = document.getElementById("my-ingredients");
    var ContainerCunstructor = document.getElementById("ingredients");
    var ButtonClearCunstructor = document.getElementById("button-remove-pancake");
    var ButtonPostCunstructor = document.getElementById("button-cart-post");
    var ContainerTitlePage = document.querySelector(".container-title-page");
    var ElemIdAdtLine = document.querySelector('.ingredients-items').getAttribute('data-id-ingredients');
    var SrcImage = "";
    // console.log(ElemIdAdtLine);

    function PlusIngridient() {
        let Elem = this;
        let ElemId = Elem.getAttribute('data-id-ingredients');
        let MyIngredients = ContainerCunstructorMy.querySelector('[data-id-ingredients=' + ElemId + ']');
        Elem.classList.add('ingredients-items-hidden');
        MyIngredients.classList.add('ingredients-items-active');
    }
    for (let i = 0; i < PlusIngredients.length; i++) {
        PlusIngredients[i].addEventListener("click", PlusIngridient, false);
    }

    function MinusIngridient() {
        let Elem = this;
        let ElemId = Elem.getAttribute('data-id-ingredients');
        let Ingredients = ContainerCunstructor.querySelector('[data-id-ingredients=' + ElemId + ']');
        Elem.classList.remove('ingredients-items-active');
        Ingredients.classList.remove('ingredients-items-hidden');

    }
    for (let i = 0; i < MinusIngredients.length; i++) {
        MinusIngredients[i].addEventListener("click", MinusIngridient, false);
    }

    ButtonClearCunstructor.addEventListener("click", function Clear() {
        let ActiveIngredients = ContainerCunstructor.querySelectorAll('.ingredients-items-hidden');
        let ActiveIngredientsMy = ContainerCunstructorMy.querySelectorAll('.ingredients-items-active');
        let Input = document.querySelector('.dishCount');
        for (let i = 0; i < ActiveIngredientsMy.length; i++) {
            ActiveIngredientsMy[i].classList.remove('ingredients-items-active');
            ActiveIngredients[i].classList.remove('ingredients-items-hidden');
        }
        Input.value = 1;
    });

    ButtonPostCunstructor.addEventListener("click", function() {
        let ActiveIngredientsMy = ContainerCunstructorMy.querySelectorAll('.ingredients-items-active');
        let NameRest = ContainerTitlePage.getAttribute("data-name-rest-constructor");
        let TypeConstructorRest = ContainerTitlePage.getAttribute("data-type-rest-constructor");
        let NameIngredients = '';
        let PriceIngredients = 0;
        let TotalPriceDish = 0;
        let Cart = [];
        let Arr = JSON.parse(localStorage.getItem('Cart'));
        let Price = 0;
        let Input = document.querySelector('.dishCount');
        let CountDish = 0;
        if (TypeConstructorRest === "Блинчик") {
            SrcImage = "../image/constructor/constr_pancake.png";
        } else if (TypeConstructorRest === "Пицца") {
            SrcImage = "../image/constructor/constr_pizza.png";
        }
        //        AdditionalLine = "Пицца";
        //        AdditionalLine = "Блинчик";
        if (Arr == null) {
            if (ActiveIngredientsMy.length == 0) {
                swal({
                    text: "Выберите ингредиенты",
                    icon: "error",
                });
            } else {
                for (let i = 0; i < ActiveIngredientsMy.length; i++) {
                    NameIngredients += ActiveIngredientsMy[i].querySelector('.name-ingredients').innerText.concat(',');
                    Price = ActiveIngredientsMy[i].querySelector('.price-ingredients').innerText;
                    Price = Price.substr(0, Price.length - 5);
                    PriceIngredients += parseFloat(Price);
                }
                NameIngredients = NameIngredients.slice(0, -2);
                NameIngredients = TypeConstructorRest + ' (' + NameIngredients + ')';
                CountDish = Input.value;
                TotalPriceDish = PriceIngredients * CountDish;
                Cart.push({
                    "Name": NameIngredients,
                    "Image": SrcImage,
                    "Price": PriceIngredients,
                    "TotalPriceDish": TotalPriceDish,
                    "CountDish": CountDish,
                    "id": NameIngredients,
                    "NameRest": NameRest
                });
                var serialObj = JSON.stringify(Cart);
                localStorage.setItem('Cart', serialObj);
                // console.log(NameIngredients);
                // console.log(PriceIngredients);
                // console.log(Cart);
                swal({
                    text: "" + NameIngredients + " добавлена ;)",
                    button: false,
                    timer: 650,
                });
                CountAndPriceCart();
            }
        } else {
            if (ActiveIngredientsMy.length == 0) {
                swal({
                    text: "Выберите ингредиенты",
                    icon: "error",
                });
            } else {
                let length = Arr.length;
                for (let a = 0; a < length; a++) {
                    Cart.push(Arr[a]);
                }
                for (let i = 0; i < ActiveIngredientsMy.length; i++) {
                    NameIngredients += ActiveIngredientsMy[i].querySelector('.name-ingredients').innerText.concat(', ');
                    Price = ActiveIngredientsMy[i].querySelector('.price-ingredients').innerText;
                    Price = Price.substr(0, Price.length - 5);
                    PriceIngredients += parseFloat(Price);
                }
                NameIngredients = NameIngredients.slice(0, -2);
                NameIngredients = TypeConstructorRest + ' (' + NameIngredients + ')';
                CountDish = Input.value;
                TotalPriceDish = PriceIngredients * CountDish;

                Cart.push({
                    "Name": NameIngredients,
                    "Image": SrcImage,
                    "Price": PriceIngredients,
                    "TotalPriceDish": TotalPriceDish,
                    "CountDish": CountDish,
                    "id": NameIngredients,
                    "NameRest": NameRest
                });
                var serialObj = JSON.stringify(Cart);
                localStorage.setItem('Cart', serialObj);
                // console.log(NameIngredients);
                // console.log(PriceIngredients);

                swal({
                    text: "" + NameIngredients + " добавлена ;)",
                    button: false,
                    timer: 650,
                });
                CountAndPriceCart();
            }
            if (Arr != null) {
                var lengthB = Arr.length;
                let CountDishArr = 0;
                for (let i = 0; i < lengthB; i++) {
                    if (Arr[i].id === NameIngredients) {
                        CountDishArr = parseInt(Arr[i].CountDish);
                        CountDishArr += parseInt(CountDish);
                        Arr[i].CountDish = CountDishArr;
                        TotalPriceDish = Arr[i].Price * CountDishArr;
                        Arr[i].TotalPriceDish = parseFloat(TotalPriceDish);
                        serialObj = JSON.stringify(Arr);
                        localStorage.setItem('Cart', serialObj);
                        // console.log(JSON.parse(localStorage.getItem('Cart')));
                    }
                }
            }
        }

    });
}