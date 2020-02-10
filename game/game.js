// Javascript for e28 Game assignment. Not supposed to use jQuery

// Globals
var currentRow = 1;
const colorArray = ['g', 'r', 'y', 'b', 'o', 'p'];
let finalAnswer = [];

// Define button colors and html
const r = `<button type="button" class="btn r btn-circle-large active-btn" data-color="r" onclick="changeColor(event)">Red</button>`;
const y = `<button type="button" class="btn y btn-circle-large active-btn" data-color="y" onclick="changeColor(event)">Yellow</button>`;
const b = `<button type="button" class="btn b btn-circle-large active-btn" data-color="b" onclick="changeColor(event)">Blue</button>`;
const o = `<button type="button" class="btn o btn-circle-large active-btn" data-color="o" onclick="changeColor(event)">Orange</button>`;
const p = `<button type="button" class="btn p btn-circle-large active-btn" data-color="p" onclick="changeColor(event)">Purple</button>`;
const g = `<button type="button" class="btn g btn-circle-large active-btn" data-color="g" onclick="changeColor(event)">Green</button>`;

// Silly Story Generator from Mozilla JS tutorial randomiser
function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

// When page loads
window.addEventListener('load', function () {
    // Add change color clicker to buttons
    addChangeColourListener();
    // Generate a row of code to break, default is 4
    for (let i = 0; i < 4; i++) {
        finalAnswer.push(randomValueFromArray(colorArray));
    }
    // console.log(finalAnswer)
});


function addChangeColourListener() {
    document.querySelectorAll('.active-btn').forEach(item => {
        // There is a wierd bug, if i add event listener, I cannot remove it...
        item.setAttribute('onclick', "changeColor(event)")
        //       item.addEventListener('click', event => {
        //           changeColor(event);
        //      })
    })
}


function changeColor(event) {
    // Found this on https://stackoverflow.com/questions/11741070/how-to-get-the-element-clicked-on
    let s = event.target;

    // The big switcharoo happens here
    switch (s.dataset.color) {
        case 'g':
            s.outerHTML = r;
            break;
        case 'r':
            s.outerHTML = y;
            break;
        case 'y':
            s.outerHTML = b;
            break;
        case 'b':
            s.outerHTML = o;
            break;
        case 'o':
            s.outerHTML = p;
            break;
        case 'p':
            s.outerHTML = g;
            break;
    }
}

function checkAnswer() {
    if (currentRow > 11) {
        revealAnswer();
        alert("Sorry! Try again!");
    } else {
        // Get the data
        let answer = [];
        // ES6 clone
        let copyFinalAnswer = [...finalAnswer];
        let rowOfAnswer = document.querySelectorAll(`.row${currentRow} .btn-circle-large`);
        // Remove the click function so it stops changing color on click
        rowOfAnswer.forEach(item => {
            answer.push(item.dataset.color);
            item.removeAttribute('onclick');
        });
        // Check for correct answer at correct place
        let blackMarker = 0;
        let len = 4;
        for (let i = 0; i < len; i++) {
            if (answer[i] === copyFinalAnswer[i]) {
                blackMarker += 1;
                // Remove to prevent duplicates
                answer.splice(i, 1);
                copyFinalAnswer.splice(i, 1);
                // Wierd bug that happens when you try to splice an array in iteration
                // https://stackoverflow.com/questions/56827326/weird-bug-in-javascript-splice-method/56827364
                i--;
                len--;
            }
        }
        // Check for correct answer at wrong place
        let whiteMarker = 0;
        len = answer.length;
        for (let i = 0; i < len; i++) {
            if (answer.includes(`${copyFinalAnswer[i]}`)) {
                whiteMarker += 1;
                // Remove to prevent duplicates
                answer.splice(i, 1);
                copyFinalAnswer.splice(i, 1);
                // https://stackoverflow.com/questions/56827326/weird-bug-in-javascript-splice-method/56827364
                i--;
                len--;
            }
        }
        // Check if won already
        if (blackMarker === 4) {
            revealAnswer();
            alert("You won!");
            // apparently to end js execution
            return false;
        }
        // Lets add the black and white markers
        // https://stackoverflow.com/questions/34846814/correct-way-to-break-out-of-if-statement-within-for-loop
        // Apparently cannot break in forEach
        let rowOfHints = document.querySelectorAll(`.row${currentRow} .btn-circle`);
        for (let el of rowOfHints) {
            if (blackMarker > 0) {
                el.classList.add('black');
                blackMarker -= 1;
                continue;
            } else if (whiteMarker > 0) {
                el.classList.add('white');
                whiteMarker -= 1;
                continue;
            } else {
                break;
            }
        }

        // Move the row
        currentRow += 1;
        document.querySelector(`.row${currentRow}`).classList.remove('inactive-row');
    }
}

function revealAnswer() {
    let codeRow = document.querySelectorAll(`.coderow .btn-circle-large`);
    for (let i = 0; i < 4; i++) {
        // https://stackoverflow.com/questions/5613834/convert-string-to-variable-name-in-javascript
        codeRow[i].outerHTML = eval(finalAnswer[i])
    }
}

function resetGame() {
    location.reload();
}