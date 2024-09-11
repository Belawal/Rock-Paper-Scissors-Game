// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    const choices = document.getElementsByClassName('choice'); // Choices from buttons
    const resultDisplay = document.getElementById('result-text'); // Game result display
    const playerScoreDisplay = document.getElementById('player-score'); // Player score display
    const computerScoreDisplay = document.getElementById('computer-score'); // Computer score display
    const triesDisplay = document.getElementById('tries-text'); // Number of tries left display

    let playerScore = 0; // Score starts at 0
    let computerScore = 0; // Score starts at 0
    let tries = 10; // Limit tries to 10

    // Function to handle the behavior of clicked buttons
    function handleClick(event) {
        // Get the player choice from the clicked button's data attribute
        let playerChoice = event.target.closest('button').dataset.choice; 
        
        // Get the computer's random choice
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
    }

    // Add the click event listener to each button
    for (let choice of choices) {
        choice.addEventListener('click', handleClick);
    }

    // Function to get a random choice for the computer
    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock']; // Available choices
        const randomIndex = Math.floor(Math.random() * choices.length); // Pick a random index
        return choices[randomIndex]; // Return the computer's choice
    }

    // Function to determine the winner of the round
    function determineWinner(player, computer) {
        if (player === computer) {
            return 'draw'; // It's a draw if choices are the same
        } else if (player === 'rock') {
            if (computer === 'scissors' || computer === 'lizard') {
                return 'player'; // Rock beats scissors and lizard
            } else {
                return 'computer'; // Rock loses to paper and spock
            }
        } else if (player === 'paper') {
            if (computer === 'rock' || computer === 'spock') {
                return 'player'; // Paper beats rock and spock
            } else {
                return 'computer'; // Paper loses to scissors and lizard
            }
        } else if (player === 'scissors') {
            if (computer === 'paper' || computer === 'lizard') {
                return 'player'; // Scissors beat paper and lizard
            } else {
                return 'computer'; // Scissors lose to rock and spock
            }
        } else if (player === 'lizard') {
            if (computer === 'spock' || computer === 'paper') {
                return 'player'; // Lizard beats spock and paper
            } else {
                return 'computer'; // Lizard loses to rock and scissors
            }
        } else if (player === 'spock') {
            if (computer === 'scissors' || computer === 'rock') {
                return 'player'; // Spock beats scissors and rock
            } else {
                return 'computer'; // Spock loses to paper and lizard
            }
        }
    }

    // Function to update scores based on the round winner
    function updateScores(winner) {
        if (winner === 'player') {
            playerScore += 1; // Increment player score if player wins
        } else if (winner === 'computer') {
            computerScore += 1; // Increment computer score if computer wins
        }

        // Update the score display elements with the current scores
        playerScoreDisplay.textContent = 'Player: ' + playerScore;
        computerScoreDisplay.textContent = 'Computer: ' + computerScore;
    }

    // Function to update the display after each round
    function updateDisplay(playerChoice, computerChoice, winner) {
        // Display the player's choice, computer's choice, and the round result
        resultDisplay.innerHTML = 'You chose ' + playerChoice + ', Computer chose ' + computerChoice + '. ';
        if (winner === 'draw') {
            resultDisplay.innerHTML += "It's a draw!";
        } else if (winner === 'player') {
            resultDisplay.innerHTML += "You win!";
        } else {
            resultDisplay.innerHTML += "Computer wins!";
        }
    }

    // Function to handle the end of the game
    function endGame() {
        // Disable all choice buttons
        for (let choice of choices) {
            choice.disabled = true;
        }

        // Determine the final winner based on scores and display a final message
        let finalMessage = '';
        if (playerScore > computerScore) {
            finalMessage = 'Congratulations! You won the game! 🎉';
        } else if (playerScore < computerScore) {
            finalMessage = 'Sorry, you lost the game. Better luck next time!';
        } else {
            finalMessage = "It's a draw overall!";
        }

        // Append the final message to the result display
        resultDisplay.innerHTML += '<br><strong>' + finalMessage + '</strong>';
    }
});
