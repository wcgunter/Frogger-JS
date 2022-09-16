/* 
Game constants and variables
select all the rows - 10 rows - each row has 10 children (10 columns)
*/

let squares = document.querySelectorAll('.grid .row');
let logsMovingLeft = document.querySelectorAll('.log-left');
let logsMovingRight = document.querySelectorAll('.log-right');
let carsMovingLeft = document.querySelectorAll(".car-left");
let carsMovingRight = document.querySelectorAll(".car-right");

// frog start position
let currentColumn = 6;
let currentRow = 10;

const gameOverSound = new Audio('assets/audio_dead.mp3');
const moveSound = new Audio("assets/audio_move.mp3");

//~~~~~~~~~~~~~~~~~~~MODAL HANDLING~~~~~~~~~~~~~~~~~~~
//Get the modal objects
var welcomeModal = document.getElementById("welcomeModal");

function startGame(){
    welcomeModal.style.display = "none";
}

let board = [
    {
        row: 0, 
        environment: 'grass', 
        objects: [] 
    },
    { 
        row: 1, 
        environment: 'river', 
        objects: [{ column: 0, direction: 1, image: "url"},
            { column: 5, direction: 1, image: "url"},] 
    },
    { 
        row: 2, 
        environment: 'river', 
        objects: [{ column: 0, direction: -1, image: "url"},
        { column: 5, direction: -1, image: "url"},] 
    },
    { 
        row: 3, 
        environment: 'river', 
        objects: [{ column: 0, direction: 1, image: "url"},
        { column: 5, direction: 1, image: "url"},]  
    },
    { 
        row: 4, 
        environment: 'grass', 
        objects: [] 
    },
    { 
        row: 5, 
        environment: 'road', 
        objects: [] 
    },
    { 
        row: 6, 
        environment: 'road', 
        objects: [ { column: 6, direction: -1, image: "url"}, { column: 2, direction: -1, image: "url"}] 
    },
    { 
        row: 7, 
        environment: 'road', 
        objects: [{ column: 0, direction: 1, image: "url"}, { column: 4, direction: 1, image: "url"}] 
    },
    { 
        row: 8, 
        environment: 'grass', 
        objects: [] 
    },
    { 
        row: 9, 
        environment: 'grass', 
        objects: [] 
    }];

for (let i = 0; i < squares.length; i++){
    squares[i].classList.add(board[i].environment);
}

function moveFrog(e){
    moveSound.play();
    squares[currentRow-1].children[currentColumn-1].classList.remove('frog');
    switch(e.key){
        case 'ArrowLeft':
            console.log('ArrowLeft');
            currentColumn -= 1;
            break;
        case 'ArrowRight':
            console.log('ArrowRight');
            currentColumn += 1;
            break;
        case 'ArrowUp':
            console.log('ArrowUp');
            currentRow -= 1;
            break;
        case 'ArrowDown':
            console.log('ArrowDown');
            currentRow += 1;
            break;  
    }
    squares[currentRow-1].children[currentColumn-1].classList.add('frog');
}

document.addEventListener('keydown', moveFrog)

/*
This function adds the movement functionality to all the logs
moving left by calling logLeftMovement() function on each of them.
*/
function addMovementToLogsMovingLeftRight(){
    //logsMovingLeft.forEach(logMovingLeft => logLeftMovement(logMovingLeft));
    //logsMovingRight.forEach(logMovingRight => logRightMovement(logMovingRight));
}

function addMovementToCarsMovingLeftRight(){
    //moveObjects();
    //carsMovingLeft.forEach(carMovingLeft => carLeftMovement(carMovingLeft));
    //carsMovingRight.forEach(carMovingRight => carRightMovement(carMovingRight));
}

// function logLeftMovement(logMovingLeft){
//     if (logMovingLeft.classList.contains('l1')){
//         logMovingLeft.classList.remove('l1');
//         logMovingLeft.classList.add('l2');
//     }

//     else if(logMovingLeft.classList.contains('l2')){
//         logMovingLeft.classList.remove('l2');
//         logMovingLeft.classList.add('l3');
//     }

//     else if(logMovingLeft.classList.contains('l3')){
//         logMovingLeft.classList.remove('l3');
//         logMovingLeft.classList.add('l4');
//     }

