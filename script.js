const grid = document.getElementById('pizzle-grid');
const shuffleBtn = document.getElementById('shuffle-btn');
const notification = document.getElementById('notification');

let cells = [];
let emptyCellIndex = 8;

function init() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('pizzle-cell');
        if (i === emptyCellIndex) {
            cell.classList.add('empty');
        } else {
            cell.textContent = i + 1;
        }
        cells.push(cell);
    }
    shuffle();
}

function render() {
    grid.innerHTML = '';
    cells.forEach((cell) => grid.appendChild(cell));
}

function moveCell(index) {
    if (canMove(index)) {
        swapCells(index, emptyCellIndex);
        emptyCellIndex = index;
        render();
    }
}

function canMove(index) {
    const diff = Math.abs(index - emptyCellIndex);

    return diff === 1 || diff === 3;
}

function shuffle() {
    for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        swapCells(i, j);
    }
    render();
    
    emptyCellIndex = cells.findIndex(cell => cell.classList.contains('empty'));
    notification.textContent = '';
}

function swapCells(index1, index2) {
    [cells[index1], cells[index2]] = [cells[index2], cells[index1]];
}

function checkWin() {
    return cells.every((cell, index) => {
        return cell.textContent === (index + 1).toString() || cell.classList.contains('empty');
    });
}   

grid.addEventListener('click', (e) => {
    const targetCell = e.target;
    if (targetCell.classList.contains('pizzle-cell')) {
        const targetIndex = cells.findIndex(cell => cell === targetCell);
        moveCell(targetIndex);

        let isWin = checkWin();
        if (isWin) {
            notification.textContent = 'You win!';
        }
    }
});

shuffleBtn.addEventListener('click', shuffle);

init();
