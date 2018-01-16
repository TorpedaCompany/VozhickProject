document.addEventListener("DOMContentLoaded", function() {
    let dataErr = {}

    var PostButton = document.getElementById("button-cart-post");
    var Cart = [];
    PostButton.addEventListener("click", function() {
        let DeleteButton = document.getElementsByClassName("container-button-cancel-eat-cart");
        let DishCount = document.getElementsByClassName("dishCount");
        for (var i = 0; i < DeleteButton.length; i++) {
            let IdDish = DeleteButton[i].getAttribute("data-id-dish");
            let Count = DishCount[i].value;
            Cart.push({
                "idDish": IdDish,
                "Count": Count
            });
        }
        var serialObj = JSON.stringify(Cart);
        console.log(serialObj);
        // axios.post('http://178.159.44.211:5000/orders', {
        axios.post('http://localhost:5000/orders', {
                "dishes": Cart
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
    });
});