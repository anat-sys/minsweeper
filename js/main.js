'use strict';
// The Model
var gBoard = {
    minesAroundCount: 4,
    isShown: true,
    isMine: false,
    isMarked: true,
};

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

// var gSequence = 1;

function initGame() {
    // gBoard = renderBoard(gBoard);
}

function buildBoard() {
    // put the function in the games section later
    var board = [];
    for (var i = 0; i < 4; i++) {
        board.push([]);
        for (var j = 0; j < 4; j++) {
           
        }
    }
    return board;
}

//counts mines around each cell
function setMinesNegsCount(mat, rowIdx, colIdx) {
    var minesAroundCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if ((i === rowIdx && j === colIdx) || j < 0 || j > mat.length - 1)
                continue;
            var cell = mat[i][j];
            if (cell === MINE) minesAroundCount++;
        }
    }
    return minesAroundCount;
}

//Render the board
function renderBoard(cellsNum) {
    var strHTML = '';
    var counter = 0;

    var nums = [];
    for (var i = 1; i <= cellsNum; i++) {
        nums.push(i);
    }

    nums = shuffle(nums);

    for (var i = 0; i < Math.sqrt(nums.length); i++) {
        strHTML += '<tr>';
        for (var j = 0; j < Math.sqrt(nums.length); j++) {
            strHTML += `<td onclick="cellClicked(this, ${nums[counter]})" style="background-color: salmon">`;
            strHTML += nums[counter];
            strHTML += '</td>';
            counter++;
        }
        strHTML += '</tr>';
    }
    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHTML;
}

function cellClicked(elCell, clickedNum) {
    // cellclicked, i, j
    console.log(elCell);
    console.log(1111);
    console.log(clickedNum);
    if (clickedNum === gSequence) {
        console.log('on track, ', clickedNum);
        elCell.style.backgroundColor = 'green';
        gSequence++;
        if (clickedNum === 1) {
            var elTimer = document.querySelector('.timer');

            timer(elTimer);
        }

        var elNext = document.querySelector('.next');

        if (clickedNum === gLevel) {
            clearInterval(gInterval);
            elNext.innerText = 'Win!';
        } else {
            elNext.innerText = gSequence;
        }
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
        // elTimer.innerText = counter;
    }, 1000);
}

function zeroize(num) {
    if (num < 10) return '0' + num;
    else return num;
}

function cellMarked(elCell) {
    // console.log(elCell);
    // console.log(1111);
    // console.log(clickedNum);
    // if (clickedNum === gSequence) {
    //     console.log('on track, ', clickedNum);
    //     elCell.style.backgroundColor = 'green';
    //     gSequence++;
    //     if (clickedNum === 1) {
    //         var elTimer = document.querySelector('.timer');
    //         timer(elTimer);
    //     }
    //     var elNext = document.querySelector('.next');
    //     if (clickedNum === gLevel) {
    //         clearInterval(gInterval);
    //         elNext.innerText = 'Win!';
    //     } else {
    //         elNext.innerText = gSequence;
    //     }
    // }
}

//game ends when all mines are marked and all the other cells are shown
function cellGameOver () {

}


//winds when all the cells
//  that are not mines are seen and all the mines marked, 
// all other cells are seen
checkWin () {

}

function expandShown(board, elCell, i, j) {

}
////
//
//
//
//
//
//
//
//
//
//

//Reset game
function resetGame() {
    renderBoard(gLevel);
    gSequence = 1;
    clearInterval(gInterval);
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = '00:00';
    var elNext = document.querySelector('.next');
    elNext.innerText = 1;
}

f;

//sets the game level
function setGameLevel(level) {
    gLevel = level;
    resetGame();
}