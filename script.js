const gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;

    const setCell = (index, marker) => {
        if(board[index]===''){
            board[index] = marker;
            return true;
        }
        else{
            return false;
        }
    }
    return {getBoard, setCell};
})()

const createPlayer = (name, marker) => {
    return {name, marker}
}

const player1 = createPlayer('Player1', 'X')
const player2 = createPlayer('Player2', 'O')

const gameController = (() => {
    const players = [player1, player2]
    let activePlayerIndex = 0;

    const getActivePlayer = () => players[activePlayerIndex]

    const switchTurn = () => {
        activePlayerIndex = activePlayerIndex === 0? 1: 0;
    }

    const playRound = (cellIndex) => {
        const currentPlayer = getActivePlayer();
        console.log(`${currentPlayer.name} moves to the cell ${cellIndex}`)

        const wasSuccessful = gameboard.setCell(cellIndex, currentPlayer.marker)

        if(wasSuccessful){
            console.log(`Success! current board: ${gameboard.getBoard()}`)
            switchTurn();
        }else{
            console.log('this cell is already occupied! Try another')
        }
    }

    return {playRound}
})();

