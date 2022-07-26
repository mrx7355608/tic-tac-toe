const Player = (name, mark) => {
    const makeMove = (gameBoard, index) => {
        gameBoard[index] = mark;
    };

    return { name, mark, makeMove };
};

const displayHandler = (gameBoard) => {
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
        const isBoard = Array.from(
            document.querySelector("#game-board").children
        );
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
    const gameBoard = ["", "", "", "", "", "", "", "", ""];
    let _turn = "player";
    const display = displayHandler(gameBoard);

    const getEmptyBoxes = () => {
        const boxesInGrid = Array.from(
            document.querySelector("#game-board").children
        );
        const emptyBoxes = boxesInGrid.filter(
            (box) => box.textContent.length < 1
        );
        return emptyBoxes;
    };

    const computerMove = () => {
        const emptyIndexes = [];
        gameBoard.forEach((elem, idx) => {
            if (elem === "") emptyIndexes.push(idx);
        });
        const index = Math.min(...emptyIndexes);
        gameBoard[index] = "O";
        _turn = "player";
        gameLoop();
    };
    // Gameloop
    const gameLoop = () => {
        console.log("Drawing board");
        display.drawBoard();
        const emptyBoxes = getEmptyBoxes();

        if (_turn === "player") {
            console.log("Adding listeners");
            emptyBoxes.forEach((elem) =>
                elem.addEventListener(
                    "click",
                    () => {
                        const index = parseInt(elem.getAttribute("data-idx"));
                        gameBoard[index] = "X";
                        _turn = "computer";
                        gameLoop();
                    },
                    { once: true }
                )
            );
            return;
        }
        computerMove();
    };

    const checkWinner = () => {};

    return { gameLoop };
};
const restartBtn = document.querySelector("#restart-game");
document.querySelector("#play-game").addEventListener("click", function () {
    const game = gameHandler();

    // Removing ~Play game~ button
    this.style.display = "none";
    // Displaying ~Restart game~ button
    restartBtn.style.display = "block";

    const name = prompt("Enter your name:") || "Guest";
    const player = Player(name, "X");
    const computer = Player("Computer", "O");

    game.gameLoop();
});

restartBtn.addEventListener("click", () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    const name = prompt("Enter your name:") || "Guest";
    const player = Player(name, "X");
    const computer = Player("Computer", "O");
    gameHandler().gameLoop(player, computer);
});
