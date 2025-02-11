// 


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

    return { getBoard, updateCell};
}