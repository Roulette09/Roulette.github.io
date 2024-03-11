
var numberOfMoves = 0; 
var time = 0; 
var timer; 

function startTimer() {
    timer = setInterval(function() {
        time++;
        updateTime(); 
    }, 1000); 
}

function stopTimer() {
    clearInterval(timer); 
}

function updateTime() {
    document.getElementById("time").innerText = time;
}

function updateMoveCount() {
    document.getElementById("moves").innerText = numberOfMoves;
}

function swapTiles(cell1, cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
}

function shuffle() {
    
    for (var row = 1; row <= 4; row++) {
        for (var column = 1; column <= 4; column++) {
            var row2 = Math.floor(Math.random() * 4 + 1); 
            var column2 = Math.floor(Math.random() * 4 + 1); 
            swapTiles("cell" + row + column, "cell" + row2 + column2); 
        }
    }
    numberOfMoves = 0; 
    time = 0; 
    updateMoveCount(); 
    stopTimer(); 
    startTimer(); 
}

function simpleGame() {
    shuffle(); 
    var row = Math.floor(Math.random() * 4) + 1;
    var column = Math.floor(Math.random() * 4) + 1;
    
    if (row === 4 && column === 4) {
        row = 3;
        column = 3;
    }
    swapTiles("cell" + row + column, "cell44");
}

function clickTile(row, column) {
    var cell = document.getElementById("cell" + row + column);
    var tile = cell.className;
    if (tile != "tile16") {
        
        if (column < 4 && document.getElementById("cell" + row + (column + 1)).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + row + (column + 1));
            numberOfMoves++; 
        } else if (column > 1 && document.getElementById("cell" + row + (column - 1)).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + row + (column - 1));
            numberOfMoves++; 
        } else if (row > 1 && document.getElementById("cell" + (row - 1) + column).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + (row - 1) + column);
            numberOfMoves++; 
        } else if (row < 4 && document.getElementById("cell" + (row + 1) + column).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + (row + 1) + column);
            numberOfMoves++; 
        }
        updateMoveCount(); 
        if (checkWin()) { 
            stopTimer(); 
            var playAgain = confirm("Congratulations!!\nAmount spent on current game in seconds: " + time + "\nNumber of moves: " + numberOfMoves + "\nWould you like to play again?");
            if (playAgain) {
                shuffle(); 
            }
        }
    }
}

function checkWin() {
    for (var row = 1; row <= 4; row++) {
        for (var column = 1; column <= 4; column++) {
            if (document.getElementById("cell" + row + column).className != "tile" + ((row - 1) * 4 + column)) {
                return false; 
            }
        }
    }
    return true; 
}

shuffle();
