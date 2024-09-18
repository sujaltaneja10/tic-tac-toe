// note for self :-
// change checkWinner() logic
// created more arrow functions
// removed 'this' , bcz, it is not used in factories.
// refactored to use factories and modules efficiently.

const Player = function(name, marker) {
    return { name, marker };
}

const GameBoard = (function () {
    let arr = [];
    const rows = 3;
    const cols = 3;

    const createBoard = () => arr = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

    const printBoard = () => console.log(arr.map(e => [...e]));

    const checkEmptySpaces = () => arr.flat().includes('-');

    const putMarker = (row, col, marker) => {
        if (validMove(row, col)) arr[row][col] = marker;
    };

    const validMove = (row, col) => (arr[row][col] === '-');

    const checkWinner = () => {
        for (let i = 0; i < rows; i++) {
            if (arr[i][0] === arr[i][1] && arr[i][1] === arr[i][2] && arr[i][0] !== '-') return arr[i][0] === 'X' ? 1 : 2;
        }
        for (let i = 0; i < cols; i++) {
            if (arr[0][i] === arr[1][i] && arr[1][i] === arr[2][i] && arr[0][i] !== '-') return arr[0][i] === 'X' ? 1 : 2;
        }
        if (arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2] && arr[0][0] !== '-') return arr[0][0] === 'X' ? 1 : 2;
        if (arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0] && arr[0][2] !== '-') return arr[0][2] === 'X' ? 1 : 2;
        return 0;
    }

    return { createBoard, printBoard, checkEmptySpaces, putMarker, validMove, checkWinner };
})()

const GameController = function() {
    let inputRow = 0;
    let inputCol = 0;
    let turn = 1;

    const inputPosition = () => {
        inputRow = +prompt(`Player ${turn + 1} : ${currentPlayer().name} : Enter row number (1-3): `) - 1;
        inputCol = +prompt(`Player ${turn + 1} : ${currentPlayer().name} : Enter column number (1-3): `) - 1;
        if (!GameBoard.validMove(inputRow, inputCol)) inputPosition();
    };

    const currentPlayer = () => turn === 0 ? player1 : player2;

    const switchPlayerTurn = () => turn === 0 ? turn = 1 : turn = 0;

    const endGame = () => console.log('Thanks for playing');

    const decision = () => {
        if (GameBoard.checkWinner() === 0) {
            alert('Match is drawn');
        }
        else {
            alert(`Winner is ${currentPlayer().name}`);
        }
    }

    const askForNewGame = () => {
        inputRow = 0;
        inputCol = 0;
        turn = 0;
        ((prompt('Press "YES" for new game : ')).toLowerCase() === 'yes') ? newGame() : endGame();
    }

    const newRound = () => {
        inputPosition();
        GameBoard.putMarker(inputRow, inputCol, currentPlayer().marker);
        GameBoard.printBoard();
    }

    const newGame = () => {
        GameBoard.createBoard();
        while (GameBoard.checkEmptySpaces() && (!GameBoard.checkWinner())) {
            switchPlayerTurn();
            newRound();
        }
        decision();
        askForNewGame();
    }
    return { newGame };
}

const player1 = Player(prompt("Enter name of player 1, 'X'"), 'X');
const player2 = Player(prompt("Enter name of player 2, 'O'"), 'O');

const game = GameController();
game.newGame();