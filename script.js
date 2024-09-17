const GameBoard = (function () {
        this.arr = [];
        this.rows = 3;
        this.cols = 3;
        this.inputRow = 0;
        this.inputCol = 0;
        this.turn = 1;
        this.player = [
            {
                name : 'Player 1',
                marker : 'X'
            },
            {
                name : 'Player 2',
                marker : 'O'
            }
        ]
        const inputPlayerInfo = function() {
            for (let i=0; i<2; i++) {
                this.player[i].name = prompt(`Enter player name for player '${i + 1}' : `);
            }
        }
        const createBoard = function () {
            this.arr = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
        }
        const printBoard = function () {
            const newArr = this.arr.map(e => [...e]);
            console.log(newArr);
        }
        const inputPosition = function() {
            this.inputRow = +prompt(`Player ${this.turn + 1} Enter row number : `) - 1;
            this.inputCol = +prompt(`Player ${this.turn + 1} Enter column number : `) - 1;
            if (!validMove()) inputPosition();
        };
        const switchPlayerTurn = function() {
            if (this.turn == 0) this.turn = 1;
            else this.turn = 0;
        }
        const putMarker = function () {
            this.arr[this.inputRow][this.inputCol] = player[this.turn].marker;
        }
        const newGame = function () {
            createBoard();
            inputPlayerInfo();
            while (checkEmptySpaces() && (!checkWinner())) {
                switchPlayerTurn();
                newRound();
            }
            decision();
            this.inputRow = 0;
            this.inputCol = 0;
            this.turn = 0;
            ((prompt('Press "YES" for new game : ')).toLowerCase === 'yes') ? newGame() : endGame();
        }
        const checkEmptySpaces = function () {
            for (let i=0; i<rows; i++) {
                for (let j=0; j<cols; j++) {
                    if (this.arr[i][j] == '-') return 1;
                }
            }
            return 0;
        }
        const decision = function() {
            if (checkWinner() == 1 || checkWinner() == 2) {
                alert(`Winner is ${this.player[checkWinner()-1].name}`);
            }
            else {
                alert('Math is drawn');
            }
        }
        const validMove = function () {
            if (this.arr[this.inputRow][this.inputCol] === '-') return 1;
            else return 0;
        }
        const newRound = function () {
            inputPosition();
            putMarker();
            printBoard();
        }
        const endGame = function() {
            console.log('Thanks for playing');
        }
        const checkWinner = function () {
            // return 1 if winner found, else zero.
            
            // check for rows.
            for (let i=0; i<rows; i++) {
                let sum = '';
                for (let j=0; j<cols; j++) {
                    sum += arr[i][j];
                }
                if (sum == 'XXX') return 1;
                else if (sum === 'OOO') return 2;
                else continue;
            }

            // check for columns
            for (let i=0; i<cols; i++) {
                let sum = '';
                for (let j=0; j<rows; j++) {
                    sum += arr[j][i];
                }
                if (sum == 'XXX') return 1;
                else if (sum === 'OOO') return 2;
                else continue;
            }

            // check for diagonals.
            let sum = '';
            for (let i=0; i<rows; i++) {
                for (let j=0; j<cols; j++) {
                    if (i === j) sum += arr[i][j];
                }
            }
            if (sum == 'XXX') return 1;
            if (sum === 'OOO') return 2;

            // check for other diagonal.
            sum = '';
            for (let i=0; i<rows; i++) {
                for (let j=0; j<cols; j++) {
                    if (i + j === 4) sum += arr[i][j];
                }
            }
            if (sum == 'XXX') return 1;
            if (sum === 'OOO') return 2;

            // else.
            return 0;

        }
        newGame();
})()