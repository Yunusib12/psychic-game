/* GLOBAL VARIABLES
============================================================= */

// Creating variables that will hold the number of wins, losses and remaining guesses
let wins = 0;
let losses = 0;
let guessesLeft = 9;
let userGuess;
let computerChoose;
let computerChoiceArray = [];
let userChoiceArray = [];
let win = false;
let lost = false;
let slap = new Audio("./assets/sounds/slap.mp3");
let thunder = new Audio("./assets/sounds/thunder.mp3");
let applause = new Audio("./assets/sounds/applause.mp3");
let boo = new Audio("./assets/sounds/boo.mp3");

// Create an array that lists out all of the letters options to guess from
let letterChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Create variables that holds references 
let winsText = document.getElementById("wins");
let lossesText = document.getElementById("losses");
let guessesLeftText = document.getElementById("guessesLeft");
let guessesText = document.getElementById("guessed");
let errorMessageText = document.getElementById("errorMessage");
let winLostMessageText = document.getElementById("winLostMessage");
errorMessageText.style.display = "none";
winLostMessageText.style.display = "none";

/* FUNCTIONS
============================================================= */

// Function run Computer choice and save the value in an array 
function computerChoice() {

    computerChoose = letterChoices[Math.floor(Math.random() * letterChoices.length)];

    computerChoiceArray.push(computerChoose);

}

// Function when it runs save the user choice into an array
function userChoice() {

    document.onkeyup = function(event) {

        errorMessageText.style.display = "none";
        winLostMessageText.style.display = "none";
        slap.pause();
        thunder.pause();
        applause.pause();
        boo.pause();

        // Now that user guessed a letter, we add the user choice to the user array       
        userGuess = event.key.toLowerCase();

        // Checking if the user guess a letter
        let isGuessedLetter = letterChoices.find(function(check) {
            return check === userGuess;
        });

        if (isGuessedLetter) {

            // Checking if the user already guessed the letter
            let isUserGuessedLetter = userChoiceArray.find(function(dcheck) {
                return dcheck === userGuess;
            });

            if (!isUserGuessedLetter) {

                userChoiceArray.push(userGuess);

                if (guessesLeft > 0) {

                    // Display Guessed user Array
                    guessesText.innerHTML = userChoiceArray.toString();

                    // Compare choices by calling the function
                    compareChoices();

                } else {
                    addlosses();
                }

            } else {
                slap.play();
                errorMessageText.style.display = "Block";
                errorMessageText.innerHTML = "You can't Guess the same Letter Twice !"
            }

        } else {
            slap.play();
            errorMessageText.style.display = "block";
            errorMessageText.innerHTML = "Only Letter allowed!";
        }
    };

}

// Function that compare User Guess and Computer Choice
function compareChoices() {

    if (userGuess === computerChoose) {

        wins++;
        winsText.innerHTML = wins;
        winLostMessageText.style.display = "block";
        winLostMessageText.innerHTML = "Yeaaaaaah '" + computerChoose.toUpperCase() + "' was the letter";
        applause.play();
        resetRestart();

    } else {

        reduceGuesses();
    }
}

// Function reduceGuesses 
function reduceGuesses() {

    guessesLeft--;
    guessesLeftText.innerHTML = guessesLeft;
    boo.play();
}

// Function add Losses
function addlosses() {

    losses++;
    lossesText.innerHTML = losses;
    winLostMessageText.style.display = "block";
    winLostMessageText.innerHTML = "Aaaggghh! '" + computerChoose.toUpperCase() + "' was the letter";
    thunder.play();
    resetRestart();
}


// Function that reset All and Restart the game
function resetRestart() {

    guessesLeft = 9;
    userChoiceArray = [];
    computerChoiceArray = [];
    guessesText.innerHTML = "";
    guessesLeftText.innerHTML = guessesLeft;

    computerChoice();
}


function isGameOver() {

    return;

}
/* MAIN PROCESS
============================================================= */

userChoice();
computerChoice();