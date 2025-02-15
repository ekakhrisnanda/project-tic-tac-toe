function GameBoard() {
    const board = [
        [Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell()]
    ];

    const getBoard = () => board;

    const updateCell = (row, col, player) => {
        if(board[row][col].getValue() === '') {
            board[row][col].addValue(player);
            return true;
        }
        return false;
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return { getBoard, updateCell, printBoard };
}

function Cell() {
    let value = '';

    const addValue = (player) => {
        value = player;
    }

    const getValue = () => value;

    return { addValue, getValue };
}

function GameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    const board = GameBoard();

    const players = [
        {
            name: playerOneName,
            value: 'O'
        },
        {
            name: playerTwoName,
            value: 'X'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };

    let gameOver = false;

    const checkWinner = () => {
        const currentBoard = board.getBoard();

        for(let i = 0; i < currentBoard.length; i++) {
            // check row
            if (currentBoard[i][0].getValue() !== '' &&
                currentBoard[i][0].getValue() === currentBoard[i][1].getValue() &&
                currentBoard[i][1].getValue() === currentBoard[i][2].getValue()
            ) {
                if(currentBoard[i][0].getValue() === getActivePlayer().value) {
                    gameOver = true;
                    return getActivePlayer().name;
                }
            }

            // check column
            if (currentBoard[0][i].getValue() !== '' &&
                currentBoard[0][i].getValue() === currentBoard[1][i].getValue() &&
                currentBoard[1][i].getValue() === currentBoard[2][i].getValue()
            ) {
                if(currentBoard[0][i].getValue() === getActivePlayer().value) {
                    gameOver = true;
                    return getActivePlayer().name;
                }
            }
        }

        // check top-left to bottom-right diagonal
        if (currentBoard[0][0].getValue() !== '' &&
            currentBoard[0][0].getValue() === currentBoard[1][1].getValue() &&
            currentBoard[1][1].getValue() === currentBoard[2][2].getValue()
        ) {
            if(currentBoard[0][0].getValue() === getActivePlayer().value) {
                gameOver = true;
                return getActivePlayer().name;
            }
        }

        // check top-right to bottom-left diagonal
        if (currentBoard[0][2].getValue() !== '' &&
            currentBoard[0][2].getValue() === currentBoard[1][1].getValue() &&
            currentBoard[1][1].getValue() === currentBoard[2][0].getValue()
        ) {
            if(currentBoard[0][2].getValue() === getActivePlayer().value) {
                gameOver = true;
                return getActivePlayer().name;
            }            
        }
    }

    const playRound = (row, col) => {
        if (gameOver) {
            return;
        } else if (board.updateCell(row, col, getActivePlayer().value)){
            const winner = checkWinner();

            if (winner) {
                console.log(`${winner} wins!`);
                return;
            }
            switchPlayerTurn();
            printNewRound();
        }
    };

    return { 
        playRound, 
        getActivePlayer, 
        getBoard: board.getBoard 
    };
}

function GamePlay() {
    const game = GameController();
    const playerTurnDisplay = document.querySelector('.turn');
    const boardDisplay = document.querySelector('.board');

    const updateDisplay = () => {
        boardDisplay.textContent = '';

        // get the newest version of the board
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        playerTurnDisplay.textContent = `${activePlayer.name}'s turn`

        board.forEach((row, index) => {
            const rowString = document.createElement('div');
            rowString.classList.add('row');
            rowString.dataset.row = index;
            boardDisplay.appendChild(rowString);

            row.forEach((column, index) => {
                const cell = document.createElement('button');
                cell.classList.add('cell');
                cell.dataset.column = index;
                cell.textContent = column.getValue();
                rowString.appendChild(cell);
            })
        })
    }

    function clickHandlerBoard(e) {
        const selectedRow = e.target.closest('[data-row]').dataset.row;
        const selectedColumn = e.target.closest('[data-column]').dataset.column;

        if (!selectedRow && !selectedColumn) {
            return;
        }

        game.playRound(selectedRow, selectedColumn);
        updateDisplay();
    }

    boardDisplay.addEventListener('click', clickHandlerBoard);
    
    updateDisplay();
}

GamePlay();