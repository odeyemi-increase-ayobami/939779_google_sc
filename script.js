let words = ["hello", "world", "coding", "games", "javascript"]; // Add more words 
let currentWord;
let score = 0;

const lettersDiv = document.getElementById("letters");
const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check");
const messageDiv = document.getElementById("message");
const scoreDiv = document.getElementById("score");

function newGame() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  const shuffledLetters = shuffle(currentWord.split("")); 
  lettersDiv.textContent = shuffledLetters.join(" ");
  guessInput.value = "";
  messageDiv.textContent = "";
}

function shuffle(array) { // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function checkGuess() {
  const guess = guessInput.value.toLowerCase();
  if (guess === currentWord) {
    messageDiv.textContent = "Correct!";
    score++;
    scoreDiv.textContent = "Score: " + score;
    newGame();
  } else {
    messageDiv.textContent = "Incorrect, try again.";
  }
}

checkButton.addEventListener("click", checkGuess);

newGame(); // Start the first game