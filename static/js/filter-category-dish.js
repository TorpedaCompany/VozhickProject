document.addEventListener("DOMContentLoaded", function(event) {
    var FilterButton = document.getElementsByClassName("filter-item");
    var Dish = document.getElementsByClassName("rest-card-dish");
    var Container = document.getElementById("rest-filter-container");
    var ContainerDish = document.getElementById("rest-catalog-dish");

    function ResetDish() {
        let CountDish = ContainerDish.querySelectorAll(".rest-card-dish");
        for (let i = 0; i < CountDish.length; i++) {
            CountDish[i].classList.remove("rest-card-dish-hidden");
        }
    }

    function Filter() {
        ResetDish();
        Container.querySelector(".active-filter-item").classList.remove("active-filter-item");
        this.classList.add("active-filter-item");
        let Category = this.getAttribute("data-category-dish");
        if (Category == "Все") {
            ResetDish();
        } else {
            //console.log(Category);

            let a = ContainerDish.querySelectorAll(".rest-card-dish:not([data-category-dish=" + Category + "])");
            //console.log(a);
            for (let i = 0; i < a.length; i++) {
                a[i].classList.add("rest-card-dish-hidden");
            }

        }
    }
    for (let i = 0; i < FilterButton.length; i++) {
        FilterButton[i].addEventListener("click", Filter, false);
    }
});