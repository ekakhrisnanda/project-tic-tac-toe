function GameBoard() {

    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const getBoard = () => board;

    const updateCell = (row, col, player) => {
        if(board[row][col] === '') {
            board[row][col] === player;
            return true;
        }
        return false;
    }

    return { getBoard, updateCell };
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

    const playRound = (row, col) => {
        board.updateCell(row, col, getActivePlayer().value);
        switchPlayerTurn();
    }

    return { switchPlayerTurn, getActivePlayer, playRound };
}