# Wordle Game

This is a simple implementation of the popular Wordle game in JavaScript.

## How to Play

The game generates a random 5-letter word. The player's goal is to guess this word. After each guess, the game provides feedback:

- If a letter is correct and in the right position, its box turns green.
- If a letter is correct but in the wrong position, its box turns yellow.
- If a letter is incorrect, its box turns gray.

The player has 6 attempts to guess the word. If the player guesses the word within these attempts, they win. Otherwise, they lose.

## Implementation

The game is implemented in pure JavaScript, with no external libraries. It uses the Fetch API to get random words from an API.

The game logic is handled by several functions:

- `drawGrid()`: Draws the game grid.
- `getRandomWord()`: Fetches a random word from an API.
- `handleGame()`: Handles the game logic.
- `attachListener()`: Attaches a keypress event listener to the input boxes.
- `getWord()`: Gets the word from the current row.
- `checkWord()`: Checks the player's word against the actual word.
- `startGame()`: Starts the game.

## Running the Game

[GitHub Pages Deployment](https://naikmubashir.github.io/Wordle/)


## License

This project is licensed under the MIT License.