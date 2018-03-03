new ClipboardJS('.btn-order_copy', {
    text: function(trigger) {
		let Parent = trigger.parentElement;
		let Name = Parent.querySelector(".container-row > .container-customer > .name-items-order").innerText;
		let Surname = Parent.querySelector(".container-row > .container-customer > .surname-items-order").innerText;
		let Patronymic = Parent.querySelector(".container-row > .container-customer > .patronymic-items-order").innerText;
		let Phone = Parent.querySelector(".container-row > .container-customer > .phone-items-order").innerText;
		let Street = Parent.querySelector(".container-row > .container-address > .street-items-order").innerText;
		let Home = Parent.querySelector(".container-row > .container-address > .home-items-order").innerText;
		let Porch = Parent.querySelector(".container-row > .container-address > .porch-items-order").innerText;
		let Level = Parent.querySelector(".container-row > .container-address > .level-items-order").innerText;
		let Apartment = Parent.querySelector(".container-row > .container-address > .apartment-items-order").innerText;
		let Comment = Parent.querySelector(".container-row > .container-address > .comment-items-order").innerText;
		let Promocode = Parent.querySelector(".container-row > .container-address > .promocode-items-order").innerText;
		let NameDish = Parent.querySelectorAll(".spoiler-items-order-panel > .content-spoiler > .container-item-spoiler > .name-dish");
		let CountDish = Parent.querySelectorAll(".spoiler-items-order-panel > .content-spoiler > .container-item-spoiler > .count-dish");
		let Dish = "";
		for(let i = 0; i < NameDish.length; i++){
			Dish += 'Блюдо: ' +NameDish[i].innerText+ '/ Количество: ' +CountDish[i].innerText+ '\n';
		}
		let DataText = Name+ ', ' +Surname+ ', ' +Patronymic+ '\n' +Phone+ '\n' +Street+ ', ' +Home+ ', ' +Porch+ ', ' +Level+ ', ' +Apartment+ '\n' +Comment+ ', ' +Promocode+ '\n' +Dish;
        return DataText;
    }
});