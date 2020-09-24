'use strict';
// The Model
const MINE = '&#9728;';

var gBoard;
var gSequence = 1;

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

var gSequence = 3;

function init() {
    gBoard = buildBoard(gLevel.SIZE);
    setMinesNegsCount(gBoard);
    renderBoard(gBoard);
    gGame.isOn = true;
    gGame.markedCount = 0;
    gGame.secsPassed = 0;
}

function buildBoard(level = 4) {
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
        board[getRandomInt(0, board.length - 1)][
            (0, board.length - 1)
        ].isMine = true;
        console.table(board);
    }
    return board;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = getMinesNegsCount(board, i, j);
            // console.log(board[i][j].minesAroundCount);
        }
    }
}

//counts mines around each cell
function getMinesNegsCount(board, rowIdx, colIdx) {
    var minesAroundCount = 0;

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if ((i === rowIdx && j === colIdx) || j < 0 || j > board.length - 1)
                continue;

            var cell = board[i][j];

            if (cell.isMine) minesAroundCount++;
            // console.log(board);
        }
    }

    return minesAroundCount;
}

//Render the board
function renderBoard(board) {
    var strHTML = '';
    var cellId = 0;

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';

        for (var j = 0; j < board.length; j++) {
            strHTML += `<td onclick="cellClicked(this, ${i}, ${j})" id="${cellId}" >`;
            if (board[i][j].isShown) {
                if (board[i][j].isMine) {
                    strHTML += MINE;
                    // } else if (board[i][j].minesAroundCount !== null) {
                } else if (board[i][j].minesAroundCount === 0) {
                    strHTML += '';
                } else {
                    strHTML += board[i][j].minesAroundCount;
                }
            }

            strHTML += '</td>';
            cellId++;
        }

        strHTML += '</tr>';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elCell, i, j) {
    if (gBoard[i][j].isMine !== true) {
        gBoard[i][j].isShown = true;
        renderBoard(gBoard);
    } else {
        alert('game over');
        gBoard[i][j].isShown = true;
        renderBoard(gBoard);
    }

    if (gBoard[i][j].minesAroundCount === 0) {
        //*************** *
        // var elCell = document.querySelector('#celId');
        elCell.style.backgroundColor = 'white';
    }
    console.log('elCell', elCell);
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
        // elTimer.innerText = counter;
    }, 1000);
}

function zeroize(num) {
    if (num < 10) return '0' + num;
    else return num;
}

function cellMarked(elCell) {}

//game ends when all mines are marked and all the other cells are shown
function cellGameOver() {}

//wins when all the cells
//  that are not mines are seen and all the mines marked,
// all other cells are seen
function checkWin() {}

function expandShown(board, elCell, i, j) {}

//Reset game
function resetGame() {
    renderBoard(gLevel);
    gSequence = 3;
    clearInterval(gInterval);
    var elLives = document.querySelector('.timer');
    elLives.innerText = '00:00';
    var elLives = document.querySelector('lives');
    elLives.innerText = 1;
}

//sets the game level
function setGameLevel(level) {
    gLevel.SIZE = level;
    init();
    // switch (gLevel.MINE) {
    //     case
    // }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
