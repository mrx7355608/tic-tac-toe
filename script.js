const gameController = (function () {
    let board = ["", "", "", "O", "O", "X", "X", "O", "X"];

    const addMark = function () {
        this.innerText = "X";
    };
    const restartGame = function () {
        // Removing old grid
        Array.from(document.querySelector(".game-board").children).forEach(
            (node) => node.remove()
        );
        // Resetting board
        board = board.map(() => {
            return "";
        });
        // Rendering board again
        renderBoard();
    };
    const renderBoard = function () {
        const gridCells = board.map((elem) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.innerText = elem;
            cell.addEventListener("click", addMark, { once: true });
            return cell;
        });
        document.querySelector(".game-board").append(...gridCells);
    };

    return { renderBoard, restartGame };
})();

const displayController = (function () {})();

const startGame = function () {
    gameController.renderBoard();
    document.querySelector("#start-game").style.display = "none";
    document.querySelector("#restart-game").style.display = "block";
};
const restartGame = function () {
    gameController.restartGame();
};
