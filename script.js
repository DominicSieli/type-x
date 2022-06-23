const INPUT = document.querySelector('body');
const INCORRECT_COUNTER = document.getElementById('incorrect-counter');
const CHARACTER = document.getElementById('character');
const ORDER_OPTIONS = document.getElementById("order-options");
const CHARACTER_SETS = document.getElementById("character-sets");

let index = 0;
let timer = new Date();
let incorrectCounter = 0;
let characterOrder = "Sequential";

const orderOptions = new Array(
    "Sequential",
    "Random"
);

const characterSets = new Map([
    ["Digits", "0123456789"],
    ["Bracket", "[]{}()<>"],
    ["Puncuators", `_:;!?,."'`],
    ["Operators", "~@#$%^&/*-+=|"],
    ["Letters-Upper", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
    ["Letters-Lower", "abcdefghijklmnopqrstuvwxyz"]
]);

let characters = characterSets.get(Array.from(characterSets.keys())[0]).split('');

INCORRECT_COUNTER.textContent = incorrectCounter;
CHARACTER.textContent = characters[resetIndex()];
INPUT.addEventListener('keyup', (input) => {isCorrect(input.key.charAt())});

function isCorrect(character)
{
    if(character == characters[index]) CHARACTER.textContent = characters[getNextIndex()];
    else if(character != characters[index]) INCORRECT_COUNTER.textContent = ++incorrectCounter;
}

function populateCharacters()
{
    for(let i = 0; i < characterSets.size; i++)
    {
        let opt = Array.from(characterSets.keys())[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        CHARACTER_SETS.appendChild(el);
    }
}

function populateOrderOptions()
{
    for(let i = 0; i < orderOptions.length; i++)
    {
        let opt = orderOptions[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        ORDER_OPTIONS.appendChild(el);
    }
}

populateCharacters();
populateOrderOptions();

function reset()
{
    resetIndex();
    incorrectCounter = 0;
    INCORRECT_COUNTER.textContent = incorrectCounter;
    CHARACTER.textContent = characters[index];
    CHARACTER_SETS.blur();
    INPUT.focus();
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

function changeOrder()
{
    ORDER_OPTIONS.value = ORDER_OPTIONS.options[ORDER_OPTIONS.selectedIndex].text;
    characterOrder = ORDER_OPTIONS.options[ORDER_OPTIONS.selectedIndex].value;
    ORDER_OPTIONS.blur();
    INPUT.focus();
    reset();
}

function selectSet()
{
    CHARACTER_SETS.value = CHARACTER_SETS.options[CHARACTER_SETS.selectedIndex].text;
    characters = characterSets.get(CHARACTER_SETS.options[CHARACTER_SETS.selectedIndex].value).split('');
    CHARACTER.textContent = characters[0];
    CHARACTER_SETS.blur();
    INPUT.focus();
    reset();
}

// function startTimer()
// {
//     timer = new Date();
//
//     setInterval(() => {
//     }, 1000)
// }
//
// function stopTimer()
// {
//     return Math.floor(new Date() - timer);
// }