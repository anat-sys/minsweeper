'use strict';
// The Model
const MINE = '&#9728;';
const FLAG = '&#x1F3C1;';

var gIsFirst;
var gBoard;
var gSequence = 0;
var gInterval;

var gLevel = {
    SIZE: 4,
    MINES: 2,
};

// The current game state
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
};

function init() {
    gBoard = buildBoard(gLevel.SIZE);
    setMinesNegsCount(gBoard);
    renderBoard(gBoard);
    gIsFirst = true;
    gGame.isOn = true;
    // setGameLevel(level);
    gGame.markedCount = 0;
    gGame.secsPassed = 0;
}

function buildBoard(level = 4, i, j) {
    var board = [];
    for (var i = 0; i < level; i++) {
        board.push([]);
        for (var j = 0; j < level; j++) {
            board[i][j] = {
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: false,
            };
        }
    }

    for (var i = 0; i < gLevel.MINES; i++) {
        var randI = getRandomInt(0, board.length - 1);
        var randJ = getRandomInt(0, board.length - 1);
        if (i != undefined && j != undefined) {
            while (randI === i && randJ === j) {
                randI = getRandomInt(0, board.length - 1);
                randJ = getRandomInt(0, board.length - 1);
            }
        }
        board[randI][randJ].isMine = true;
    }
    return board;
}

//Render the board
function renderBoard(board) {
    var strHTML = '';
    var cellId = 0;

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';

        for (var j = 0; j < board.length; j++) {
            var cell = board[i][j];
            var classes = '';

            if (cell.isShown) {
                classes = 'shown';
            } else {
                classes = 'not-shown';
            }

            strHTML += `<td class="${classes}" data-i="${i}" data-j="${j}" onclick="cellClicked(this, ${i}, ${j})" id="${cellId}">`;
            if (cell.isShown) {
                if (cell.isMine) {
                    if (cell.isMarked) {
                        strHTML += FLAG;
                    } else {
                        strHTML += MINE;
                    }
                } else if (cell.minesAroundCount === 0) {
                    strHTML += '';
                } else {
                    strHTML += cell.minesAroundCount;
                }
            } else if (cell.isMarked) {
                strHTML += FLAG;
            }

            strHTML += '</td>';
            cellId++;
        }

        strHTML += '</tr>';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
    listenToContextMenu();
}

function cellClicked(elCell, i, j) {
    if (gIsFirst) {
        buildBoard(gLevel.SIZE, i, j);
        setMinesNegsCount(gBoard);
        renderBoard(gBoard);
        gIsFirst = false;
        var elTimer = document.querySelector('.show-timer');
        timer(elTimer);
    }

    if (gBoard[i][j].isMarked) {
        return;
    }
    // debugger;
    if (gBoard[i][j].minesAroundCount === 0) {
        expandShown(gBoard, elCell, i, j);
    }

    if (gBoard[i][j].isMine !== true) {
        gBoard[i][j].isShown = true;
        renderBoard(gBoard);
    } else {
        revealAll();
        alert('game over');
        clearInterval(gInterval);
    }
}

function timer(elTimer) {
    var counter = 1;

    gInterval = setInterval(function () {
        var sec = counter % 60;
        var min = Math.floor(counter / 60);

        sec = zeroize(sec);
        min = zeroize(min);

        counter++;
        elTimer.innerHTML = `${min}:${sec}`;
    }, 1000);
}

function zeroize(num) {
    if (num < 10) return '0' + num;
    else return num;
}

function toggleMarkCell(elCell) {
    var i = elCell.dataset.i;
    var j = elCell.dataset.j;
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked;
    renderBoard(gBoard);
}

function onRightClick(event) {
    event.preventDefault();
    toggleMarkCell(event.target);
}

//game ends when all mines are marked and all the other cells are shown
function checkGameOver() {}

function listenToContextMenu() {
    document.querySelectorAll('.not-shown').forEach(function (element) {
        element.addEventListener('contextmenu', onRightClick);
    });
}

// //wins when all the cells
// //  that are not mines are seen and all the mines marked,
// // all other cells are seen
function checkWin() {}

//does not work/***************************
function expandShown(board, elCell, rowIdx, colIdx) {
    var i = elCell.dataset.i;
    var j = elCell.dataset.j;

    if (board[i][j].minesAroundCount === 0 && !board[i][j].isMine) {
        for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
            if (i < 0 || i > board.length - 1) continue;

            for (var j = colIdx - 1; j <= colIdx + 1; j++) {
                if (
                    (i === rowIdx && j === colIdx) ||
                    j < 0 ||
                    j > board.length - 1
                )
                    continue;
                gBoard[i][j].isShown = true;
            }
        }
        renderBoard(gBoard);
    }
}

//Reset game
function resetGame() {
    renderBoard(gLevel);
    gSequence = 3;
    clearInterval(gInterval);
    var elTimer = document.querySelector('.show-timer');
    elTimer.innerText = '00:00';
    // timer(elTimer);
    var elLives = document.querySelector('.lives');
    elLives.innerText = 1;
}

//sets the game level
function setGameLevel(level) {
    gLevel.SIZE = level;
    switch (level) {
        case 4:
            gLevel.MINES = 2;
            break;
        case 8:
            gLevel.MINES = 12;
            break;
        case 12:
            gLevel.MINES = 30;
    }

    var elTimer = document.querySelector('.show-timer');
    elTimer.innerText = '00:00';
    clearInterval(gInterval);
    init();
}

function revealAll() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            gBoard[i][j].isShown = true;
        }
    }
    renderBoard(gBoard);
}
