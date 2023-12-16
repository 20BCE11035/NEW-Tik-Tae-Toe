let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] === '' && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
            showWinner();
        } else {
            switchPlayer();
            updateStatus();
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateStatus() {
    if (gameBoard.every(cell => cell !== '')) {
        statusElement.textContent = 'It\'s a draw!';
    } else {
        statusElement.textContent = `Current player: ${currentPlayer}`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
    });
}

function showWinner() {
    statusElement.textContent = `${currentPlayer} wins!`;
    disableCellClick();
    showResetButton();
}

function disableCellClick() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function showResetButton() {
    resetButton.style.display = 'block';
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    boardElement.innerHTML = '';
    statusElement.textContent = '';
    resetButton.style.display = 'none';
    createBoard();
    updateStatus();
}

createBoard();
updateStatus();


