document.addEventListener("DOMContentLoaded", function() {
    let dataErr = {}
    var PostButton = document.getElementById("button-cart-post");
    var Cart = [];
    var Arr = JSON.parse(localStorage.getItem('Cart'));
    var DeleteButton = document.getElementsByClassName("container-button-cancel-eat-cart");
    var DishCount = document.getElementsByClassName("dishCount");
    var RestName = Arr[0].NameRest;
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
    var PhoneV = '';
    var ReText = /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/;
    var Number = /^\d+$/;
    var ReEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    var RePhone = /^\+375[0-9]{2}[0-9]{7}$/;
    var InfoUser = {};

    function PostAjaxCart() {
        if (Arr == null) {} else {
            for (var i = 0; i < DeleteButton.length; i++) {
                let IdDish = DeleteButton[i].getAttribute("data-id-dish");
                let Count = DishCount[i].value;
                console.log(RestName);
                Cart.push({
                    "idDish": IdDish,
                    "count": Count
                });
            }
            axios.post('https://voztest.ga/orders', {
                    // axios.post('http://127.0.0.1:5000/orders', {
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
                    "promocode": Promocode.value
                })
                .then(function(response) {
                    console.log(response);
                    Cart = [];
                    swal({
                        text: "Ваш заказ отправлен ;)",
                        icon: "success",
                    });
                })
                .catch(function(error) {
                    console.log(error);
                    console.log(error.response.data);
                    Cart = [];
                    swal({
                        text: "" + error + "",
                        icon: "error",
                    });
                });
        }
    }

	PostButton.addEventListener("click", function () {
		var ArrValueInput = [Name, Surname, Street, Entrance, Apartment, Phone, Email];
		var Status = true;
		var StringError = '';
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
			var serialObj = JSON.stringify(InfoUser);
			localStorage.setItem('InfoUser', serialObj);
			for (var i = 0; i < ArrValueInput.length; i++) {
				ArrValueInput[i].classList.remove("input-error");
				ArrValueInput[i].value = "";
			}
			Patronymic.value = "";
			House.value = "";
			Level.value = "";
			Comment.value = "";
			Promocode.value = "";
			PostAjaxCart();
		} else {
			StringError = StringError.slice(0, -2);
			StringError = 'Поля заполнены не верно (' + StringError + ')';
			swal({
				text: StringError,
				icon: "error",
			});
		}
	});

    PostButton.addEventListener("click", function() {
        var ArrValueInput = [Name, Surname, Street, Entrance, Apartment, Phone, Email];
        var Status = true;
        var StringError = '';
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
                ArrValueInput[i].value = "";
            }
        } else {
            StringError = StringError.slice(0, -2);
            StringError = 'Поля заполнены не верно (' + StringError + ')';
            swal({
                text: StringError,
                icon: "error",
            });
        }
    });
});