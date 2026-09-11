const Gameboard = (() => {
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

const Player = {

}