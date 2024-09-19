// note for self :-
// change checkWinner() logic
// created more arrow functions
// removed 'this' , bcz, it is not used in factories.
// modules are accessed directly from oytside. ex: 'gameBoard.validMove()'
// factories are accessed like functions, by creating a variable and storing them.
// refactored to use factories and modules efficiently.

const Player = function(name, marker) {
    return { name, marker };
}

const GameBoard = (function () {
    let arr = [];
    const rows = 3;
    const cols = 3;
    let turn = 0;

    let grid, child, resetBtn, backBtn, playerTurn;

    const createBoard = () => arr = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

    const currentPlayer = () => turn === 0 ? player1 : player2;

    const switchPlayerTurn = () => turn = turn === 0 ? 1 : 0;

    const updatePlayerBoard = () => {
        playerTurn.textContent = `${currentPlayer().name}'s Turn`;
    }

    const addHtml = () => {
        grid = document.querySelector('.grid');
        child = document.querySelectorAll('.child');
        resetBtn = document.querySelector('.reset');
        backBtn = document.querySelector('.back');
        playerTurn = document.querySelector('.playerTurn');
    }

    const inputPosition = () => {
        updatePlayerBoard()
        child.forEach((element, index) => {
            element.addEventListener('click', () => {
                const row = Math.floor(index / 3);
                const col = index % 3;
                if (validMove(row, col)) {
                    putMarker(row, col, currentPlayer().marker);
                    element.textContent = currentPlayer().marker;
                }
                if (decision()) return;
            })
        });
    }

    const checkEmptySpaces = () => arr.flat().includes('-');

    const putMarker = (row, col, marker) => arr[row][col] = marker;

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

    const decision = () => {
        const winner = checkWinner();
        if (showDecision(winner)) return 1;
        else {
            switchPlayerTurn();
            updatePlayerBoard();
        }
    };

    const showDecision = (winner) => {
        if (winner !== 0) {
            playerTurn.textContent = `Winner is ${winner === 1 ? player1.name : player2.name}`;
            return 1;
        }
        if (!checkEmptySpaces()) {
            playerTurn.textContent = 'Match is drawn';
            return 1;
        }
    }

    const reset = () => {
        resetBtn.addEventListener('click', () => {
            createBoard();
            child.forEach(cell => {
                cell.textContent = '';
            });
            turn = 0;
            updatePlayerBoard();
        });
    }

    return { createBoard, inputPosition, addHtml, reset };
})()

const GameController = function() {
    const newGame = () => {
        GameBoard.createBoard();
        GameBoard.addHtml();
        GameBoard.inputPosition();
        GameBoard.reset();
    }
    return { newGame };
}

const player1Name = localStorage.getItem('player1');
const player2Name = localStorage.getItem('player2');

const player1 = Player(player1Name, 'X');
const player2 = Player(player2Name, 'O');

const game = GameController();
game.newGame();