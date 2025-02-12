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
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
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

    return { switchPlayerTurn, getActivePlayer };
}
