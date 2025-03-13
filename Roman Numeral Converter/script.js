const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");
let inputArray = [];
let outputArray = [];

const rc = {
	unitsChar: "I",
	fiveChar: "V",
	tensChar: "X",
	fiftyChar: "L",
	hundresChar: "C",
	fiveHundredChar: "D",
	thousandsChar: "M",
};

numberInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
        e.preventDefault()
		handleInput(numberInput.value);
	}
});

convertBtn.addEventListener("click", () => {
	handleInput(numberInput.value);
});

function handleInput(input) {
	if (parseInt(input) <= 0) {
        addErrorClass()
		output.innerText = "Please enter a number greater than or equal to 1";
	} else if (parseInt(input) >= 4000) {
		addErrorClass()
		output.innerText = "Please enter a number less than or equal to 3999";
	} else if (isNaN(parseInt(input))) {
		addErrorClass()
		output.innerText = "Please enter a valid number";
	} else {
		inputArray = [...input];
		inputArray = inputArray.map((element) => +element);
		converter();
        output.classList.remove("error")
        output.classList.remove("empty")
	}
}

function converter() {
	let [units, tens, hundreds, thousands] = inputArray.reverse();
	if (thousands) {
		outputArray.push(rc.thousandsChar.repeat(thousands));
	}
	if (hundreds) {
		makeResult(hundreds, rc.hundresChar, rc.fiveHundredChar, rc.thousandsChar);
	}
	if (tens) {
		makeResult(tens, rc.tensChar, rc.fiftyChar, rc.hundresChar);
	}
	if (units) {
		makeResult(units, rc.unitsChar, rc.fiveChar, rc.tensChar);
	}
	output.textContent = outputArray.join("");
	outputArray = [];
}

function makeResult(number, iChar, vChar, xChar) {
	if (number < 4) {
		outputArray.push(iChar.repeat(number));
	} else if (number > 4 && number <= 8) {
		outputArray.push(vChar + iChar.repeat(number - 5));
	} else {
		number === 4
			? outputArray.push(iChar + vChar)
			: number === 9
			? outputArray.push(iChar + xChar)
			: console.log("no");
	}
}

function addErrorClass(){
    output.classList.add("error")
    output.classList.remove("empty")
}
