const gameController = (function () {
    let _board = ["", "", "", "", "", "", "", "", ""];

    const makeMoves = function () {
        this.innerText = "O";
        _board[this.dataset.id] = "O";
        let winner = null;
        if (_checkWinner()) {
            winner = "You";
        } else {
            _computerMove.apply(this);
            if (_checkWinner()) {
                winner = "Computer";
            }
        }
        // Display a winner message
        if (winner)
            displayController.showAlert(`${winner} won the game`, "success");
        return;
    };
    const renderBoard = function () {
        const grid = document.createElement("div");
        grid.classList.add("game-board");

        document.querySelector("main").appendChild(grid);

        const gridCells = _board.map((elem, index) => {
            const cell = document.createElement("div");
            cell.innerText = elem;
            cell.dataset.id = index;

            cell.classList.add("cell");
            cell.addEventListener("click", makeMoves, { once: true });

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
    const _computerMove = function () {
        const emptyGridCells = [];
        _board.forEach((elem, index) => {
            if (elem === "") emptyGridCells.push(index);
        });
        const move = Math.min(...emptyGridCells);

        _board[move] = "X";
        Array.from(document.querySelector(".game-board").children).forEach(
            (elem, index) => {
                if (elem.dataset.id === String(move)) elem.innerText = "X";
            }
        );
    };
    const _removeAllBinds = function () {
        const gridCells = document.querySelector(".game-board").children;
        Array.from(gridCells).forEach((node) => {
            node.removeEventListener("click", makeMoves);
        });
    };
    const _checkWinner = function (currentPlayer) {
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
            // Remove all binds   i.e stop the game
            _removeAllBinds();
            return true;
        } else if (
            _board[0] &&
            _board[1] &&
            _board[2] &&
            _board[3] &&
            _board[4] &&
            _board[5] &&
            _board[6] &&
            _board[7] &&
            _board[8]
        ) {
            _removeAllBinds();
            displayController.showAlert("Its a tie!");
        }
    };
    return { renderBoard, restartGame };
})();
// Display module
const displayController = (function () {
    const showAlert = function (message, alertType = "info") {
        const alert = document.createElement("div");
        const textElement = document.createElement("p");

        const alertColor = alertType === "success" ? "#00be7f" : "deepskyblue";
        alert.classList.add("alert");
        alert.style.backgroundColor = alertColor;
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
    gameController.renderBoard();

    // Greeting user
    displayController.showAlert(`Welcome! ${player.name}`);

    // Some dom stuff
    document.querySelector("#start-game").style.display = "none";
    document.querySelector("#restart-game").style.display = "block";
    document.querySelector(".user-data").style.display = "none";
};
const restartGame = function () {
    const player = Player(username);
    gameController.restartGame();
};
