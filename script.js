const INPUT = document.querySelector('body');
const INCORRECT = document.getElementById('incorrect');
const CHARACTER = document.getElementById('character');
const ORDER_OPTIONS = document.getElementById("order-options");
const CHARACTER_SETS = document.getElementById("character-sets");

let index = 0;
let incorrect = 0;
let order = "Sequential";

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

INCORRECT.textContent = incorrect;
CHARACTER.textContent = characters[resetIndex()];
INPUT.addEventListener('keyup', (input) => {isCorrect(input.key.charAt())});

function isCorrect(character)
{
    if(character == characters[index]) CHARACTER.textContent = characters[getNextIndex()];
    else if(character != characters[index]) INCORRECT.textContent = ++incorrect;
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
    incorrect = 0;
    INCORRECT.textContent = incorrect;
    CHARACTER.textContent = characters[index];
    CHARACTER_SETS.blur();
    INPUT.focus();
}

function resetIndex()
{
    if(order == "Sequential") index = 0;
    else if(order == "Random") index = getRandomIndex();

    return index;
}

function getNextIndex()
{
    if(order == "Sequential")
    {
        if(index < characters.length - 1) index += 1;
        else index = 0;
    }
    else if(order == "Random") index = getRandomIndex();

    return index;
}

function getRandomIndex()
{
    return Math.floor(Math.random() * (characters.length));
}

function changeOrder()
{
    ORDER_OPTIONS.value = ORDER_OPTIONS.options[ORDER_OPTIONS.selectedIndex].text;
    order = ORDER_OPTIONS.options[ORDER_OPTIONS.selectedIndex].value;
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

// let startTimer;

// function timer()
// {
//     startTimer = new Date();

//     setInterval(() => {
//     }, 1000)
// }

// function getTimerTime()
// {
//     return Math.floor((new Date() - startTimer) / 1000);
// }