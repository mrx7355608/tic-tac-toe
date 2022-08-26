const gameController = function (player) {
    let _board = ["", "", "", "", "", "", "", "", ""];
    let _turn = "computer";

    const renderBoard = function () {
        const grid = document.createElement("div");
        grid.classList.add("game-board");

        document.querySelector("main").appendChild(grid);

        const gridCells = _board.map((elem, index) => {
            const cell = document.createElement("div");
            cell.innerText = elem;
            cell.dataset.id = index;

            cell.classList.add("cell");
            cell.addEventListener("click", addMark, { once: true });

            return cell;
        });
        document.querySelector(".game-board").append(...gridCells);
    };
    const restartGame = function () {
        // Removing old grid
        document.querySelector(".game-board").remove();
        // Resetting board
        _board = ["", "", "", "", "", "", "", "", ""];
        // Rendering board again
        renderBoard();
    };
    const addMark = function () {};
    const _checkWinner = function () {
        if (
            (_board[0] && _board[0] === _board[1] && _board[1] === _board[2]) ||
            (_board[3] && _board[3] === _board[4] && _board[4] === _board[5]) ||
            (_board[6] && _board[6] === _board[7] && _board[7] === _board[8]) ||
            (_board[0] && _board[0] === _board[3] && _board[3] === _board[6]) ||
            (_board[1] && _board[1] === _board[4] && _board[4] === _board[7]) ||
            (_board[2] && _board[2] === _board[5] && _board[5] === _board[8]) ||
            (_board[0] && _board[0] === _board[4] && _board[4] === _board[8]) ||
            (_board[2] && _board[2] === _board[4] && _board[4] === _board[6])
        ) {
            console.log("We have a winner!");
        }
    };
    const _computerMove = function () {
        // Filter out indexes of empty boxes in board
        const emptyIndexes = [];
        _board.forEach((elem, index) => {
            if (elem === "") emptyIndexes.push(index);
        });
        // Generate a random number
        // const limit = Math.max(...emptyIndexes);
        // console.log("limit: ", limit);
        // const randomNumber = Math.floor(Math.random() * limit);
        // console.log(randomNumber);
        // Use the random number to choose an index from array
        const moveIndex = Math.min(...emptyIndexes);
        return moveIndex;
    };
    return { renderBoard, restartGame };
};
// Display module
const displayController = (function () {
    const showAlert = function (message) {
        const alert = document.createElement("div");
        const textElement = document.createElement("p");

        alert.classList.add("alert");
        textElement.innerText = message;

        alert.appendChild(textElement);
        document.body.appendChild(alert);

        setTimeout(() => alert.remove(), 2000);
    };
    return { showAlert };
})();

// Player factory function
const Player = function (name) {
    const mark = "O";
    return { name, mark };
};

let username;

const startGame = function () {
    // Create Player
    username = document.querySelector("#userName").value || "Guest";
    const player = Player(username);

    // Initializing game
    const game = gameController(player);
    game.renderBoard();

    // Greeting user
    displayController.showAlert(`Welcome! ${username}`);

    // Some dom stuff
    document.querySelector("#start-game").style.display = "none";
    document.querySelector("#restart-game").style.display = "block";
    document.querySelector(".user-data").style.display = "none";
};
const restartGame = function () {
    const player = Player(username);
    const game = gameController(player);
    game.restartGame();
};
