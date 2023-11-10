/**
 * Wordle game implementation in JavaScript.
 */

// Initialize current row and column
let curRow = 0;
let curCol = 0;

// Select the main element
const main = document.querySelector('#main');
startGame()

/**
 * Function to draw the game grid.
 */
function drawGrid() {
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
}

/**
 * Function to fetch a random word from an API.
 * @returns {Promise<string>} A promise that resolves to a random word.
 */
async function getRandomWord() {
    const response = await fetch("https://random-word-api.herokuapp.com/word?length=5");
    const data = await response.json();
    return data;
}

/**
 * Function to handle the game logic.
 */
function handleGame() {
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
                    document.querySelector('#heading').innerHTML = `You Lose!<br>The word was ${word}`;
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
}

/**
 * Function to attach keypress event listener.
 * @param {number} row - The row number.
 * @param {number} col - The column number.
 */
function attachListener(row, col) {
    const handler = (event) => {
        const box = document.querySelector(`#r${row}c${col}`);
        box.textContent = event.key.toUpperCase();
        box.classList.add('glow');
        setTimeout(() => { box.classList.remove('glow') }, 200);
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

/**
 * Function to get the word from the row.
 * @param {number} row - The row number.
 * @returns {string} The word from the row.
 */
function getWord(row) {
    let word = "";
    document.querySelectorAll(`.r${row} > div`).forEach(box => {
        word += box.textContent.trim();
    })
    return word;
}

/**
 * Function to check the user's word against the actual word.
 * @param {string} actualWord - The actual word.
 * @param {string} word - The user's word.
 * @param {number} row - The row number.
 * @returns {boolean} True if the user's word matches the actual word, false otherwise.
 */
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
            box.style.background = '#B4B4B3';
        }
    }
    return actualWord === word;
}

/**
 * Function to start the game.
 */
function startGame() {
    main.innerHTML = '';
    drawGrid();
    handleGame();
}