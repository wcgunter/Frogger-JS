// Game constants and variables
// select all the rows - 10 rows - each row has 10 children (10 columns)
let divRowsInGrid = document.querySelectorAll('.grid .row');
// frog start position
let currentColumn = 6;
let currentRow = 10;
const gameOverSound = new Audio('assets/audio_dead.mp3');
const moveSound = new Audio("assets/audio_move.mp3");

let board = [
    {
        row: 1, 
        environment: 'grass', 
        objects: [] 
    },
    { 
        row: 2, 
        environment: 'river', 
        objects: [{ start: 0, end: 0, image: "url"}, { start: 3, end: 3, image: "url"}] 
    },
    { 
        row: 3, 
        environment: 'river', 
        objects: [] 
    },
    { 
        row: 4, 
        environment: 'river', 
        objects: [] 
    },
    { 
        row: 5, 
        environment: 'grass', 
        objects: [] 
    },
    { 
        row: 6, 
        environment: 'road', 
        objects: [] 
    },
    { 
        row: 7, 
        environment: 'road', 
        objects: [] 
    },
    { 
        row: 8, 
        environment: 'road', 
        objects: [] 
    },
    { 
        row: 9, 
        environment: 'grass', 
        objects: [] 
    },
    { 
        row: 10, 
        environment: 'grass', 
        objects: [] 
    }];

for (let i = 0; i < divRowsInGrid; i++){
    divRowsInGrid[i].classList.add(board[i].environment);
}

function moveFrog(e){
    moveSound.play();
    divRowsInGrid[currentRow-1].children[currentColumn-1].classList.remove('frog');
    switch(e.key){
        case 'ArrowLeft':
            console.log('Move left');
            currentColumn -= 1;
            break;
        case 'ArrowRight':
            console.log('Move right');
            currentColumn += 1;
            break;
        case 'ArrowUp':
            console.log('Move Up');
            currentRow -= 1;
            break;
        case 'ArrowDown':
            console.log('Move left');
            currentRow += 1;
            break;  
    }
    divRowsInGrid[currentRow-1].children[currentColumn-1].classList.add('frog');
}

document.addEventListener('keydown', moveFrog)