const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const statusDisplay = document.getElementById('game-status');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
 ];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    resetButton.addEventListener('click', resetGame);
    statusDisplay.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex');
    if (options[cellIndex] !== "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();

}
function updateCell(cell ,cellIndex) {
    options[cellIndex] = currentPlayer;
    cell.innerHTML = currentPlayer;
    
}
function changePlayer(){
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    statusDisplay.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes("")) {
        statusDisplay.textContent = `It's a draw!`;
    } else {
        changePlayer();
    }

}
function resetGame(){
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusDisplay.textContent = `${currentPlayer}'s turn`;
    running = true;
    cells.forEach(cell => cell.innerHTML = "");

}
