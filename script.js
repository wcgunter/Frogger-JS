// Game constants and variables
let divSquaresInGrid = document.querySelectorAll('.grid div');
let currentIndex = 76; // Because 76 is the position of the starting-block 
const wideness = 9;
const gameOverSound = new Audio('assets/audio_dead.mp3');
const moveSound = new Audio("assets/audio_move.mp3");


function moveFrog(e){
    moveSound.play();
    divSquaresInGrid[currentIndex].classList.remove('frog');
    switch(e.key){
        case 'ArrowLeft':
            console.log('Move left');
            currentIndex -= 1;
            break;
        case 'ArrowRight':
            console.log('Move right');
            currentIndex += 1;
            break;
        case 'ArrowUp':
            console.log('Move Up');
            currentIndex -= wideness;
            break;
        case 'ArrowDown':
            console.log('Move left');
            currentIndex += wideness;
            break;  
    }

    divSquaresInGrid[currentIndex].classList.add('frog');

}

document.addEventListener('keydown', moveFrog)