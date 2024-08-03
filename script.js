const INPUT_LISTENER = document.querySelector('body');
const ERROR_COUNTER = document.getElementById('error-counter');
const CHARACTER = document.getElementById('character');
const ORDER_OPTIONS = document.getElementById("order-options");
const CHARACTER_SETS = document.getElementById("character-sets");

let index = 0;
let timer = new Date();
let errorCounter = 0;
let characterOrder = "Sequential";

const orderOptions = new Array(
	"Sequential",
	"Random"
);

const characterSets = new Map([
	["Digits", "0123456789"],
	["Brackets", "[]{}()<>"],
	["Punctuators", `_:;!?,."'`],
	["Operators", "~@#$%^&*-+=|\\/"],
	["Letters-Uppercase", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
	["Letters-Lowercase", "abcdefghijklmnopqrstuvwxyz"]
]);

let characters = characterSets.get(Array.from(characterSets.keys())[0]).split('');

ERROR_COUNTER.textContent = errorCounter;
CHARACTER.textContent = characters[resetIndex()];
INPUT_LISTENER.addEventListener('keyup', (input) => {isCorrect(input.key.charAt())});

function isCorrect(character)
{
	if(character == characters[index]) CHARACTER.textContent = characters[getNextIndex()];
	else if(character != characters[index]) ERROR_COUNTER.textContent = ++errorCounter;
}

function populateCharacterSets()
{
	for(let i = 0; i < characterSets.size; i++)
	{
		let option = Array.from(characterSets.keys())[i];
		let element = document.createElement("option");
		element.textContent = option;
		element.value = option;
		CHARACTER_SETS.appendChild(element);
	}
}

function populateOrderOptions()
{
	for(let i = 0; i < orderOptions.length; i++)
	{
		let option = orderOptions[i];
		let element = document.createElement("option");
		element.textContent = option;
		element.value = option;
		ORDER_OPTIONS.appendChild(element);
	}
}

populateCharacterSets();
populateOrderOptions();

function reset()
{
	resetIndex();
	errorCounter = 0;
	ERROR_COUNTER.textContent = errorCounter;
	CHARACTER.textContent = characters[index];
	CHARACTER_SETS.blur();
	INPUT_LISTENER.focus();
}

function resetIndex()
{
	if(characterOrder == "Sequential") index = 0;
	else if(characterOrder == "Random") index = getRandomIndex();

	return index;
}

function getNextIndex()
{
	if(characterOrder == "Sequential")
	{
		if(index < characters.length - 1) index += 1;
		else index = 0;
	}
	else if(characterOrder == "Random") index = getRandomIndex();

	return index;
}

function getRandomIndex()
{
	return Math.floor(Math.random() * (characters.length));
}

function setOrder()
{
	ORDER_OPTIONS.value = ORDER_OPTIONS.options[ORDER_OPTIONS.selectedIndex].text;
	characterOrder = ORDER_OPTIONS.options[ORDER_OPTIONS.selectedIndex].value;
	ORDER_OPTIONS.blur();
	INPUT_LISTENER.focus();
	reset();
}

function setCharacterSet()
{
	CHARACTER_SETS.value = CHARACTER_SETS.options[CHARACTER_SETS.selectedIndex].text;
	characters = characterSets.get(CHARACTER_SETS.options[CHARACTER_SETS.selectedIndex].value).split('');
	CHARACTER.textContent = characters[0];
	CHARACTER_SETS.blur();
	INPUT_LISTENER.focus();
	reset();
}

// function startTimer()
// {
//	   timer = new Date();
//
//	   setInterval(() => {
//	   }, 1000)
// }
//
// function stopTimer()
// {
//	   return Math.floor(new Date() - timer);
// }