document.addEventListener("DOMContentLoaded", function () {
var Phone = document.querySelector(".input-phone");
var PhoneV = '';
var Re = /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/;
Phone.oninput = function () {
	PhoneV = Phone.value;
	console.log(PhoneV);
	if (Re.test(PhoneV)) {
		console.log("ОК");
	} else {
		console.log("НЕ ОК");
	}
	console.log(Phone.value);
}
});