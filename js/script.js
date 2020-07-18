let wrapper = document.querySelector(".wrapper");
let rowElements = document.querySelectorAll(".row");
let scoreText = document.querySelector(".score");
let blockElements = [];

for (let i = 0; i < rowElements.length; i++) {
  blockElements[i] = rowElements[i].querySelectorAll(".block");
}

let blocks;
let score;
let gameOver = false;

restart();

const newButton = document.querySelector(".new-button");

function restart() {
  blocks = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  gameOver = false;
  score = 0;

  randomBlock();
  randomBlock();

  draw();
}

function draw() {
  for (let i = 0; i < blockElements.length; i++) {
    for (let j = 0; j < blockElements[i].length; j++) {
      blockElements[i][j].className = "block text-" + blocks[i][j];
    }
  }

  scoreText.innerHTML = score.toString();

  if (gameOver) {
    wrapper.classList.add('active');
  } else {
    wrapper.classList.remove('active');
  }
}

function onKeydown(e) {
  if (gameOver) {
    return;
  }

  if (e.keyCode === 38) {
    if (up()) {
      randomBlock();
    }
  }

  if (e.keyCode === 40) {
    rotateBlocks();
    rotateBlocks();
    if (up()) {
      randomBlock();
    }
    rotateBlocks();
    rotateBlocks();

    draw();
  }

  if (e.keyCode === 39) {
    rotateBlocks();
    rotateBlocks();
    rotateBlocks();
    if (up()) {
      randomBlock();
    }
    rotateBlocks();

    draw();
  }

  if (e.keyCode === 37) {
    rotateBlocks();
    if (up()) {
      randomBlock();
    }
    rotateBlocks();
    rotateBlocks();
    rotateBlocks();

    draw();
  }

  if (e.keyCode === 82) {
    rotateBlocks();
    draw();
  }
}

function randomBlock() {
  if (checkFreeBlock()) {
    let i, j;

    i = Math.floor(Math.random() * 4);
    j = Math.floor(Math.random() * 4);

    while (blocks[i][j] !== 0) {
      i = Math.floor(Math.random() * 4);
      j = Math.floor(Math.random() * 4);
    }

    blocks[i][j] = 1;
  }

  gameOver = checkGameOver();
  draw();
}

function checkFreeBlock() {
  for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < blocks[i].length; j++) {
      if (blocks[i][j] === 0) {
        return true;
      }
    }
  }

  return false;
}

function up() {
  let valid = false;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (blocks[j][i] === 0) {
        continue;
      }

      for (let k = j + 1; k < 4; k++) {
        if (blocks[j][i] === blocks[k][i]) {
          blocks[j][i]++;
          score += 2 ** blocks[j][i];
          blocks[k][i] = 0;
          valid = true;
          break;
        }

        if (blocks[k][i] === 0) {
          continue;
        }

        if (blocks[j][i] !== blocks[k][i]) {
          break;
        }
      }
    }

    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < j; k++) {
        if (blocks[k][i] === 0) {
          blocks[k][i] = blocks[j][i];
          blocks[j][i] = 0;
          valid = true;
          break;
        }
      }
    }
  }

  return valid;
}

function rotate(a) {
  let b = [[], [], [], []];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      b[j][4 - i - 1] = a[i][j];
    }
  }

  return b;
}

function rotateBlocks() {
  blocks = rotate(blocks);
}

function checkGameOver() {
  for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < blocks[i].length; j++) {
      if (
        blocks[i][j] === 0 ||
        blocks[i][j] === blocks[i][j + 1] ||
        (blocks[i + 1] && blocks[i][j] === blocks[i + 1][j])
      ) {
        return false;
      }
    }
  }

  return true;
}

newButton.addEventListener("click", restart);

window.addEventListener("keydown", onKeydown);
