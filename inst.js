const game = document.getElementById('game_board');
const reset = document.getElementById('btnReset');
let snake = ['139', '140'];
let border = [];
let head = 141;
let direction;
let interval = 350;
let apple;
let score = 0;
let scoreMaxim = 0;

document.addEventListener('keydown', onKeyDown);
document.addEventListener('click', resetGame); 
let timer = setInterval(gameMovement, interval);
createGameBoard();

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

function resetGame() {
  for (let i = 0; i < snake.length; ++i) {
    p = document.getElementById(snake[i]);
    p.style.backgroundColor = 'aquamarine';
  }
  let a = document.getElementById(apple);
  a.style.backgroundColor = 'aquamarine';
  btnReset.disabled = true;
  timer = setInterval(gameMovement, interval);
  snake = ['139', '140'];
  head = 141;
  direction = '';
  interval = 350;
  score = 0;
  document.getElementById('score').textContent = "Scor:" + score;
  createSnake(snake);
}

function createSnake(snake) {
  for (let i = 0; i < snake.length; ++i) {
    p = document.getElementById(snake[i]);
    p.style.backgroundColor = 'rgb(54, 48, 220)';
  }
  food();
}

function createGameBoard() {
  let cont = 1;
  for (let i = 0; i <= 17; i++) {
    for (let j = 0; j <= 16; ++j) {
      let e = document.createElement("div");
      e.setAttribute('l', i);
      e.setAttribute('c', j);
      if (i == 0 || i == 17 || j == 0 || j == 16) {
        border.push(cont);
      }
      e.setAttribute('id', cont);
      ++cont;
      game.appendChild(e);
    }   
  }
  createSnake(snake);
}

function gameMovement() {
  let n = Number(document.getElementById(head).id);
  let h = document.getElementById(head);
  let x = document.getElementById(snake[0]);
  let vertical = 17;
  if (gameOver(n)) {
    clearInterval(timer);
    btnReset.disabled = false;
    alert("Game Over!");
    scoreCalcul();
    return;
  }
  switch(direction){
    case 'r':
      head = head + 1;
      snake.push(n);
      snake.shift();
      break
    case 'l':
      head = head - 1;
      snake.push(n);
      snake.shift();
      break
    case 'u':
      head = head - vertical;
      snake.push(n);
      snake.shift();
      break
    case 'd':
      head = head + vertical;
      snake.push(n);
      snake.shift();
      break
  } 
  if (h.style.backgroundColor == 'rgb(54, 48, 220)') {
    snake.push(n);
    food();
    ++score;
  }
  x.style.backgroundColor = 'aquamarine';
  for (let i = 0; i < snake.length; ++i) {
    p = document.getElementById(snake[i]);
    p.style.backgroundColor = 'rgb(54, 48, 220)';
  }
}


function gameOver(head) {
  if (border.includes(head) || snake.includes(head)) {
    return true;
  } 
}
  
function food() {
  let min = 1;
  let max = 240;
  apple = Math.floor(Math.random() * (max - min) + min);
  if (border.includes(apple) || snake.includes(apple)) {
    food();
  } 
  let p = document.getElementById(apple);
  p.style.backgroundColor = 'rgb(54, 48, 220)';
}

function scoreCalcul() {
  if (score > scoreMaxim) {
    document.getElementById('scor_maxim').textContent = "Maximum score:" + score;
    scoreMaxim = score;
  } 
  document.getElementById('score').textContent = "Score:" + score;
}