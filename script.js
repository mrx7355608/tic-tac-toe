let gameBoard = ["", "", "", "", "", "", "", "", ""];

const Player = (name, mark) => {
    const makeMove = (gameBoard, index) => {
        gameBoard[index] = mark;
    };

    return { name, mark, makeMove };
};

const displayHandler = () => {
    // Gameboard
    const createBox = (elem, index) => {
        const box = document.createElement("div");
        const text = document.createElement("p");

        text.innerText = elem;
        box.setAttribute("data-idx", index);
        box.appendChild(text);

        return box;
    };
    const createBoard = () => {
        gameBoard.forEach((elem, index) => {
            const box = createBox(elem, index);
            document.querySelector("#game-board").appendChild(box);
        });
    };
    const cleanBoard = () => {
        const isBoard = Array.from(document.querySelector("#game-board").children);
        if (isBoard.length < 1) return;
        isBoard.forEach((elem) => elem.remove());
    };
    const drawBoard = () => {
        cleanBoard();
        createBoard();
    };

    // Render messages on screen
    const renderMessage = (message) => {
        document.querySelector("#message").innerText = message;
    };

    return {
        drawBoard,
        renderMessage,
    };
};
const gameHandler = () => {
    let _turn = "player";
    const display = displayHandler();

    const attachEvents = (func, p1, p2) => {
        const boxesInGrid = Array.from(document.querySelector("#game-board").children);
        const emptyBoxes = boxesInGrid.filter((box) => box.textContent === "");
        emptyBoxes.forEach((box) => {
            const index = parseInt(box.getAttribute("data-idx"));
            box.addEventListener(
                "click",
                () => {
                    func(gameBoard, index);
                    gameLoop(p1, p2);
                },
                { once: true }
            );
        });
    };
    const handleMoves = (p1, p2) => {
        console.log(_turn);
        if (_turn === "player") {
            display.renderMessage(`${p1.name} turn`);
            attachEvents(p1.makeMove, p1, p2);
            _turn = "computer";
            return;
        }
        display.renderMessage(`${p2.name} turn`);
        attachEvents(p2.makeMove, p1, p2);
        _turn = "player";
    };
    // gameLoop
    const gameLoop = (p1, p2) => {
        display.drawBoard();
        handleMoves(p1, p2);
        // Switch players
        // Update board on moves
        // check who won
        // Display necessary messages
    };

    const checkWinner = () => {};

    return { gameLoop };
};
const restartBtn = document.querySelector("#restart-game");
document.querySelector("#play-game").addEventListener("click", function () {
    const game = gameHandler();
    this.style.display = "none";
    restartBtn.style.display = "block";

    const name = prompt("Enter your name:") || "Guest";
    const player = Player(name, "X");
    const computer = Player("Computer", "O");

    game.gameLoop(player, computer);
});

restartBtn.addEventListener("click", () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    const name = prompt("Enter your name:") || "Guest";
    const player = Player(name, "X");
    const computer = Player("Computer", "O");
    gameHandler().gameLoop(player, computer);
});
