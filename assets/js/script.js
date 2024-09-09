//wait for the Dom to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    
    const choices = document.getElementsByClassName('choice'); //choices from button
    const resutDisplay = documnet.getElementById('result-text'); //game resut display
    const playerScoreDisplay = document.getElementById('player-score'); //player score display
    const computerScoreDisplay = document.getElementById('computer-score'); //Computer score display
    const triesDisplay = docment.getElementById('tries -text');//number of tries left

    let playerScore = 0; //score starts at 0
    let computerScore = 0; //score starts at 0
    let tries = 10; // limit tries at 10

// loop through choice button and add to event listenr
for (let choices of choices ){
    choices[i].addEventListener('click', function(event) {
        // Get the player choice from the clicked buttons
        let playerChoice = event.target.closest('button').id; 

        // Get the computer random choice
        let computerChoice = getComputerChoice();

        // Determine who won this round
        let winner = determineWinner(playerChoice, computerChoice);

        // Update scores based on the round winner
        updateScores(winner);

        // Decrease tries and update display
        tries -= 1; 
        triesDisplay.innerText = 'Tries left: ' + tries;

        // Display the round result
        updateDisplay(playerChoice, computerChoice, winner);

        // Check if the game should end
        if (tries <= 0) {
            endGame(); 
        }
    });
}

 // Function to get a random choice for the computer
 function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock']; // Available choices
    const randomIndex = Math.floor(Math.random() * choices.length); // Pick a random index
    return choices[randomIndex]; // Return the computer's choice
}