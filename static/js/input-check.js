document.addEventListener("DOMContentLoaded", function () {
var Phone = document.querySelector(".input-phone");
var PhoneV = '';
var Re = /^\+375[0-9]{2}[0-9]{7}$/;
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