document.addEventListener("DOMContentLoaded", function() {
    let dataErr = {}

    var PostButton = document.getElementById("button-cart-post");
    var Cart = [];
    PostButton.addEventListener("click", function() {
        let Arr = JSON.parse(localStorage.getItem('Cart'));
        if (Arr == null) {} else {
            let DeleteButton = document.getElementsByClassName("container-button-cancel-eat-cart");
            let DishCount = document.getElementsByClassName("dishCount");
            let RestName = Arr[0].NameRest;
            let Name = document.querySelector(".input-name").value;
            let Surname = document.querySelector(".input-surname").value;
            let Patronymic = document.querySelector(".input-patronymic").value;
            let Street = document.querySelector(".input-street").value;
            let House = document.querySelector(".input-house").value;
            let Entrance = document.querySelector(".input-entrance").value;
            let Level = document.querySelector(".input-level").value;
            let Apartment = document.querySelector(".input-apartment").value;
            let Phone = document.querySelector(".input-phone").value;
            let Email = document.querySelector(".input-email").value;
            let Comment = document.querySelector(".input-comment").value;
            let Promocode = document.querySelector(".input-promocode").value;
            for (var i = 0; i < DeleteButton.length; i++) {
                let IdDish = DeleteButton[i].getAttribute("data-id-dish");
                let Count = DishCount[i].value;
                console.log(RestName);
                Cart.push({
                    "idDish": IdDish,
                    "Count": Count

                });
            }
            //        var serialObj = JSON.stringify(Cart);
            //			console.log(serialObj);
            axios.post('http://178.159.44.211:5000/orders', {
                    "dishes": Cart,
                    "restName": RestName,
                    "firstName": Name,
                    "lastName": Surname,
                    "middleName": Patronymic,
                    "street": Street,
                    "house": House,
                    "entrance": Entrance,
                    "floor": Level,
                    "apartment": Apartment,
                    "phone": Phone,
                    "email": Email,
                    "comment": Comment,
                    "promocode": Promocode
                })
                .then(function(response) {
                    console.log(response);
                    Cart = [];
                })
                .catch(function(error) {
                    console.log(error);
                    console.log(error.response.data);
                    Cart = [];
                });
        }

    });
});