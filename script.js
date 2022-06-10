const INPUT = document.querySelector('body');
const CHARACTER = document.getElementById('character');
const CHARACTER_SETS = document.getElementById("character-sets");

let index = 0;
let iterations = 0;
let incorrect = 0;

const characterSets = new Map([
    ["Digits", "0123456789"],
    ["Bracket", "[]{}()<>"],
    ["Puncuators", `_:;!?,."'`],
    ["Operators", "~@#$%^&/*-+=|"],
    ["Letters", "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"]
]);

let characters = characterSets.get(Array.from(characterSets.keys())[0]).split('');

CHARACTER.textContent = characters[0];
INPUT.addEventListener('keyup', (input) => {isCorrect(input.key.charAt())});

function isCorrect(character)
{
    if(character == characters[index]) CHARACTER.textContent = characters[++index];
    else if(character != characters[index]) incorrect++;

    if(index >= characters.length && iterations == 0)
    {
        console.log('Finished');
    }
}

function populate()
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

populate();

function selectSet()
{
    index = 0;
    iterations = 0;
    incorrect = 0;
    document.getElementById("character-sets").value = CHARACTER_SETS.options[CHARACTER_SETS.selectedIndex].text;
    characters = characterSets.get(CHARACTER_SETS.options[CHARACTER_SETS.selectedIndex].value).split('');
    CHARACTER.textContent = characters[0];
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