const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const creature_name = document.getElementById("creature-name");
const creature_id = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const special_name = document.getElementById("special-name");
const special_description = document.getElementById("special-description");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const special_attack = document.getElementById("special-attack");
const special_defense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

document.getElementById("input-container").addEventListener("submit", (e) => {
	e.preventDefault();
});

searchBtn.addEventListener("click", () => {
	let searchInputValue = searchInput.value;
	if (searchInputValue) {
		fetchData("https://rpg-creature-api.freecodecamp.rocks/api/creatures", searchInputValue);
	}
});

function fetchData(url, input) {
	fetch(url)
		.then((res) => res.json())
		.then((data) => inputHandle(input, data))
		.catch((err) => console.error("Error from catch ==>", err))
		.finally(() => console.log("Fetching Data Completed"));
}

function inputHandle(input, list) {
	let state = false;
	let creatureId;
	for (const element of list) {
		if (element.id == input || element.name === input) {
			state = true;
			creatureId = element.id;
			break;
		} else {
			state = false;
		}
	}
	if (state) {
		console.log("creature found");
		fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${creatureId}`)
			.then((res) => res.json())
			.then((data) => showData(data))
			.catch((err) => console.error(Error(err)))
			.finally(() => console.log("Fetched Creature Successfully"));
	} else {
		clearData();
		setTimeout(() => {
			alert("Creature not found");
		}, 10);
		return;
	}
	return state;
}

function showData(creature) {
	clearData();
	creature_name.innerText = creature.name.toUpperCase();
	creature_id.innerText = `#${creature.id}`;
	weight.innerText = `Weight: ${creature.weight}`;
	height.innerText = `Height: ${creature.height}`;

	for (const element of creature.types) {
		types.innerHTML += `<span class="${element.name}">${element.name.toUpperCase()}<span>`;
	}
	special_name.innerText = creature.special.name;
	special_description.innerText = creature.special.description;

	for (const element of creature.stats) {
		element.name === "hp"
			? (hp.innerText = element.base_stat)
			: element.name === "attack"
			? (attack.innerText = element.base_stat)
			: element.name === "defense"
			? (defense.innerText = element.base_stat)
			: element.name === "special-attack"
			? (special_attack.innerText = element.base_stat)
			: element.name === "special-defense"
			? (special_defense.innerText = element.base_stat)
			: element.name === "speed"
			? (speed.innerText = element.base_stat)
			: null;
	}
}

function clearData() {
	creature_name.innerText = ``;
	creature_id.innerText = ``;
	height.innerText = ``;
	weight.innerText = ``;
	types.innerHTML = ``;
	special_name.innerText = ``;
	special_description.innerText = ``;
	hp.innerText = ``;
	attack.innerText = ``;
	defense.innerText = ``;
	special_attack.innerText = ``;
	special_defense.innerText = ``;
	speed.innerText = ``;
}
