document.addEventListener("DOMContentLoaded", function ShowCart(event) {
        var Bly = JSON.parse(localStorage.getItem('Cart'));
        console.log(JSON.parse(localStorage.getItem('Cart')));
        var BlockContainer = document.getElementById("main-eat-container-cart");
        console.log(BlockContainer[0]);
        console.log(Bly[0].Name);
        var div = '';
        if (Bly == null) {
            BlockContainer.innerHTML = div;
        } else {
            for (var i = 0; i < Bly.length; i++) {
                div += '<div class="container-eat-cart"><div class="container-image-eat-cart"><img src="' + Bly[i].Image + '"><div class="container-name-eat-cart"><span>' + Bly[i].Name + '</span></div></div><div class="container-button-eat-cart"><div class="container-price-eat-cart"><span>' + Bly[i].Price + '</span></div><div class="card-dish-action"><div class="inpMinus">-</div><input class="dishCount" type="number" step="1" min="1" max="50" name="dishCount" value="' + Bly[i].CountDish + '" readonly><div class="inpPlus">+</div><div data-id-dish="'+Bly[i].id+'" class="container-button-cancel-eat-cart"><span class="fa fa-times"></span></div></div></div></div>';
                console.log(div);
            }
            BlockContainer.innerHTML = div;
        }
});
