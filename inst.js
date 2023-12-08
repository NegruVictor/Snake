// Get references to HTML elements
const game = document.getElementById('game_board');
const resetButton = document.getElementById('btnReset');

// Initial snake configuration and game state
let snake = ['139', '140'];
let border = [];
let head = 141;
let direction;
let interval = 350;
let apple;
let score = 0;
let scoreMaxim = 0;

// Event listeners for keyboard input and reset button click
document.addEventListener('keydown', onKeyDown);
document.addEventListener('click', resetGame);

// Set up the game timer and initial game board
let timer = setInterval(gameMovement, interval);
createGameBoard();

// Handle keyboard input to change snake direction
function onKeyDown(e) {
  switch (e.key) {
    case 'ArrowRight':
      direction = 'r';
      break;
    case 'ArrowLeft':
      direction = 'l';
      break;
    case 'ArrowUp':
      direction = 'u';
      break;
    case 'ArrowDown':
      direction = 'd';
      break;
  }
}

// Reset the game state when the reset button is clicked
function resetGame() {
  for (let i = 0; i < snake.length; ++i) {
    const snakeCell = document.getElementById(snake[i]);
    snakeCell.style.backgroundColor = 'aquamarine';
  }
  const appleCell = document.getElementById(apple);
  appleCell.style.backgroundColor = 'aquamarine';
  resetButton.disabled = true;
  timer = setInterval(gameMovement, interval);
  snake = ['139', '140'];
  head = 141;
  direction = '';
  interval = 350;
  score = 0;
  document.getElementById('score').textContent = "Score:" + score;
  createSnake(snake);
}

// Create the initial snake on the game board
function createSnake(snake) {
  for (let i = 0; i < snake.length; ++i) {
    const snakeCell = document.getElementById(snake[i]);
    snakeCell.style.backgroundColor = 'rgb(54, 48, 220)';
  }
  // Place the initial food on the game board
  food();
}

// Create the initial game board layout
function createGameBoard() {
  const BOARD_ROWS = 17;
  const BOARD_COLS = 16;
  let cellCount = 1;

  // Loop through rows and columns to create the game board
  for (let row = 0; row <= BOARD_ROWS; row++) {
    for (let col = 0; col <= BOARD_COLS; ++col) {
      let cell = document.createElement("div");
      cell.setAttribute('l', row);
      cell.setAttribute('c', col);

      // Identify border cells and store their IDs
      if (row === 0 || row === BOARD_ROWS || col === 0 || col === BOARD_COLS) {
        border.push(cellCount);
      }
      cell.setAttribute('id', cellCount);
      ++cellCount;
      game.appendChild(cell);
    }   
  }
  // Create the initial snake on the game board
  createSnake(snake);
}

// Move the snake and handle game logic
function gameMovement() {
  let currentHeadId = Number(document.getElementById(head).id);
  let currentHeadCell = document.getElementById(head);
  let firstSnakeCell = document.getElementById(snake[0]);
  let verticalCell = 17;

  // Check if the game is over
  if (gameOver(currentHeadId)) {
    clearInterval(timer);
    resetButton.disabled = false;
    alert("Game Over!");
    scoreCalcul();
    return;
  }

  // Move the snake based on the current direction
  switch(direction) {
    case 'r':
      head = head + 1;
      snake.push(currentHeadId);
      snake.shift();
      break;
    case 'l':
      head = head - 1;
      snake.push(currentHeadId);
      snake.shift();
      break;
    case 'u':
      head = head - verticalCell;
      snake.push(currentHeadId);
      snake.shift();
      break;
    case 'd':
      head = head + verticalCell;
      snake.push(currentHeadId);
      snake.shift();
      break;
  } 
  
  // Check if the snake eats the food
  if (currentHeadCell.style.backgroundColor == 'rgb(54, 48, 220)') {
    snake.push(currentHeadId);
    food();
    ++score;
  }

  // Update the display of the game board
  firstSnakeCell.style.backgroundColor = 'aquamarine';
  for (let i = 0; i < snake.length; ++i) {
    snakeCell = document.getElementById(snake[i]);
    snakeCell.style.backgroundColor = 'rgb(54, 48, 220)';
  }
}

// Check if the game is over
function gameOver(head) {
  return border.includes(head) || snake.includes(head);
}

// Generate a new food item on the game board
function food() {
  let minCellId = 1;
  let maxCellId = 240;
  apple = Math.floor(Math.random() * (maxCellId - minCellId) + minCellId);
  if (border.includes(apple) || snake.includes(apple)) {
    food();
  } 
  let appleCell = document.getElementById(apple);
  appleCell.style.backgroundColor = 'rgb(54, 48, 220)';
}

// Calculate and display the current and maximum scores
function scoreCalcul() {
  if (score > scoreMaxim) {
    document.getElementById('scor_maxim').textContent = "Maximum score:" + score;
    scoreMaxim = score;
  } 
  document.getElementById('score').textContent = "Score:" + score;
}
