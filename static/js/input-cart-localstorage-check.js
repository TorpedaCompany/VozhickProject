document.addEventListener("DOMContentLoaded", FillingInput());

function FillingInput() {
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
	var Arr = JSON.parse(localStorage.getItem('InfoUser'));
	if (Arr == null) {} else {
		Name.value = Arr.Name;
		Surname.value = Arr.Surname;
		Patronymic.value = Arr.Patronymic;
		Street.value = Arr.Street;
		House.value = Arr.House;
		Entrance.value = Arr.Entrance;
		Level.value = Arr.Level;
		Apartment.value = Arr.Apartment;
		Phone.value = Arr.Phone;
		Email.value = Arr.Email;
	}
}