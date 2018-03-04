document.addEventListener("DOMContentLoaded", function() {
    let dataErr = {}
    var PostButton = document.getElementById("button-cart-post");
    var Cart = [];
    var Arr = JSON.parse(localStorage.getItem('Cart'));
    var DeleteButton = document.getElementsByClassName("container-button-cancel-eat-cart");
    var DishCount = document.getElementsByClassName("dishCount");
    var RestName = '';
    var Name = document.querySelector(".input-name");
    var Surname = document.querySelector(".input-surname");
    var Patronymic = document.querySelector(".input-patronymic");
    var Street = document.querySelector(".input-street");
    var House = document.querySelector(".input-house");
    var Entrance = document.querySelector(".input-entrance");
    var Level = document.querySelector(".input-level");
    var Apartment = document.querySelector(".input-apartment");
    var Phone = document.querySelector(".input-phone");
    var Email = document.querySelector(".input-email");
    var Comment = document.querySelector(".input-comment");
    var Promocode = document.querySelector(".input-promocode");
    var CheckBox = document.querySelector("#checkbox-cart");
    var PhoneV = '';
    var ReText = /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/;
    var Number = /^\d+$/;
    var ReEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    var RePhone = /^\+375[0-9]{2}[0-9]{7}$/;
    var InfoUser = {};
    var PaymentMethod = false;

    function IfCheckBox() {
        if (Arr != null) {
            if (Arr[0].NameRest == "Суши №1") {
                document.querySelector(".container-input-checkbox-cart").classList.add("container-input-checkbox-cart-active");
            }
        }
    }
    IfCheckBox();

    function PostAjaxCart() {
        if (Arr != null) {
            if (CheckBox.checked) {
                PaymentMethod = true;
            }
            // console.log(PaymentMethod);

            RestName = Arr[0].NameRest;
            for (var i = 0; i < DeleteButton.length; i++) {
                let IdDish = DeleteButton[i].getAttribute("data-id-dish");
                let Count = DishCount[i].value;
                // console.log(RestName);
                Cart.push({
                    "idDish": IdDish,
                    "count": Count
                });
            }
            // axios.post('https://voztest.ga/orders', {
            axios.post('./orders', {
                    "dishes": Cart,
                    "restName": RestName,
                    "firstName": Name.value,
                    "lastName": Surname.value,
                    "middleName": Patronymic.value,
                    "street": Street.value,
                    "house": House.value,
                    "entrance": Entrance.value,
                    "floor": Level.value,
                    "apartment": Apartment.value,
                    "phone": Phone.value,
                    "email": Email.value,
                    "comment": Comment.value,
                    "promocode": Promocode.value,
                    "paymentMethod": PaymentMethod
                })
                .then(function(response) {
                    // console.log(response);
                    Cart = [];
                    swal({
                        text: "Ваш заказ отправлен ;)",
                        icon: "success",
                    });
                })
                .catch(function(error) {
                    console.log(error);
                    // console.log(error.response.data.error);
                    Cart = [];
                    swal({
                        text: "" + error + "\n" + error.response.data.error + "",
                        icon: "error",
                    });
                });
        }
    }

    PostButton.addEventListener("click", function() {
        if (PostButton.classList.contains("button-cart-post-disabled")) {} else {
            var ArrValueInput = [Name, Surname, Street, Entrance, Apartment, Phone, Email];
            var Status = true;
            var StringError = '';
            if (Arr[0].NameRest == "Пиццерия 'Корица'") {
                let PriceIf = 0;
                for (let i = 0; i < Arr.length; i++) {
                    PriceIf += parseFloat(Arr[i].TotalPriceDish);
                }
                if (PriceIf < 10) {
                    Status = false;
                    StringError += 'Минимальный заказ из Корицы 10 рублей!'.concat(', ');
                }
            }
            for (var i = 0; i < ArrValueInput.length; i++) {
                switch (ArrValueInput[i]) {
                    case Name:
                        if (!ReText.test(Name.value)) {
                            Status = false;
                            Name.classList.add("input-error");
                            StringError += 'Имя'.concat(', ');
                        } else {
                            Name.classList.remove("input-error");
                        }
                        break;
                    case Surname:
                        if (!ReText.test(Surname.value)) {
                            Status = false;
                            Surname.classList.add("input-error");
                            StringError += 'Фамилия'.concat(', ');
                        } else {
                            Surname.classList.remove("input-error");
                        }
                        break;
                    case Street:
                        if (!ReText.test(Street.value)) {
                            Status = false;
                            Street.classList.add("input-error");
                            StringError += 'Улица'.concat(', ');
                        } else {
                            Street.classList.remove("input-error");
                        }
                        break;
                    case Entrance:
                        if (!Number.test(Entrance.value)) {
                            Status = false;
                            Entrance.classList.add("input-error");
                            StringError += 'Подъезд'.concat(', ');
                        } else {
                            Entrance.classList.remove("input-error");
                        }
                        break;
                    case Apartment:
                        if (!Number.test(Apartment.value)) {
                            Status = false;
                            Apartment.classList.add("input-error");
                            StringError += 'Квартира'.concat(', ');
                        } else {
                            Apartment.classList.remove("input-error");
                        }
                        break;
                    case Phone:
                        if (!RePhone.test(Phone.value)) {
                            Status = false;
                            Phone.classList.add("input-error");
                            StringError += 'Телефон'.concat(', ');
                        } else {
                            Phone.classList.remove("input-error");
                        }
                        break;
                    case Email:
                        if (!ReEmail.test(Email.value)) {
                            Status = false;
                            Email.classList.add("input-error");
                            StringError += 'Email'.concat(', ');
                        } else {
                            Email.classList.remove("input-error");
                        }
                        break;
                }
            }

            if (Status != false) {
                InfoUser = {
                    "Name": Name.value,
                    "Surname": Surname.value,
                    "House": House.value,
                    "Patronymic": Patronymic.value,
                    "Street": Street.value,
                    "Entrance": Entrance.value,
                    "Level": Level.value,
                    "Apartment": Apartment.value,
                    "Phone": Phone.value,
                    "Email": Email.value
                }
                PostAjaxCart();
                var serialObj = JSON.stringify(InfoUser);
                localStorage.setItem('InfoUser', serialObj);
                for (var i = 0; i < ArrValueInput.length; i++) {
                    ArrValueInput[i].classList.remove("input-error");
                    //                ArrValueInput[i].value = "";
                }
                Name.value = "";
                Surname.value = "";
                Patronymic.value = "";
                Street.value = "";
                House.value = "";
                Entrance.value = "";
                Level.value = "";
                Apartment.value = "";
                Phone.value = "";
                Email.value = "";
                Comment.value = "";
                Promocode.value = "";
                localStorage.removeItem('Cart');
                ShowCart();
                TotalCart();
                CountAndPriceCart();
                document.querySelector(".container-input-checkbox-cart").classList.remove("container-input-checkbox-cart-active");
            } else {
                StringError = StringError.slice(0, -2);
                StringError = 'Поля заполнены не верно (' + StringError + ')';
                swal({
                    text: StringError,
                    icon: "error",
                });
            }
        }
    });
});