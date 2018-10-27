let width, height, x, y, qtdX, qtdY, squareSize;

let matriz = [
  [0, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 9, 0],
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
  let coordinate = getFirstBlank();
  row = coordinate[0];
  col = coordinate[1];
  matriz[row][col] = matriz[row][col]+1;
}

function draw(){

  frameRate(0.5);

  clear();

  drawGrid();

  fillGrid();

  sudokuStep();

}
