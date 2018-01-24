document.addEventListener("DOMContentLoaded", function (event) {

	var Tab = document.getElementsByClassName("admin-side-panel-item-button");
	var PanelActiveOrder = document.querySelector(".container-active-order-panel");
	console.log(PanelActiveOrder);
	var PanelDoneOrder = document.querySelector(".container-done-order-panel");
	console.log(PanelDoneOrder);
	var TabActive = '';
	var TabData = '';

	function TabA() {
		TabActive = document.querySelector('.active-admin-side-panel-item-button');
		TabActive.classList.remove("active-admin-side-panel-item-button");
		this.classList.add("active-admin-side-panel-item-button");
		TabData = document.querySelector('.active-admin-side-panel-item-button').getAttribute("data-tab");
		if (TabData == '1') {
			PanelDoneOrder.classList.remove("active-panel");
			PanelActiveOrder.classList.add("active-panel");
		} else if (TabData == '2') {
			PanelActiveOrder.classList.remove("active-panel");
			PanelDoneOrder.classList.add("active-panel");
		}
	}

	for (let i = 0; i < Tab.length; i++) {
		Tab[i].addEventListener("click", TabA, false);
	}
});