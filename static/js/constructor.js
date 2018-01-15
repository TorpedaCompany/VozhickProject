document.addEventListener("DOMContentLoaded", Update());

function Update() {
    var PlusIngredients = document.getElementsByClassName("ingredients-items-plus");
    var MinusIngredients = document.getElementsByClassName("ingredients-items-minus");
    var ContainerCunstructorMy = document.getElementById("my-ingredients");
    var ContainerCunstructor = document.getElementById("ingredients");
	var ButtonClearCunstructor = document.getElementById("button-remove-pancake");

    function PlusIngridient() {
        let Elem = this;
        let ElemId = Elem.getAttribute('data-id-ingredients');
		let MyIngredients = ContainerCunstructorMy.querySelector('[data-id-ingredients='+ElemId+']');
		Elem.classList.add('ingredients-items-hidden');
		MyIngredients.classList.add('ingredients-items-active');
    }
    for (let i = 0; i < PlusIngredients.length; i++) {
        PlusIngredients[i].addEventListener("click", PlusIngridient, false);
    }

    function MinusIngridient() {
        let Elem = this;
        let ElemId = Elem.getAttribute('data-id-ingredients');
		let Ingredients = ContainerCunstructor.querySelector('[data-id-ingredients='+ElemId+']');
		Elem.classList.remove('ingredients-items-active');
		Ingredients.classList.remove('ingredients-items-hidden');
		
    }
    for (let i = 0; i < MinusIngredients.length; i++) {
        MinusIngredients[i].addEventListener("click", MinusIngridient, false);
    }
	
	ButtonClearCunstructor.addEventListener("click", function () {
//		console.log(MinusIngredients);
		let ActiveIngredients = ContainerCunstructor.querySelectorAll('.ingredients-items-hidden');
		let ActiveIngredientsMy = ContainerCunstructorMy.querySelectorAll('.ingredients-items-active');
		let Input = document.getElementsByClassName('dishCount');
		console.log(Input);
		for(let i =0; i<ActiveIngredientsMy.length; i++){
			ActiveIngredientsMy[i].classList.remove('ingredients-items-active');
			ActiveIngredients[i].classList.remove('ingredients-items-hidden');
			
		}
		Input.value = 1;
//		ActiveIngredients.classList.remove('ingredients-items-active');
	});
}