document.addEventListener("DOMContentLoaded", CheckVariables());

function ErrorRestoraunt() {
    swal({
        text: "В одном заказе может быть только один ресторан(",
        icon: "error",
    });
}

function CheckVariables() {
    var AddCardButton = document.getElementsByClassName("addToCard");
    var i = 0;
    var Cart = [];
    var NameRest = document.querySelector(".rest-caption").innerText;
    var Arr = JSON.parse(localStorage.getItem('Cart'));
    if (Arr == null) {
        for (let i = 0; i < AddCardButton.length; i++) {
            AddCardButton[i].addEventListener("click", cart, false);
        }
    } else {
        if (Arr[0].NameRest == NameRest) {
            var length = Arr.length;
            for (let a = 0; a < length; a++) {
                Cart.push(Arr[a]);
            }

            for (let i = 0; i < AddCardButton.length; i++) {
                AddCardButton[i].addEventListener("click", cart, false);
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
        let CountDish = parseInt(CountDishBlock[0].value);
        let TotalPriceDish = 0;
        let CountDishArr = 0;
        TotalPriceDish = PriceDish * CountDish;
        TotalPriceDish = parseFloat(TotalPriceDish);

        Cart.push({
            "id": IdDish,
            "Name": NameDish,
            "NameRest": NameRest,
            "Image": ImgDish,
            "Price": PriceDish,
            "CountDish": CountDish,
            "TotalPriceDish": TotalPriceDish
        });
        var serialObj = JSON.stringify(Cart);
        localStorage.setItem('Cart', serialObj);
        CountAndPriceCart();
        CountDishBlock[0].value = 1;

        if (Arr != null) {
            var length = Arr.length;
            for (let i = 0; i < length; i++) {
                if (Arr[i].id === IdDish) {
                    CountDishArr = Arr[i].CountDish;
                    CountDishArr += CountDish;
                    Arr[i].CountDish = CountDishArr;
                    TotalPriceDish = Arr[i].Price * CountDishArr;
                    Arr[i].TotalPriceDish = parseFloat(TotalPriceDish);
                    serialObj = JSON.stringify(Arr);
                    localStorage.setItem('Cart', serialObj);
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