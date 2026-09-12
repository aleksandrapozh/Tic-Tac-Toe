const gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;

    const setCell = (index, marker) => {
        if(board[index]===''){
            board[index] = marker;
            return true;
        }
        else{
            return false;
        }
    };

    const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    };
    return {getBoard, setCell, reset};
})()

const createPlayer = (name, marker) => {
    return {name, marker}
}

const player1 = createPlayer('Player1', 'X')
const player2 = createPlayer('Player2', 'O')


const displayController = (() => {
  const boardElement = document.querySelector("#gameboard");
  const messageElement = document.querySelector("#message");
  const restartBtn = document.querySelector("#restart-btn");
  const p1Input = document.querySelector("#player1-input");
  const p2Input = document.querySelector("#player2-input");

  const updateMessage = (text) => {
    messageElement.textContent = text;
  };

  const updateScreen = () => {
    boardElement.innerHTML = "";
    const board = gameboard.getBoard();

    board.forEach((marker, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = index;
      cell.textContent = marker;
      boardElement.appendChild(cell);
    });
  };

  const handleBoardClick = (e) => {
    const clickedCell = e.target;
    if (!clickedCell.classList.contains("cell")) return;

    const cellIndex = Number(clickedCell.dataset.index);
    gameController.playRound(cellIndex);
    updateScreen();
  };

  restartBtn.addEventListener("click", () => {
    gameController.startNewGame(p1Input.value, p2Input.value);
  });

  boardElement.addEventListener("click", handleBoardClick);

  updateScreen();

  return { updateScreen, updateMessage };
})();

const gameController = (() => {
    let players = [player1, player2]
    let activePlayerIndex = 0;
    let isGameOver = true;

    const winningCombinations= [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    const startNewGame = (p1Name, p2Name) => {

        const name1 = p1Name.trim() !== "" ? p1Name : "Игрок 1";
        const name2 = p2Name.trim() !== "" ? p2Name : "Игрок 2";

        players = [
        createPlayer(name1, "X"),
        createPlayer(name2, "O")
        ];

        activePlayerIndex = 0;
        isGameOver = false;
        gameboard.reset(); 

        displayController.updateScreen();
        displayController.updateMessage(`Ход делает: ${getActivePlayer().name} (${getActivePlayer().marker})`);
    };

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
            displayController.updateMessage(`Success! current board: ${gameboard.getBoard()}`)
            if(checkWinner()){
                displayController.updateMessage(`Yo, ${currentPlayer.name} is won!`)
                isGameOver = true;
                return
            }

            if(checkTie()){
                displayController.updateMessage("Yo! It's tie");
                isGameOver = true;
                return;
            }

            switchTurn();
            displayController.updateMessage(`Player's turn: ${getActivePlayer().name} (${getActivePlayer().marker})`)
        }else{
            displayController.updateMessage('this cell is already occupied! Try another')
        }
    }
    displayController.updateMessage(`Player's turn: ${getActivePlayer().name} (${getActivePlayer().marker})`);
    return {playRound, startNewGame}
})();

