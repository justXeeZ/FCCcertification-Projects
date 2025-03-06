let textInput = document.getElementById("text-input");
let checkBtn = document.getElementById("check-btn");
let result = document.getElementById("result");

checkBtn.addEventListener("click", () => {
	handleCheck(textInput, result);
});

function handleCheck(inputField, resultField) {
	if (inputField.value !== "") {
		checkIfPalindrome(textInput.value)
			? (resultField.innerText = `${inputField.value} is a palindrome`)
			: (resultField.innerText = `${inputField.value} is not a palindrome`);
		inputField.value = "";
	} else {
		window.alert("Please input a value");
	}
}
function checkIfPalindrome(string) {
	let cleanString = string.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
	let originalString = [...cleanString];
	let reversedString = [...cleanString].reverse();
	console.log(originalString);
	console.log(reversedString);
	if (originalString.join("") === reversedString.join("")) {
		return true;
	} else {
		return false;
	}
}
