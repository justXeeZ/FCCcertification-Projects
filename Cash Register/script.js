const changeDueOutput = document.getElementById("change-due");
const cidOutput = document.getElementById("cash-in-drawer");
const purchaseBtn = document.getElementById("purchase-btn");
const priceTag = document.getElementById("price");

let price = 3.26;
priceTag.innerText = `Total: $${price}`;

let cid = [
	["PENNY", 1.01],
	["NICKEL", 2.05],
	["DIME", 3.1],
	["QUARTER", 4.25],
	["ONE", 90],
	["FIVE", 55],
	["TEN", 20],
	["TWENTY", 60],
	["ONE HUNDRED", 100],
];

updateOutput("", cid, cidOutput);

purchaseBtn.addEventListener("click", () => {
	let cashInput = document.getElementById("cash");
	if (cashInput.value) {
		let cash = parseFloat(cashInput.value);
		let result = calculateChange(price, cash, cid);

		if (result.status === "OPEN") {
			cid = result.change;
		}

		updateOutput(result.status, result.change, changeDueOutput);
		updateOutput("", cid, cidOutput);
	}
	document.getElementById("cash").value = "";
});

function calculateChange(price, cash, cid) {
	let den = [
		["PENNY", 0.01],
		["NICKEL", 0.05],
		["DIME", 0.1],
		["QUARTER", 0.25],
		["ONE", 1],
		["FIVE", 5],
		["TEN", 10],
		["TWENTY", 20],
		["ONE HUNDRED", 100],
	];

	let change = cash - price;
	change = Math.round(change * 100) / 100;
	let totalCid = cid.reduce((acc, ele) => acc + ele[1], 0);
	totalCid = Math.round(totalCid * 100) / 100;

	if (cash < price) {
		alert("Customer does not have enough money to purchase the item");
		return { status: "Status: INSUFFICIENT_FUNDS", change: [] };
	} else if (cash === price) {
		return { status: "No change due - customer paid with exact cash", change: [] };
	} else if (totalCid < change) {
		return { status: "Status: INSUFFICIENT_FUNDS", change: [] };
	}

	let changeArr = [];

	for (let i = den.length - 1; i >= 0; i--) {
		let denomName = den[i][0];
		let denomValue = den[i][1];
		let amountInDrawer = Math.round(cid.find((item) => item[0] === denomName)[1] * 100) / 100;
		let amountToReturn = 0;

		while (change >= denomValue && amountInDrawer >= denomValue) {
			change -= denomValue;
			change = Math.round(change * 100) / 100;
			amountInDrawer -= denomValue;
			amountInDrawer = Math.round(amountInDrawer * 100) / 100;
			amountToReturn += denomValue;
		}

		if (amountToReturn > 0) {
			changeArr.push([denomName, amountToReturn]);
			cid.find((item) => item[0] === denomName)[1] = amountInDrawer;
		}
	}

	if (change > 0) {
		return { status: "Status: INSUFFICIENT_FUNDS", change: [] };
	}

	let isClosed = cid.every((item) => item[1] === 0);

	console.log(changeArr);
	return {
		status: isClosed ? "Status: CLOSED" : "Status: OPEN",
		change: changeArr,
	};
}

function updateOutput(status, arr, output) {
	arr = arr.filter(([_, amm]) => amm > 0).reverse();

	output.innerHTML = status ? `<p>${status}</p>` : "";
	output.innerHTML += arr
		.filter(([_, amm]) => amm > 0)
		.map(([den, amm]) => `<p>${den}: $${amm % 1 === 0 ? amm : parseFloat(amm.toFixed(2))}</p>`)
		.join("");
}
