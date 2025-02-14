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
        } else if (board[row][col].getValue() !== '') {
            return;
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

    const playRound = (row, col) => {
        board.updateCell(row, col, getActivePlayer().value);
        switchPlayerTurn();
        printNewRound();
    };

    printNewRound()

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