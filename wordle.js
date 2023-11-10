// Initialize current row and column
let curRow = 0;
let curCol = 0;

// Select the main element
const main = document.querySelector('#main');

// Create rows and columns
for (let i = 0; i < 6; i++) {
    const row = document.createElement('div');
    row.classList.add('row', `r${i}`);
    for (let j = 0; j < 5; j++) {
        const col = document.createElement('div');
        col.id = `r${i}c${j}`;
        row.appendChild(col);
    }
    main.appendChild(row);
}

// Function to fetch a random word
async function getRandomWord() {
    const response = await fetch("https://random-word-api.herokuapp.com/word?length=5");
    const data = await response.json();
    return data;
}

// Fetch a random word and attach event listeners
getRandomWord().then(randomWord => {
    const word = randomWord.toString()
    console.log(word);
    attachListener(curRow, curCol);
    document.querySelector('#enterBtn').addEventListener('click', () => {
        if (curCol > 4) {
            const userWord = getWord(curRow);
            if (checkWord(word.toLowerCase(), userWord.toLowerCase(), curRow)) {
                document.querySelector('#heading').textContent = "You Won!"
                return;
            }
            if (curRow >= 5) {
                document.querySelector('#heading').textContent = "You Lose!"
                return;
            }
            curRow++;
            curCol = 0;
            attachListener(curRow, curCol);
        } else {
            alert("Please fill the whole row!");
        }
    });
}).catch(error => {
    console.log(`ERROR: ${error}`);
});

// Function to attach keypress event listener
function attachListener(row, col) {
    const handler = (event) => {
        document.querySelector(`#r${row}c${col}`).textContent = event.key.toUpperCase();
        curCol++;
        if (curCol > 4) {
            document.removeEventListener('keypress', handler);
            return;
        }
        document.removeEventListener('keypress', handler);
        if (curRow <= 5 && curCol <= 4) {
            attachListener(curRow, curCol);
        }
    }
    document.addEventListener('keypress', handler);
}

// Function to get the word from the row
function getWord(row) {
    let word = "";
    document.querySelectorAll(`.r${row} > div`).forEach(box => {
        word += box.textContent.trim();
    })
    return word;
}

// Function to check the user's word against the actual word
function checkWord(actualWord, word, row) {
    const actualWordArr = actualWord.split('');
    const wordArr = word.split('');
    for (let i = 0; i < actualWordArr.length; i++) {
        let box = document.querySelector(`#r${row}c${i}`);
        if (actualWordArr[i] === wordArr[i]) {
            box.style.background = 'green';
        } else if (actualWordArr.indexOf(wordArr[i]) != -1) {
            box.style.background = 'yellow';
        } else {
            box.style.background = '#999';
        }
    }
    return actualWord === word;
}