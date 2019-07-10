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

// Create an array that lists out all of the letters options to guess from
let letterChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Create variables that holds references 
let winsText = document.getElementById("wins");
let lossesText = document.getElementById("losses");
let guessesLeftText = document.getElementById("guessesLeft");
let guessesText = document.getElementById("guessed");

/* FUNCTIONS
============================================================= */

// Function run Computer choice and save the value in an array 
function computerChoice() {

    computerChoose = letterChoices[Math.floor(Math.random() * letterChoices.length)];

    computerChoiceArray.push(computerChoose);

    console.log(computerChoiceArray);

}

// Function when it runs save the user choice into an array
function userChoice() {

    document.onkeyup = function (event) {
        
        // Now that user guessed a letter, we add the user choice to the user array       
        userGuess = event.key.toLowerCase();
        userChoiceArray.push(userGuess); 
        
        // Checking if the user guess a letter
        let isGuessedLetter = letterChoices.find(function(check) {
            return check === userGuess;
        });

        // Checking if the user already guessed the letter
        let isUserGuessedLetter = userChoiceArray.find(function(dcheck) {
            return dcheck === userGuess;
        });
            alert(isUserGuessedLetter);
        if (isGuessedLetter && !isGuessedLetter) {

            if (guessesLeft > 0) {
    
                // Display Guessed user Array
                guessesText.innerHTML = userChoiceArray.toString();
    
                // Compare choices by calling the function
                compareChoices();

            } else {

                addlosses();
            }

        } else {
            alert("Only Letter allowed!");
        }
    };

}

// Function that compare User Guess and Computer Choice
function compareChoices() {

    if (userGuess === computerChoose) {

        wins++;
        winsText.innerHTML = wins;

        resetRestart();

    } else {

        reduceGuesses();
    }
}

// Function reduceGuesses 
function reduceGuesses() {

    guessesLeft--;
    guessesLeftText.innerHTML = guessesLeft;
}

// Function add Losses
function addlosses() {

    losses++;
    lossesText.innerHTML = losses;
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



/* MAIN PROCESS
============================================================= */

userChoice();
computerChoice();


