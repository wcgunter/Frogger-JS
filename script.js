// Game constants and variables
let divRowsInGrid = document.querySelectorAll('.grid .row');
let currentColumn = 6;
let currentRow = 10;
const gameOverSound = new Audio('assets/audio_dead.mp3');
const moveSound = new Audio("assets/audio_move.mp3");


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