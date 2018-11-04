let width, height, x, y, qtdX, qtdY, squareSize;
let selectedCell = [0, 0];
let buscando = false;

let delay = 1; // velocidade da busca

let matrizDesenho = [
  [7, 3, 5, 6, 1, 4, 8, 9, 2],
  [8, 4, 2, 9, 7, 3, 5, 6, 1],
  [9, 6, 1, 2, 8, 5, 3, 7, 4],
  [2, 8, 6, 3, 4, 9, 1, 5, 7],
  [4, 1, 3, 8, 5, 7, 9, 2, 6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/*

Algumas matrizes para testar:

  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]

  [7, 3, 5, 6, 1, 4, 8, 9, 2],
  [8, 4, 2, 9, 7, 3, 5, 6, 1],
  [9, 6, 1, 2, 8, 5, 3, 7, 4],
  [2, 8, 6, 3, 4, 9, 1, 5, 7],
  [4, 1, 3, 8, 5, 7, 9, 2, 6],
  [5, 7, 9, 1, 2, 6, 4, 3, 8],
  [1, 5, 7, 4, 9, 2, 6, 8, 3],
  [6, 9, 4, 7, 3, 8, 2, 1, 5],
  [3, 2, 8, 5, 6, 1, 7, 4, 9]

  [7, 3, 5, 6, 1, 4, 8, 9, 2],
  [8, 4, 2, 9, 7, 3, 5, 6, 1],
  [9, 6, 1, 2, 8, 5, 3, 7, 4],
  [2, 8, 6, 3, 4, 9, 1, 5, 7],
  [4, 1, 3, 8, 5, 7, 9, 2, 6],
  [5, 7, 9, 1, 2, 6, 4, 3, 8],
  [1, 5, 7, 4, 9, 2, 6, 8, 3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]

  [7, 3, 5, 6, 1, 4, 8, 9, 2],
  [8, 4, 2, 9, 7, 3, 5, 6, 1],
  [9, 6, 1, 2, 8, 5, 3, 7, 4],
  [2, 8, 6, 3, 4, 9, 1, 5, 7],
  [4, 1, 3, 8, 5, 7, 9, 2, 6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]

*/

let editavel = null;
let fronteira = null;
let explorados = null;

function buscaCegaInit(){
  buscando = true;
  button.remove();
  editavel = [];
  for(let i = 0; i < qtdX; i++){
    editavel.push([]);
    for(let j = 0; j < qtdY; j++){
      editavel[i].push(matrizDesenho[i][j] === 0);
    }
  }
  concluido = false;
  fronteira = [];
  explorados = [];
  inicial = copiaMatriz(matrizDesenho);
  fronteira.push(inicial);
  buscaCegaTimer = setInterval(buscaCegaLoop, delay);
}

function buscaCegaLoop(){
  if(fronteira.length == 0){
    clearInterval(buscaCegaTimer);
    console.log('FAIL');
    return;
  }
  buscaCegaStep();
  if(concluido){
    clearInterval(buscaCegaTimer);
    console.log('SUDOKU RESOLVIDO');
    return;
  }
}

function buscaCegaStep(){
  let atual = fronteira.pop();
  matrizDesenho = copiaMatriz(atual);
  explorados.push(atual);
  concluido = (qtdElementos(atual) === 81) // meta
  let sucessores = getSucessores(atual);
  for(let i = 0; i < sucessores.length; i++){
      fronteira.push(sucessores[i]);
  }
}

// quantidade de celulas preenchidas de um tabuleiro
function qtdElementos(matriz){
  let count = 0;
  for(let i = 0; i < qtdX; i++){
    for(let j = 0; j < qtdY; j++){
      if(matriz[i][j] !== 0)
        count++;
    }
  }
  return count;
}

// retorna lista de matrizes sucessoras
function getSucessores(matriz){
  let sucessores = [];
  for(let i = qtdX-1; i >= 0; i--){
    for(let j = qtdY-1; j >= 0; j--){
      for(let k = 9; k >= 1; k--){
        if(editavel[i][j] && movimentoValido(matriz, i, j, k)){
          let suc = copiaMatriz(matriz);
          suc[i][j] = k;
          if(!pertence(explorados, suc) && !pertence(fronteira, suc)){
            sucessores.push(suc);
          }
        }
      }
    }
  }
  return sucessores;
}

// verifica se pode colocar o numero k na posicao m[i][j]
function movimentoValido(m, i, j, k){
  // linha
  for(let a = 0; a < qtdX; a++)
    if(m[i][a] === k) return false;
  // coluna
  for(let a = 0; a < qtdY; a++)
    if(m[a][j] === k) return false;
  // quadrado
  let I = Math.trunc(i/3)*3;
  let J = Math.trunc(j/3)*3;
  for(let a = I; a < I+3; a++)
    for(let b = J; b < J+3; b++)
      if(m[a][b] === k) return false;

  return true;
}

// verifica se uma matriz pertence a uma lista
function pertence(lista, matriz){
  for(let i = 0; i < lista.length; i++){
    if(matrizIgual(lista[i], matriz))
      return true;
  }
  return false;
}

// compara matrizes
function matrizIgual(a, b){
  for(let i = 0; i < qtdX; i++){
    for(let j = 0; j < qtdY; j++){
      if(a[i][j] !== b[i][j])
        return false;
    }
  }
  return true;
}

// retorna a copia de uma matriz
function copiaMatriz(m){
  let c = [];
  for(let i = 0; i < qtdX; i++){
    c.push([]);
    for(let j = 0; j < qtdY; j++){
      c[i].push(m[i][j]);
    }
  }
  return c;
}

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
  button.position(width/2-button.size().width/2, 35);
  button.mousePressed(buscaCegaInit);
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
      drawNumber(i, j, matrizDesenho[i][j]);
    }
  }
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
    return;
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
    return;
  }

  let [i, j] = selectedCell;
  if('0' <= key && key <= '9' && movimentoValido(matrizDesenho, i, j, parseInt(key))){
    matrizDesenho[i][j] = parseInt(key);
  }
}
