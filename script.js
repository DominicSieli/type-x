const TEXT = document.getElementById('text');
const INPUT = document.getElementById('input');
const TIMER = document.getElementById('timer');

let text = "";

const digits = "0123456789";
const brackets = "[]{}()<>";
const quotations = `""''`;
const punctuators = ":;!?,.";
const operators = "~@#$%^&/*-+=|";
const letters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

text = all;

INPUT.addEventListener('input', () => {
    const textArray = TEXT.querySelectorAll('span');
    const textValue = INPUT.value.split('');

    let correct = true;

    textArray.forEach((characterSpan, index) => {
        const character = textValue[index];

        if(character == null)
        {
            correct = false;
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
        }
        else if(character === characterSpan.innerText)
        {
            correct = true;
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        }
        else if(character !== characterSpan.innerText)
        {
            correct = false;
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
        }
    })

    if(correct == true) console.log('Finished');
})

async function render()
{
    TEXT.innerHTML = '';
    text.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        TEXT.appendChild(characterSpan)
    });

    timer();
    TEXT.value = null;
}

let startTimer;

function timer()
{
    TIMER.innerText = 0;
    startTimer = new Date();

    setInterval(() => {
        TIMER.innerText = getTimerTime();
    }, 1000)
}

function getTimerTime()
{
    return Math.floor((new Date() - startTimer) / 1000);
}

render();