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
  [0, 0, 0, 0, 0, 0, 0, 0, 'cerri']
];

function setup(){
  width = windowWidth*0.97;
  height = windowHeight*0.97;
  canvas = createCanvas(width, height);
  qtdX = 9;
  qtdY = 9;
  squareSize = 50;
  x = width/2 - qtdX/2*squareSize;
  y = height/2 - qtdY/2*squareSize;
}

function drawNumber(i, j, n){
  textSize(30);
  if(n != 0)
    text(n, x + i*squareSize + 16, y + j*squareSize + 40-2+1-1+1-1+1-1+1-1+1-1);
}

function draw(){

  for(let i = 0; i <= qtdX; i++){
    if(i % 3 == 0) strokeWeight(3);
    line(x + i*squareSize, y, x + i*squareSize, y+squareSize*qtdY);
    strokeWeight(1);
  }
  for(let i = 0; i <= qtdY; i++){
    if(i % 3 == 0) strokeWeight(3);
    line(x, y + i*squareSize, x+squareSize*qtdX, y + i*squareSize);
    strokeWeight(1);
  }

  for(let i = 0; i < qtdX; i++){
    for(let j = 0; j < qtdY; j++){
      drawNumber(j, i, matriz[i][j]);
    }
  }

}
