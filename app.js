/**
 * Game: Guess the number 
 */

let min = 1, max = 10, winnerNumber = getRandomNumber(min,max), guessesLeft = 3;

// defining the UI variable

const game =  document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessbtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guessInput');
const result = document.querySelector('.message');

// Assigning UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Calling all event listeners
loadAllEventListeners();
function loadAllEventListeners(){
    // Guess the number function
    guessbtn.addEventListener('click', checkTheNumber);
    // Play Again - this will be function delegation
    game.addEventListener('mousedown', playAgain);
}

function checkTheNumber(e){
    let guessedNumber = parseInt(guessInput.value);
    
    if(isNaN(guessedNumber) || guessedNumber<min || guessedNumber>max){
        setMessage(`Please set a number between ${min} and ${max}`, 'red');
    }else{
        if(guessedNumber === winnerNumber){
            //disable input and set green color
            gameComplete(true,`You win ! ${winnerNumber} is correct !`);
        }else{
            guessesLeft -= 1;
            if(guessesLeft === 0){
                //game over
                gameComplete(false,`No more guesses left, you lost. Answer was ${winnerNumber}`);
            }else{
                //continue game
                continueGame(true,`You have only ${guessesLeft} guesses left..`);
            }
        }
    }
}

function setMessage(msg, color){
    //show error message
    result.style.color = color;
    result.textContent = msg;
}

function gameComplete(wonGame, msg){

    //check won or not
    let color;
    wonGame === true ? color = 'green': color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(msg, color);

    //If complete - then play again 
    guessbtn.value = 'Play Again !';
    guessbtn.classList.add('play-again');
}

function continueGame(gameContinue,msg){
    guessInput.style.borderColor = 'red';
    guessInput.value = '';
    setMessage(msg,'red');
}

function playAgain(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
}

// We can call function before actually defining them because of Hoisting in JavaScript
function getRandomNumber(min, max){
    const num = Math.floor(Math.random()*((max-min+1)+min)); // gives us range
    return num;
}