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
    const createBoard = (gameBoard) => {
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
    const drawBoard = (gameBoard) => {
        cleanBoard();
        createBoard(gameBoard);
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

const gameHandler = (player1, player2) => {
    const gameBoard = ["", "", "", "", "", "", "", "", ""];
    let _turn = "player1";
    const display = displayHandler(gameBoard);

    const getEmptyBoxesInGrid = () => {
        const boxesInGrid = Array.from(document.querySelector("#game-board").children);
        const emptyBoxes = boxesInGrid.filter((box) => box.textContent.length < 1);
        return emptyBoxes;
    };

    const computerMove = (player) => {
        const emptyIndexes = [];
        gameBoard.forEach((elem, idx) => {
            if (elem === "") emptyIndexes.push(idx);
        });
        const index = Math.min(...emptyIndexes);
        gameBoard[index] = "O";
        const playerWon = checkWinner();
        if (playerWon === false) return endGame(player);
        display.drawBoard(gameBoard);
        _turn = "player1";
        return gameLoop();
    };

    const endGame = (player) => {
        display.renderMessage(`${player.name} has won the game`);
        display.drawBoard(gameBoard);
    };

    // Handling players moves
    const handlePlayerMoves = (player) => {
        const emptyBoxes = getEmptyBoxesInGrid();
        emptyBoxes.map((element) => {
            element.addEventListener(
                "click",
                () => {
                    const index = parseInt(element.getAttribute("data-idx"));
                    player.makeMove(gameBoard, index);

                    const isWinner = checkWinner();
                    if (isWinner === true) return endGame(player);

                    // Here false means that, Player2 has won
                    // if (isWinner === false) return endGame(player);
                    // Add tie condition
                    _turn = "player2";
                    return gameLoop();
                },
                { once: true }
            );
        });
    };

    const gameLoop = () => {
        console.log("Drawing board");
        display.drawBoard(gameBoard);

        if (_turn === "player1") {
            handlePlayerMoves(player1);
        } else {
            computerMove(player2);
            // handlePlayerMoves(player2);
        }
    };

    const checkWinner = () => {
        /*
        
          0  |  1  |  2   
        _____|_____|_____
          3  |  4  |  5   
        _____|_____|_____
          6  |  7  |  8   
             |     |

        */
        for (let i = 0; i < 3; i++) {
            if (
                gameBoard[i] === "X" &&
                gameBoard[i + 3] === "X" &&
                gameBoard[i + 6] === "X"
            ) {
                return true;
            }

            if (
                i === 0 &&
                gameBoard[i] === "X" &&
                gameBoard[i + 4] === "X" &&
                gameBoard[i + 8] === "X"
            ) {
                return true;
            }

            if (
                i === 2 &&
                gameBoard[i] === "X" &&
                gameBoard[i + 2] === "X" &&
                gameBoard[i + 4] === "X"
            ) {
                return true;
            }

            if (
                i === 0 &&
                gameBoard[i] === "X" &&
                gameBoard[i + 1] === "X" &&
                gameBoard[i + 2] === "X"
            ) {
                return true;
            }

            if (gameBoard[3] === "X" && gameBoard[4] === "X" && gameBoard[5] === "X") {
                return true;
            }
            if (gameBoard[6] === "X" && gameBoard[7] === "X" && gameBoard[8] === "X") {
                return true;
            }
            if (
                gameBoard[i] === "O" &&
                gameBoard[i + 3] === "O" &&
                gameBoard[i + 6] === "O"
            ) {
                return false;
            }

            if (
                i === 0 &&
                gameBoard[i] === "O" &&
                gameBoard[i + 4] === "O" &&
                gameBoard[i + 8] === "O"
            ) {
                return false;
            }

            if (
                i === 2 &&
                gameBoard[i] === "O" &&
                gameBoard[i + 2] === "O" &&
                gameBoard[i + 4] === "O"
            ) {
                return false;
            }

            if (
                i === 0 &&
                gameBoard[i] === "O" &&
                gameBoard[i + 1] === "O" &&
                gameBoard[i + 2] === "O"
            ) {
                return false;
            }

            if (gameBoard[3] === "O" && gameBoard[4] === "O" && gameBoard[5] === "O") {
                return false;
            }
            if (gameBoard[6] === "O" && gameBoard[7] === "O" && gameBoard[8] === "O") {
                return false;
            }
        }
    };

    return { gameLoop };
};
const restartBtn = document.querySelector("#restart-game");
document.querySelector("#play-game").addEventListener("click", function () {
    // Removing ~Play game~ button
    this.style.display = "none";

    // Displaying ~Restart game~ button
    restartBtn.style.display = "block";

    // Creating players
    const name = prompt("Enter your name:") || "Guest";
    const player1 = Player(name, "X");
    const player2 = Player("Computer", "O");

    const game = gameHandler(player1, player2);
    game.gameLoop();

    restartBtn.addEventListener("click", () => {
        game.gameLoop();
    });
});
