const gameController = (function () {
    let _board = ["", "", "", "", "", "", "", "", ""];

    const makeMoves = function () {
        let winner = null;

        // Player's move
        this.innerText = "O";
        _board[this.dataset.id] = "O";

        const isPlayerWinner = _checkWinner();
        if (isPlayerWinner) {
            // If player won, we changed the `winner` from "null" to "You"
            // Changing the winner to "You" will assist in displaying winner message
            winner = "You";
        } else {
            // If player does not won the game, Computer will make his move
            _computerMove.apply(this);

            const isComputerWinner = _checkWinner();
            if (isComputerWinner) {
                // If computer won, we changed the `winner` from "null" to "Computer"
                winner = "Computer";
            }
        }
        // Display a winner message, if there is a one (default: null)
        if (winner)
            displayController.showAlert(`${winner} won the game`, "success");
        return;
    };
    const renderBoard = function () {
        // Creating a grid container
        const grid = document.createElement("div");
        grid.classList.add("game-board");

        // Appending grid in DOM
        document.querySelector("main").appendChild(grid);

        // Creating grid cells / boxes
        const gridCells = _board.map((elem, index) => {
            const cell = document.createElement("div");
            cell.innerText = elem;
            cell.dataset.id = index;

            cell.classList.add("cell");
            cell.addEventListener("click", makeMoves, { once: true });

            return cell;
        });

        // Appending the grid cells in the grid container
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
        // Collecting indexes of empty cells on the grid
        const emptyGridCells = [];
        _board.forEach((elem, index) => {
            if (elem === "") emptyGridCells.push(index);
        });

        // Choosing the minimum index value
        const move = Math.min(...emptyGridCells);

        // Making move
        _board[move] = "X";
        Array.from(document.querySelector(".game-board").children).forEach(
            (elem) => {
                // Changing the text value of the chosen grid cell in DOM
                if (elem.dataset.id === String(move)) {
                    elem.innerText = "X";
                    elem.removeEventListener("click", makeMoves);
                }
            }
        );
    };
    const _removeAllBinds = function () {
        // Fetching all grid cells
        const gridCells = document.querySelector(".game-board").children;
        // Removing the event listeners
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
        // Creating alert and a text container
        const alert = document.createElement("div");
        const textElement = document.createElement("p");

        // Choosing a color based on alert type (default: info)
        const alertColor = alertType === "success" ? "#00be7f" : "deepskyblue";
        alert.classList.add("alert");
        alert.style.backgroundColor = alertColor;

        textElement.innerText = message;

        // Appending the elements to DOM
        alert.appendChild(textElement);
        document.body.appendChild(alert);

        // Setting a timeout to remove the alert container
        setTimeout(() => alert.remove(), 4000);
    };
    return { showAlert };
})();

const startGame = function () {
    // Create Player
    const username = document.querySelector("#userName").value || "Guest";

    // Initializing game
    gameController.renderBoard();

    // Greeting user
    displayController.showAlert(`Welcome! ${username}`);

    // Some dom stuff
    document.querySelector("#start-game").style.display = "none";
    document.querySelector("#restart-game").style.display = "block";
    document.querySelector(".user-data").style.display = "none";
};
const restartGame = function () {
    gameController.restartGame();
};
