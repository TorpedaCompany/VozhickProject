document.addEventListener("DOMContentLoaded", Update());

function Update() {
    var PlusIngredients = document.getElementsByClassName("ingredients-items-plus");
    var MinusIngredients = document.getElementsByClassName("ingredients-items-minus");
    var ContainerCunstructorMy = document.getElementById("my-ingredients");
    var ContainerCunstructor = document.getElementById("ingredients");


    function PlusIngridient() {
        let Elem = this;
        let ElemSpan = Elem.querySelector('.plus-ingredients');
        Elem.classList.remove("ingredients-items-plus");
        ElemSpan.classList.remove("fa-plus-square");
        Elem.classList.add("ingredients-items-minus");
        ElemSpan.classList.add("fa-minus-square");
        ContainerCunstructorMy.appendChild(Elem);
        Update()
    }
    for (let i = 0; i < PlusIngredients.length; i++) {
        PlusIngredients[i].addEventListener("click", PlusIngridient, false);
    }

    function MinusIngridient() {
        let Elem = this;
        let ElemSpan = Elem.querySelector('.plus-ingredients');
        Elem.classList.remove("ingredients-items-minus");
        ElemSpan.classList.remove("fa-minus-square");
        Elem.classList.add("ingredients-items-plus");
        ElemSpan.classList.add("fa-plus-square");
        ContainerCunstructor.appendChild(Elem);
        Update()
    }
    for (let i = 0; i < MinusIngredients.length; i++) {
        MinusIngredients[i].addEventListener("click", MinusIngridient, false);
    }
}