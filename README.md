# SudokuAutoSolver

Solucionador de Sudoku usando estratégias de busca vistas na aula de Inteligência Artificial.

O projeto foi desenvolvido em javascript com o auxílio da biblioteca para desenhos [p5js](https://p5js.org/).

Para executá-lo basta entrar na pasta _src_ e abrir o arquivo _sudoku.html_ no seu navegador.

É possível preencher a matriz do sudoku inserindo números pelo teclado, e mover-se a célula selecionada com as setinhas. Nota-se que não é possível preencher o sudoku de forma a quebrar sua regra de colocação de números.

Há dois botões, um para resolver o Sudoku por meio de busca cega, e outro por meio de informada. A partir do momento em que qualquer um é clicado não é possível mais inserir valores na matriz e os valores inseridos(não modificáveis) tem sua célula com fundo cinza.

Em ambas as buscas se contabiliza o tempo que decorreu desde seu início até o seu término, podendo este ser visualizado ao final da execução no log do console do navegado; se utiliza uma matriz fixa para ser desenhada na tela (matrizDesenho); e se separa as matrizes possíveis em categorias, sendo estas pertencentes ao array _explorados_ caso já tenha-se passado por elas na busca e _fronteira_, para as próximas a serem exploradas.

## Busca Cega - Busca em Profundidade

A busca cega implementada é a de DFS (Depth First Search), ou Busca em Profundidade.

A busca em profundidade implementada busca a primeira célula em branco e coloca em uma pilha todas as matrizes possíveis de acordo com os números que podem ser colocados nesta célula (fronteira), prosseguindo-se então para um próximo estado com uma dessas possíveis matrizes e voltando-se a buscar o primeiro espaço em branco. Ao não encontrar possibilidades de números e um espaço em branco ocorre o bracktracking, pois se retira uma das matrizes acumuladas na fronteira e a coloca como estado atual.

## Busca Informada - A*