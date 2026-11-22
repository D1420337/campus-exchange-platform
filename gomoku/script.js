const BOARD_SIZE = 15;
let board = [];
let currentPlayer = 'black'; // 'black' or 'white'
let gameActive = true;

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');

function initGame() {
    boardElement.innerHTML = '';
    board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
    currentPlayer = 'black';
    gameActive = true;
    updateStatus();
    updateBoardHoverState();

    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            
            const preview = document.createElement('div');
            preview.classList.add('piece-preview');
            cell.appendChild(preview);

            cell.addEventListener('click', () => handleCellClick(r, c));
            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(r, c) {
    if (!gameActive || board[r][c] !== null) return;

    // 放置棋子
    board[r][c] = currentPlayer;
    const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    cell.classList.add(currentPlayer);
    
    // 移除預覽，並加入實體棋子
    cell.innerHTML = '';
    const piece = document.createElement('div');
    piece.classList.add('piece');
    cell.appendChild(piece);

    // 檢查勝負
    if (checkWin(r, c, currentPlayer)) {
        gameActive = false;
        const winnerText = currentPlayer === 'black' ? '黑子' : '白子';
        statusElement.textContent = `遊戲結束，${winnerText} 獲勝！`;
        statusElement.style.color = '#e74c3c';
        boardElement.className = 'board'; // 移除 hover 狀態
        return;
    }

    // 換手
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    updateStatus();
    updateBoardHoverState();
}

function updateStatus() {
    statusElement.textContent = `目前輪到：${currentPlayer === 'black' ? '黑子' : '白子'}`;
    statusElement.style.color = 'var(--text-color)';
}

function updateBoardHoverState() {
    boardElement.className = `board ${currentPlayer}-turn`;
}

function checkWin(r, c, player) {
    const directions = [
        [0, 1],   // 水平
        [1, 0],   // 垂直
        [1, 1],   // 右下斜
        [1, -1]   // 左下斜
    ];

    for (const [dr, dc] of directions) {
        let count = 1;

        // 正向檢查
        for (let i = 1; i < 5; i++) {
            const nr = r + dr * i;
            const nc = c + dc * i;
            if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc] === player) {
                count++;
            } else {
                break;
            }
        }

        // 反向檢查
        for (let i = 1; i < 5; i++) {
            const nr = r - dr * i;
            const nc = c - dc * i;
            if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc] === player) {
                count++;
            } else {
                break;
            }
        }

        if (count >= 5) {
            return true;
        }
    }
    return false;
}

restartBtn.addEventListener('click', initGame);

// 網頁載入時初始化遊戲
initGame();
