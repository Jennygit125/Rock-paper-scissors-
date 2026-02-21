//js file for rock paper scissors game 
(function () {
    // first declared everything I need to manipulate in the DOM and set up variables for scores and rounds
    const rock = document.getElementById("rock");
    const paper = document.getElementById("paper");
    const scissors = document.getElementById("scissors");
    const playerchoice = document.getElementById("player-choice");
    const computerchoice = document.getElementById("computer-choice");
    const playerScore = document.getElementById("player-score");
    const computerScore = document.getElementById("computer-score");
    const resultText = document.getElementById("result-text");
    const matchResultEl = document.getElementById("match-result");
    let playerScoreCount = 0;
    let computerScoreCount = 0;
    let round = 0;
    const maxRounds = 5;
    let finalMessage = '';

    function updateScoresAndCheck(winner) {
        if (winner === 'player') playerScoreCount++;
        else if (winner === 'computer') computerScoreCount++;
        // only count rounds for decisive outcomes
        if (winner === 'player' || winner === 'computer') round++;
        if (playerScore && playerScore.textContent !== "Player: " + playerScoreCount) playerScore.textContent = "Player: " + playerScoreCount;
        if (computerScore && computerScore.textContent !== "Computer: " + computerScoreCount) computerScore.textContent = "Computer: " + computerScoreCount;
        console.log(`Round ${round}: Player ${playerScoreCount} - Computer ${computerScoreCount}`);
        if (round >= maxRounds) {

            if (playerScoreCount > computerScoreCount) {
                finalMessage = "Match over: You won the match!";
                console.log(finalMessage);
            } else if (computerScoreCount > playerScoreCount) {
                finalMessage = "Match over: Computer won the match!";
                console.log(finalMessage);
            } else {
                finalMessage = "Match over: It's a tie!";
                console.log(finalMessage);
            }
            if (matchResultEl) {
                    // replaced inner HTML to avoid duplicate buttons on repeated matches
                    matchResultEl.innerHTML = `${finalMessage} <button id="replay-btn" style="margin-left:10px">Replay</button>`;
                    const replayBtn = document.getElementById('replay-btn');
                    if (replayBtn) {
                        replayBtn.addEventListener('click', () => {
                            if (matchResultEl) matchResultEl.innerHTML = '';
                            playerScoreCount = 0;
                            computerScoreCount = 0;
                            round = 0;
                            if (playerScore) playerScore.textContent = 'Player: 0';
                            if (computerScore) computerScore.textContent = 'Computer: 0';
                            if (resultText) resultText.textContent = 'Make your choice!';
                        });
                    }
            }
            playerScoreCount = 0;
            computerScoreCount = 0;
            round = 0;
        }
    }
    function getComputerChoice() {
        const choices = ["rock", "paper", "scissors"];
        return choices[Math.floor(Math.random() * choices.length)];
    }

    // event delegation for button clicks on rock, paper, scissors
    const choicesContainer = document.querySelector('.choices');
    if (choicesContainer) {
        choicesContainer.addEventListener('click', (e) => {
            const btn = e.target;
            if (!btn || btn.tagName !== 'BUTTON') return;
            const id = btn.id;
            if (!id) return;
            const playerChoice = id; // 'rock' | 'paper' | 'scissors'
            const computerChoice = getComputerChoice();
            if (playerchoice) playerchoice.textContent = "Player: " + playerChoice;
            if (computerchoice) computerchoice.textContent = "Computer: " + computerChoice;

            if (playerChoice === computerChoice) {
                if (resultText) resultText.textContent = "It's a tie!";
                updateScoresAndCheck('tie');
                return;
            }

            const playerWins = (
                (playerChoice === 'rock' && computerChoice === 'scissors') ||
                (playerChoice === 'paper' && computerChoice === 'rock') ||
                (playerChoice === 'scissors' && computerChoice === 'paper')
            );

            if (playerWins) {
                if (resultText) resultText.textContent = "You win!";
                updateScoresAndCheck('player');
            } else {
                if (resultText) resultText.textContent = "Computer wins!";
                updateScoresAndCheck('computer');
            }
        });
    }

})();
