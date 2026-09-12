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





const displayController = (() => {
    const boardElement = document.getElementById('gameboard')
    const messageElement = document.getElementById('message')

    const updateMessage = (text) => {
        messageElement.textContent = text;
    }

    const updateScreen = () => {

        boardElement.innerHTML = '';
        const board = gameboard.getBoard();

        board.forEach((marker, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell')
            cell.dataset.index = index
            cell.textContent = marker;
            boardElement.appendChild(cell);
        });
    };

    const handleBoardClick = (e) => {
        const clickedCell = e.target;
        if(!clickedCell.classList.contains('cell')) return;
        const cellIndex = Number(clickedCell.dataset.index);
        gameController.playRound(cellIndex);
        updateScreen();
    };

    boardElement.addEventListener('click', handleBoardClick);

    updateScreen();

    
    return {updateScreen, updateMessage};
})();

const gameController = (() => {
    const players = [player1, player2]
    let activePlayerIndex = 0;
    let isGameOver = false;

    const winningCombinations= [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    const getActivePlayer = () => players[activePlayerIndex]

    const switchTurn = () => {
        activePlayerIndex = activePlayerIndex === 0? 1: 0;
    }

    const checkWinner = () => {
        const board = gameboard.getBoard();

        for (let combo of winningCombinations){
            const [a, b, c] = combo

            if(board[a] !=="" && board[a]===board[b] && board[a]===board[c]){
                return true
            }
        }
        return false 
    }

    const checkTie = () => {
        const board = gameboard.getBoard();
        return !board.includes('');
    }

    const playRound = (cellIndex) => {
        if(isGameOver){
            console.log('Game is over! Start new game');
            return ;
        }
        const currentPlayer = getActivePlayer();
        console.log(`${currentPlayer.name} moves to the cell ${cellIndex}`)

        const wasSuccessful = gameboard.setCell(cellIndex, currentPlayer.marker)

        if(wasSuccessful){
            console.log(`Success! current board: ${gameboard.getBoard()}`)
            if(checkWinner()){
                console.log(`Yo, ${currentPlayer.name} is won!`)
                isGameOver = true;
                return
            }

            if(checkTie()){
                console.log("Yo! It's tie");
                isGameOver = true;
                return;
            }

            switchTurn();
            displayController.updateMessage(`Player's turn: ${getActivePlayer().name} (${getActivePlayer().marker})`)
        }else{
            console.log('this cell is already occupied! Try another')
        }
    }
    displayController.updateMessage(`Player's turn: ${getActivePlayer().name} (${getActivePlayer().marker})`);
    return {playRound}
})();

