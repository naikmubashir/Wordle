let curRow = 0;
let curCol = 0;

async function getRandomWord() {
    const response = await fetch("https://random-word-api.herokuapp.com/word?length=5");
    const data = await response.json();
    return data;
}

getRandomWord().then(randomWord => {
    const word = randomWord.toString()
    console.log(word);
    attachListener(curRow, curCol);
    document.querySelector('#enterBtn').addEventListener('click', () => {
        const userWord = getWord(0);
        checkWord(word.toLowerCase(), userWord.toLowerCase(), 0);
    })
}).catch(error => {
    console.log(`ERROR: ${error}`);
});


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

function getWord(row) {
    let word = "";
    document.querySelectorAll(`.r${row} > div`).forEach(box => {
        word += box.textContent.trim();
    })
    return word;
}

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
}
