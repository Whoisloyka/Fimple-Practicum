const squares = document.querySelectorAll(".square");
const player = document.getElementById("currentPlayer");
const restartBtn = document.getElementById("restartBtn");
const gameOverText = document.getElementById("gameOverTextId");
const gameOver = document.getElementById("gameOverId")
let currentPlayer = "X"
let isGameRunning = true;
let winner;

initializeGame()

function initializeGame(){
    player.textContent = `${currentPlayer}'s Turn`
    squares.forEach(square => square.addEventListener("click", () => clickSquare(square)));
}

function clickSquare(square){
    if(square.textContent === ""){
        square.textContent = currentPlayer;
        if (currentPlayer === "O"){
            square.style.color = "red"
        }
        turnPlayer();
    } 
    checkWinState()
    checkTieState()

    if (!isGameRunning) {
        gameOver.style.display = "flex";
        gameOverText.textContent = `Game is over, ${winner} Won`;
        squares.forEach(square => square.style.pointerEvents = 'none');
    }
}


function turnPlayer() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
        player.textContent = `${currentPlayer}'s Turn !`
    } else {
        currentPlayer = "X";
        player.textContent = `${currentPlayer}'s Turn !`
    }
    return;
}

function checkWinState() {
    // win
    checkRows()
    checkColumns()
    checkDiagonals()
}

function checkTieState() {
    // tie
    const values = [];
    squares.forEach(square => values.push(square.textContent))
    if (!values.includes("")) {
        // player.textContent = "Tie !";
        gameOver.style.display = "flex";
        gameOverText.textContent = "Tie !";
        squares.forEach(square => square.style.pointerEvents = 'none');
    }
}

function checkRows() {
    // check rows
    let row1 = squares[0].textContent == squares[1].textContent &&
        squares[0].textContent == squares[2].textContent && squares[0].textContent !== ""
    let row2 = squares[3].textContent == squares[4].textContent &&
        squares[3].textContent == squares[5].textContent && squares[3].textContent !== ""
    let row3 = squares[6].textContent == squares[7].textContent &&
        squares[6].textContent == squares[8].textContent && squares[6].textContent !== ""

    if (row1 || row2 || row3) {
        isGameRunning = false
    }
    if (row1) return winner = squares[0].textContent
    if (row2) return winner = squares[3].textContent
    if (row3) return winner = squares[6].textContent
}

function checkColumns() {
    // check cols
    let col1 = squares[0].textContent == squares[3].textContent &&
        squares[0].textContent == squares[6].textContent && squares[0].textContent !== ""
    let col2 = squares[1].textContent == squares[4].textContent &&
        squares[1].textContent == squares[7].textContent && squares[1].textContent !== ""
    let col3 = squares[2].textContent == squares[5].textContent &&
        squares[2].textContent == squares[8].textContent && squares[2].textContent !== ""

    if (col1 || col2 || col3) {
        isGameRunning = false
    }
    if (col1) return winner = squares[0].textContent
    if (col2) return winner = squares[1].textContent
    if (col3) return winner = squares[2].textContent
}

function checkDiagonals() {
    // check diag
    let dia1 = squares[0].textContent == squares[4].textContent &&
        squares[0].textContent == squares[8].textContent && squares[0].textContent !== ""
    let dia2 = squares[2].textContent == squares[4].textContent &&
        squares[2].textContent == squares[6].textContent && squares[2].textContent !== ""

    if (dia1 || dia2) {
        isGameRunning = false
    }
    if (dia1) return winner = squares[0].textContent
    if (dia2) return winner = squares[2].textContent
}

function playAgain(){
    currentPlayer = "X"
    squares.forEach(square => square.textContent = "")
    squares.forEach(square => square.style.color = "black")
    player.textContent = `${currentPlayer}'s Turn`
    isGameRunning = true
    gameOver.style.display = "none"
    squares.forEach(square => square.style.pointerEvents = 'all');
    initializeGame()
}
restartBtn.addEventListener("click", playAgain)