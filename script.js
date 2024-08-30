let userScore = 0;
let compScore = 0;
let gameActive = false;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const newGameBtn = document.createElement("button");
const resetGameBtn = document.createElement("button");
const playAgainBtn = document.createElement("button");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }

  // Check if anyone has won 5 games
  if (userScore === 5 || compScore === 5) {
    gameActive = false;
    const winner = userScore === 5 ? "You" : "Computer";
    msg.innerText = `${winner} won the game!`;
    showPlayAgainButton();
  }
};

const playGame = (userChoice) => {
  if (!gameActive) return;

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "scissors";
    } else if (userChoice === "paper") {
      userWin = compChoice === "rock";
    } else if (userChoice === "scissors") {
      userWin = compChoice === "paper";
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

const showPlayAgainButton = () => {
  playAgainBtn.innerText = "Play Again";
  playAgainBtn.id = "play-again";
  document.body.appendChild(playAgainBtn);

  playAgainBtn.addEventListener("click", startNewGame);
};

const startNewGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  gameActive = true;
  playAgainBtn.remove();
};

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Game reset. Play your move";
  msg.style.backgroundColor = "#081b31";
  gameActive = true;
};

const initGame = () => {
  newGameBtn.innerText = "New Game";
  newGameBtn.id = "new-game";
  document.body.appendChild(newGameBtn);

  resetGameBtn.innerText = "Reset Game";
  resetGameBtn.id = "reset-game";
  document.body.appendChild(resetGameBtn);

  newGameBtn.addEventListener("click", startNewGame);
  resetGameBtn.addEventListener("click", resetGame);
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.id;
    playGame(userChoice);
  });
});

initGame();
