/* 
Game constants and variables
select all the rows - 10 rows - each row has 10 children (10 columns)
*/
const COLUMNS = 10;
const ROWS = 10;

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
    if (welcomeModal.classList.contains('hidden')) {
        welcomeModal.classList.remove('hidden');
        setTimeout(function () {
            welcomeModal.classList.remove('visually_hidden');
        }, 20);
      } else {
        welcomeModal.classList.add('visually_hidden');    
        welcomeModal.addEventListener('transitionend', function(e) {
            welcomeModal.classList.add('hidden');
        }, {
          capture: false,
          once: true,
          passive: false
        });
      }
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
        direction: 1,
        objects: [{ column: 0, direction: 1, type: 'log', image: "url"},
            { column: 5, direction: 1, type: 'log', image: "url"},] 
    },
    { 
        row: 2, 
        environment: 'river',  
        direction: -1,
        objects: [{ column: 0, direction: -1, type: 'log',  image: "url"},
        { column: 5, direction: -1, type: 'log',  image: "url"},] 
    },
    { 
        row: 3, 
        environment: 'river',  
        direction: 1,
        objects: [{ column: 0, direction: 1, type: 'log',  image: "url"},
        { column: 5, direction: 1, type: 'log',  image: "url"},]  
    },
    { 
        row: 4, 
        environment: 'grass', 
        objects: [] 
    },
    { 
        row: 5, 
        environment: 'road',  
        direction: 1,
        objects: [ { column: 3, direction: 1, type: 'car',  image: "url"}, { column: 7, direction: 1, type: 'car',  image: "url"}] 
    },
    { 
        row: 6, 
        environment: 'road',  
        direction: -1,
        objects: [ { column: 6, direction: -1, type: 'car',  image: "url"}, { column: 2, direction: -1, type: 'car',  image: "url"}] 
    },
    { 
        row: 7, 
        environment: 'road',  
        direction: 1,
        objects: [{ column: 0, direction: 1, type: 'car', image: "url"}, { column: 4, direction: 1, type: 'car', image: "url"}] 
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

function checkSpace(){
    let currentSpot = squares[currentRow-1].children[currentColumn-1].children[0];
    let direction = board[currentRow-1].direction ? board[currentRow-1].direction : 1;

    if(direction > 0) {
        let prevSpot = squares[currentRow-1].children[(currentColumn - 2 + COLUMNS) % COLUMNS].children[0];
        
        if ((prevSpot.classList.contains('car') && prevSpot.offsetLeft - prevSpot.parentElement.offsetLeft >= prevSpot.offsetWidth/2)
            || (currentSpot.classList.contains('car') && currentSpot.offsetLeft - currentSpot.parentElement.offsetLeft <= currentSpot.offsetWidth/2)){

            currentSpot.style.left = `${currentSpot.offsetLeft - currentSpot.parentElement.offsetLeft}px`
            prevSpot.style.left = `${prevSpot.offsetLeft - prevSpot.parentElement.offsetLeft}px`
            
            console.log("DEAD");
            clearInterval(logInterval)
            clearInterval(carInterval)
        }
        if (squares[currentRow-1].classList.contains('river') && !currentSpot.classList.contains('frog')){
            // previous spot has a log and the offset is greater than half of the width then safe
            // next spot has a log and the offset is less than half of the width then safe
            if (!((prevSpot.classList.contains('log') && (prevSpot.offsetLeft - prevSpot.parentElement.offsetLeft) >= prevSpot.offsetWidth/2)
                || (currentSpot.classList.contains('log') && (currentSpot.offsetLeft - currentSpot.parentElement.offsetLeft) <= currentSpot.offsetWidth/2 ))){

                currentSpot.style.left = `${currentSpot.offsetLeft - currentSpot.parentElement.offsetLeft}px`
                prevSpot.style.left = `${prevSpot.offsetLeft - prevSpot.parentElement.offsetLeft}px`
                
                console.log("DEAD");
                clearInterval(logInterval)
                clearInterval(carInterval)
            }
        }
    } else {

        let nextSpot = squares[currentRow-1].children[(currentColumn + COLUMNS) % COLUMNS].children[0];

        let currentLeft = currentSpot.offsetLeft// > currentSpot.offsetWidth ? currentSpot.offsetLeft % currentSpot.offsetWidth : currentSpot.offsetLeft;
        let currentParentLeft = currentSpot.parentElement.offsetLeft// > currentSpot.parentElement.offsetWidth ? currentSpot.parentElement.offsetLeft % currentSpot.parentElement.offsetWidth : currentSpot.parentElement.offsetLeft;

        let nextLeft = nextSpot.offsetLeft //> nextSpot.offsetWidth ? nextSpot.offsetLeft % nextSpot.offsetWidth : nextSpot.offsetLeft;
        let nextParentLeft = nextSpot.parentElement.offsetLeft //> nextSpot.parentElement.offsetWidth ? nextSpot.parentElement.offsetLeft % nextSpot.parentElement.offsetWidth : nextSpot.parentElement.offsetLeft;

        if ((nextSpot.classList.contains('car') && nextLeft - nextParentLeft <= nextSpot.offsetWidth/2)
            || (currentSpot.classList.contains('car') && currentLeft - currentParentLeft >= currentSpot.offsetWidth/2)){

            currentSpot.style.left = `${currentSpot.offsetLeft - currentSpot.parentElement.offsetLeft}px`
            nextSpot.style.left = `${nextSpot.offsetLeft - nextSpot.parentElement.offsetLeft}px`
            
            console.log("DEAD");
            clearInterval(logInterval)
            clearInterval(carInterval)
        }
        if (squares[currentRow-1].classList.contains('river') && !currentSpot.classList.contains('frog')){
            // console.log((currentSpot.offsetLeft - currentSpot.parentElement.offsetLeft));
            // console.log((nextSpot.offsetLeft - nextSpot.parentElement.offsetLeft));
            // console.log(`${nextSpot.offsetLeft} - ${currentSpot.offsetLeft}   `);
            // console.log(`${nextSpot.parentElement.offsetLeft} - ${currentSpot.parentElement.offsetLeft}   `);

            // previous spot has a log and the offset is greater than half of the width then safe
            // next spot has a log and the offset is less than half of the width then safe
            if (!((nextSpot.classList.contains('log') && (nextLeft - nextParentLeft) <= nextSpot.offsetWidth/2)
                || (currentSpot.classList.contains('log') && (currentLeft - currentParentLeft) >= currentSpot.offsetWidth/2 ))){

                currentSpot.style.left = `${currentSpot.offsetLeft - currentSpot.parentElement.offsetLeft}px`
                nextSpot.style.left = `${nextSpot.offsetLeft - nextSpot.parentElement.offsetLeft}px`
                
                console.log("DEAD");
                clearInterval(logInterval)
                clearInterval(carInterval)
            }
        }
    }
    
}

function moveFrog(e){
    moveSound.play();
    squares[currentRow-1].children[currentColumn-1].children[0].classList.remove('frog');
    switch(e.key){
        case 'ArrowLeft':
            if(currentColumn != 1) {
                console.log('ArrowLeft');
                currentColumn -= 1;
            }
            break;
        case 'ArrowRight':
            if(currentColumn != 10) {
                console.log('ArrowRight');
                currentColumn += 1;
            }
            break;
        case 'ArrowUp':
            if(currentRow != 1) {
                console.log('ArrowUp');
                currentRow -= 1;
            }
            break;
        case 'ArrowDown':
            if(currentRow != 10) {
                console.log('ArrowDown');
                currentRow += 1;
            }
            break;  
    }
    checkSpace();
    squares[currentRow-1].children[currentColumn-1].children[0].classList.add('frog')
}

document.addEventListener('keydown', moveFrog)

// calls moveObjects with road to move all objects on the roads
function moveCars(){
    moveObjects('road');
}

// calls moveObjects with river to move all objects on the rivers
function moveLogs(){
    moveObjects('river');
}
// move all objects that are in the environment specified
// this function works by removing the class of the object type (e.g. car, log)
// increases the column number of the object (or decreases if moving left)
// and adds the object type to the class list of the div with the newly advanced column number
function moveObjects(environment){

    //This will move the frog appropriately when it is on a log and the update log function is called.
    //Cannot go inside of the main for loop since it would be called for each log tile on the screen.
    if(environment == "river") {
        let frogLogSpace = document.getElementsByClassName("frog log");
        
        //If there is a div that has both the frog and log classes
        if(frogLogSpace.length != 0) {

            squares[currentRow-1].children[currentColumn-1].children[0].classList.remove('frog');

            if (board[currentRow-1].objects[0].direction < 0 && currentColumn != 1) {
                currentColumn -= 1;
            } else if (board[currentRow-1].objects[0].direction > 0 && currentColumn != 10) {
                currentColumn += 1;
            }

            squares[currentRow-1].children[currentColumn-1].children[0].classList.add('frog');

        }
    }

    for (var i = 0; i < board.length; i++){
        if(board[i].environment == environment){
            if (board[i].objects.length >= 1){

                let objects = board[i].objects;
                let rowDiv = squares[board[i].row];

                for(var j = 0; j < objects.length; j++){
                    // remove the object class (car or log) from the current square
                    removeClass(rowDiv, objects[j].column, objects[j].type);
                    // logs are 2 squares wide
                    if (objects[j].type == 'log'){
                        removeClass(rowDiv, objects[j].column + 1, objects[j].type);
                        removeClass(rowDiv, objects[j].column + 1, 'inverse');
                    }
                    // flip the image if moving left
                    if(objects[j].direction < 0){
                        removeClass(rowDiv, objects[j].column, 'left');
                        if (objects[j].type == 'log')
                            removeClass(rowDiv, objects[j].column + 1, 'left');
                    }
                    
                    // move objects by one grid square
                    objects[j].column += (1 * objects[j].direction + COLUMNS) % COLUMNS;
                    
                    // remove the object class (car or log) from the current square
                    addClass(rowDiv, objects[j].column, objects[j].type);
                    // logs are 2 squares wide
                    if (objects[j].type == 'log'){
                        addClass(rowDiv, objects[j].column + 1, objects[j].type);
                        addClass(rowDiv, objects[j].column + 1, 'inverse');
                    }
                    // flip the image if moving left
                    if(objects[j].direction < 0){
                        addClass(rowDiv, objects[j].column, 'left');
                        if (objects[j].type == 'log')
                            addClass(rowDiv, objects[j].column + 1, 'left');
                    }
                }
            }
        }
    }
    checkSpace();
}

// the following functions add/remove the className string
// to the classList of a specified column in the given rowDiv
// (columnNum + COLUMNS) % COLUMNS ensures the objects 
// loop back around instead of disappearing off screen
function addClass(rowDiv, columnNum, className){
    if(className == 'left')
        rowDiv.children[(columnNum + COLUMNS) % COLUMNS].classList.add(className);
    else
        rowDiv.children[(columnNum + COLUMNS) % COLUMNS].children[0].classList.add(className);
}

function removeClass(rowDiv, columnNum, className){
    if(className == 'left')
        rowDiv.children[(columnNum + COLUMNS) % COLUMNS].classList.remove(className);
    else
        rowDiv.children[(columnNum + COLUMNS) % COLUMNS].children[0].classList.remove(className);
}



/*
We want to keep the logs and cars moving continously, 
to do that we use setInterval(), which calls moveLogs 
function every 1 second or 1000ms and moveCars every 600ms.
*/
const logInterval = setInterval(moveLogs, 1000);
const carInterval = setInterval(moveCars, 600);