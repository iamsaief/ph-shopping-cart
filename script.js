const productPrices = [1219, 59];
let subtotalPrice = 0;
let subtotalArr = [...productPrices];

// Handle click on cart-items
document
	.querySelectorAll(".cart-item:not(.cart-checkout)")
	.forEach((item, index) => {
		item.addEventListener("click", (e) => {
			const { target, currentTarget } = e;
			const price = currentTarget.querySelector(".item-price");
			const unit = currentTarget.querySelector(".item-unit");
			const msg =
				"Are you sure ? 😲 Press Cancel to leave it, OK to remove.";

			if (
				target.classList.contains("btn-plus") ||
				target.classList.contains("fa-plus")
			) {
				updatedPrice(unit, price, productPrices[index], "+", index);
			}
			if (
				target.classList.contains("btn-minus") ||
				target.classList.contains("fa-minus")
			) {
				updatedPrice(unit, price, productPrices[index], "-", index);
			}
			if (target.classList.contains("remove-item")) {
				if (window.confirm(msg)) {
					item.style.display = "none";

					updatedPrice(unit, price, productPrices[index], "-", index);
				}
			}
		});
	});

// Cart Item and Price Calculation
function updatedPrice(unit, priceEl, basePrice, status, index) {
	let newUnit;
	if (status === "+") {
		newUnit = ++unit.value;
	} else {
		newUnit = --unit.value;
	}

	let newPrice = basePrice * newUnit;
	priceEl.innerText = newPrice;

	subtotalArr[index] = newPrice;
	checkoutPrice(subtotalArr);
}

// Cart Checkout Calculation (assuming 10% tax)
function checkoutPrice(subtotalArr) {
	let [a, b] = subtotalArr;
	const subtotal = document.querySelector(".subtotal");
	const tax = document.querySelector(".tax");
	const total = document.querySelector(".total");
	subtotalPrice = a + b;
	const taxPrice = parseFloat((subtotalPrice * 0.1).toFixed(2));
	const totalPrice = Math.ceil(subtotalPrice + taxPrice);

	subtotal.innerText = 0;
	tax.innerText = 0;
	total.innerText = 0;

	subtotal.innerText = subtotalPrice;
	tax.innerText = taxPrice;
	total.innerText = totalPrice;
}

// Show greetings
const checkoutBtn = document
	.querySelector(".check-out")
	.addEventListener("click", () => {
		const cartContent = document.querySelector("[class^=col-]");
		const greetings = document.querySelector(".greetings");
		cartContent.style.display = "none";
		greetings.style.display = "block";
	});
