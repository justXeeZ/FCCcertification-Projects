const input = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("results-div");
const resultNode = document.createElement("p")
const telNumRegex = /(^1?\s?(?:\(\d{3}\)|\d{3})\s?-?[\d]{3}\s?-?[\d]{4}$)/;

checkBtn.addEventListener("click", matchNumber);
clearBtn.addEventListener("click", ()=>{
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
})

function matchNumber() {
	if (!input.value) {
		alert("Please provide a phone number");
		return;
	}

	// made the codition seperate to not throw an error if the match is null (not array)
	let condition;
	if (Array.isArray(input.value.match(telNumRegex))){
		condition = input.value.match(telNumRegex)[0] === input.value? true : false
	} else{
		condition = false
	}
	
	if(condition){
        resultNode.innerText = `Valid US number: ${input.value}`
        resultNode.className = "valid"
		result.appendChild(resultNode.cloneNode(true))
        input.value = ""
	} else {
        resultNode.innerText = `Invalid US number: ${input.value}`
        resultNode.className = "invalid"
		result.appendChild(resultNode.cloneNode(true))
        input.value = ""
	}
}