//     else if(logMovingLeft.classList.contains('l4')){
//         logMovingLeft.classList.remove('l4');
//         logMovingLeft.classList.add('l5');
//     }

//     else if(logMovingLeft.classList.contains('l5')){
//         logMovingLeft.classList.remove('l5');
//         logMovingLeft.classList.add('l1');
//     }
// }


// function logRightMovement(logMovingRight){
//     if (logMovingRight.classList.contains('l1')){
//         logMovingRight.classList.remove('l1');
//         logMovingRight.classList.add('l5');
//     }

//     else if(logMovingRight.classList.contains('l2')){
//         logMovingRight.classList.remove('l2');
//         logMovingRight.classList.add('l1');
//     }

//     else if(logMovingRight.classList.contains('l3')){
//         logMovingRight.classList.remove('l3');
//         logMovingRight.classList.add('l2');
//     }

//     else if(logMovingRight.classList.contains('l4')){
//         logMovingRight.classList.remove('l4');
//         logMovingRight.classList.add('l3');
//     }

//     else if(logMovingRight.classList.contains('l5')){
//         logMovingRight.classList.remove('l5');
//         logMovingRight.classList.add('l4');
//     }
// }

// function carLeftMovement(carMovingLeft){
//     if (carMovingLeft.classList.contains('c1')){
//         carMovingLeft.classList.remove('c1');
//         carMovingLeft.classList.add('c2');
//     }

//     else if(carMovingLeft.classList.contains('c2')){
//         carMovingLeft.classList.remove('c2');
//         carMovingLeft.classList.add('c3');
//     }

//     else if(carMovingLeft.classList.contains('c3')){
//         carMovingLeft.classList.remove('c3');
//         carMovingLeft.classList.add('c4');
//     }

//     else if(carMovingLeft.classList.contains('c4')){
//         carMovingLeft.classList.remove('c4');
//         carMovingLeft.classList.add('c1');
//     }
// }

// function carRightMovement(carMovingRight){
//     if (carMovingRight.classList.contains('c1')){
//         carMovingRight.classList.remove('c1');
//         carMovingRight.classList.add('c4');
//     }

//     else if(carMovingRight.classList.contains('c2')){
//         carMovingRight.classList.remove('c2');
//         carMovingRight.classList.add('c1');
//     }

//     else if(carMovingRight.classList.contains('c3')){
//         carMovingRight.classList.remove('c3');
//         carMovingRight.classList.add('c2');
//     }

//     else if(carMovingRight.classList.contains('c4')){
//         carMovingRight.classList.remove('c4');
//         carMovingRight.classList.add('c3');
//     }
// }

function moveCars(){
    for (var i = 0; i < board.length; i++){
        if(board[i].environment == 'road'){
            if (board[i].objects.length >= 1){
                for(var j = 0; j < board[i].objects.length; j++){
                    squares[board[i].row].children[(board[i].objects[j].column + 10 ) % 10].classList.remove('car');
                    board[i].objects[j].column += (1 * board[i].objects[j].direction + 10) % 10;
                    squares[board[i].row].children[(board[i].objects[j].column + 10 ) % 10].classList.add('car');
                }
            }
        }
    }
}


function moveLogs(){
    for (var i = 0; i < board.length; i++){
        if(board[i].environment == 'river'){
            if (board[i].objects.length >= 1){
                for(var j = 0; j < board[i].objects.length; j++){
                    squares[board[i].row].children[board[i].objects[j].column % 10].classList.remove('log');
                    squares[board[i].row].children[(board[i].objects[j].column + 1) % 10].classList.remove('log');
                    //squares[board[i].row].children[(board[i].objects[j].column + 2) % 10].classList.remove('log');
                    board[i].objects[j].column += (1 * board[i].objects[j].direction + 10) % 10;
                    squares[board[i].row].children[(board[i].objects[j].column + 10 ) % 10].classList.add('log');
                    squares[board[i].row].children[(board[i].objects[j].column + 10 + 1) % 10].classList.add('log');
                    //squares[board[i].row].children[(board[i].objects[j].column + 10 + 2) % 10].classList.add('log');
                }
            }
        }
    }
}


/*
We want to keep the logs and cars moving continously, 
to do that we use setInterval(), which calls addMovementToLogsMovingLeft()
function every 1 second or 1000ms.
*/
setInterval(moveLogs, 1000)
setInterval(moveCars, 600)