//Когда документ прогружен начинаем;
document.addEventListener("DOMContentLoaded", function (event) {
    //Объявляем переменные кнопок + и -;
    var Plus = document.getElementsByClassName("inpPlus");
    var Minus = document.getElementsByClassName("inpMinus");
    
    //Функция для прибавления 1 к значению в инпуте;
    function plus() {
        let Parent = this.parentElement;
        let MyInput = Parent.getElementsByClassName("dishCount");
        console.log(MyInput);
        for (let i = 0; i < MyInput.length; i++) {
            let val = MyInput[i].value;
            val++;
            MyInput[i].value = val;
        }
    }
    for (let i = 0; i < Plus.length; i++) {
        Plus[i].addEventListener("click", plus, false);
    }
    
    //Функция для отнимания 1 от значения в инпуте;
    function minus() {
        let Parent = this.parentElement;
        let MyInput = Parent.getElementsByClassName("dishCount");
        console.log(MyInput);
        for (let i = 0; i < MyInput.length; i++) {
            let val = MyInput[i].value;
            if (val == 1) {} else {
                val--;
                MyInput[i].value = val;
            }
        }
    }
    for (let i = 0; i < Minus.length; i++) {
        Minus[i].addEventListener("click", minus, false);
    }
});