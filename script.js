var bombs = [];
var score = 0;
var maxScore = 0;

document.getElementById('generate-grid').addEventListener('click', generateGrid);

function generateGrid() {
  var gridContainer = document.getElementById('grid-container');
  gridContainer.innerHTML = '';
  score = 0; 

  var difficulty = document.getElementById('difficulty').value;
  var gridSize = 0;
  var gridRows = 0;
  var gridColumns = 0;

  if (difficulty === '1') {
    gridSize = 100;
    gridRows = 10;
    gridColumns = 10;
  } else if (difficulty === '2') {
    gridSize = 81;
    gridRows = 9;
    gridColumns = 9;
  } else if (difficulty === '3') {
    gridSize = 64;
    gridRows = 8;
    gridColumns = 8;
  }

  maxScore = gridSize - 16; 

  gridContainer.style.gridTemplateColumns = `repeat(${gridColumns}, 1fr`;

  for (var i = 1; i <= gridSize; i++) {
    var cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.textContent = i;
    gridContainer.appendChild(cell);
  }

  var gridCells = document.getElementsByClassName('grid-cell');

  for (var i = 0; i < gridCells.length; i++) {
    gridCells[i].addEventListener('click', handleClick);
  }

  
  bombs = generateRandomBombs(gridSize, 16);
}

function handleClick(event) {
  var cell = event.target;
  var cellNumber = parseInt(cell.textContent);

  if (bombs.includes(cellNumber)) {
    cell.classList.add('bomb');
    endGame(false);
  } else {
    cell.classList.add('clicked');
    score++;
    document.getElementById('score').textContent = 'Punteggio: ' + score;

    if (score === maxScore) {
      endGame(true); 
    }
  }
}

function generateRandomBombs(gridSize, numBombs) {
  var bombs = [];
  while (bombs.length < numBombs) {
    var bomb = Math.floor(Math.random() * gridSize) + 1;
    if (!bombs.includes(bomb)) {
      bombs.push(bomb);
    }
  }
  return bombs;
}

function endGame(isWinner) {
  if (isWinner) {
    alert('Hai vinto! Punteggio: ' + score);
  } else {
    alert('Hai perso. Il tuo punteggio: ' + score);
  }
}
