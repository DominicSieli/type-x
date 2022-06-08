const TEXT = document.getElementById('text');
const INPUT = document.getElementById('input');
const TIMER = document.getElementById('timer');

let text = "";

const numbers = "123456789";
const brackets = `[] {} () <> "" ''`;
const punctuation = "! , . ? ; : '";
const operators = "- + / * = | & ^ % $ # @";
const letters = "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz";

text = numbers;

INPUT.addEventListener('input', () => {
    const array = TEXT.querySelectorAll('span');
    const value = INPUT.value.split('');

    let correct = true;

    array.forEach((characterSpan, index) => {
        const character = value[index];

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
        else
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
        characterSpan.classList.add('correct')
        characterSpan.innerText = character
        TEXT.appendChild(characterSpan)
    });

    TEXT.value = null;
    timer();
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