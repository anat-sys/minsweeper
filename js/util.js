'use strict';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = getMinesNegsCount(board, i, j);
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
        }
    }

    return minesAroundCount;
}

// //reveal the 1st generation neighbors
// function showNegs(board, rowIdx, colIdx) {
//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i > board.length - 1) continue;

//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if ((i === rowIdx && j === colIdx) || j < 0 || j > board.length - 1)
//                 continue;

//         }
//     }
// }
