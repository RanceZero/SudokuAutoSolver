let width, height, x, y, qtdX, qtdY, squareSize;
let selectedCell = [0, 0];
let buscando = false

let matriz = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function setup(){
  width = windowWidth*0.97;
  height = windowHeight*0.97;
  canvas = createCanvas(width, height);
  qtdX = 9; // quantity of squares in row
  qtdY = 9; // quantity of squares in column
  squareSize = 50;
  x = width/2 - qtdX/2*squareSize;
  y = height/2 - qtdY/2*squareSize;
  button = createButton('Resolver');
  button.position(width/2-8, 35);
  button.mousePressed(iniciarBusca);
}

function iniciarBusca(){
  buscando = true
  button.remove()
  setInterval(sudokuStep, 1000);
}

function drawGrid(){

  // draw qtdX + 1 vertical lines
  for(let i = 0; i <= qtdX; i++){
    if(i % 3 == 0) strokeWeight(3);
    line(x + i*squareSize, y, x + i*squareSize, y+squareSize*qtdY);
    strokeWeight(1);
  }

  // draw qtdY + 1 horizontal lines
  for(let i = 0; i <= qtdY; i++){
    if(i % 3 == 0) strokeWeight(3);
    line(x, y + i*squareSize, x+squareSize*qtdX, y + i*squareSize);
    strokeWeight(1);
  }
}

function drawNumber(i, j, n){
  textSize(30);
  if(n != 0)
    text(n, x + j*squareSize + 16, y + i*squareSize + 38);
}

// fill sudoku grid with numbers
function fillGrid(){
  for(let i = 0; i < qtdX; i++){
    for(let j = 0; j < qtdY; j++){
      drawNumber(i, j, matriz[i][j]);
    }
  }
}

// get first blank space in sudoku grid
function getFirstBlank(){
  for(let i = 0; i < qtdX; i++){
    for(let j = 0; j < qtdY; j++) {
      if(matriz[i][j]==0){
        return [i, j];
      }
    }
  }
}

function sudokuStep(){
  let [row, col] = getFirstBlank();
  matriz[row][col] = matriz[row][col]+1;
}

function drawSelected(squareColor){
  let [i, j] = selectedCell;
  push();
  fill(squareColor);
  rect(x+j*squareSize, y+i*squareSize, squareSize, squareSize);
  pop();
}

function draw(){

  clear();

  if(!buscando){
    drawSelected(color(0, 0, 255, 100));
  }
  
  drawGrid();

  fillGrid();

}

function keyPressed() {
  
  if(buscando){
    return
  }

  let[i, j] = selectedCell;
  if(keyCode === LEFT_ARROW) {
    if(j > 0) j--;
  }
  else if(keyCode === RIGHT_ARROW) {
    if(j+1 < qtdX) j++;
  }
  else if(keyCode === UP_ARROW) {
    if(i > 0) i--;
  }
  else if(keyCode === DOWN_ARROW) {
    if(i+1 < qtdY) i++;
  }
  selectedCell = [i, j];
}

function keyTyped() {

  if(buscando){
    return
  }

  let [i, j] = selectedCell;
  if('0' <= key && key <= '9'){
    matriz[i][j] = parseInt(key);
  }
}
