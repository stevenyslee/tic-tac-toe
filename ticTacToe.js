const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];
let count = 0;
let player = 'X';

const updateBoard = (row, column, piece) => {
  if (board[row][column] !== ' ') {
    return false;
  }
  board[row][column] = piece;
  return true;
}

const resetBoard = () => {
  board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];
  return true;
}

const checkWin = () => {
  return checkRowWin() || checkColumnWin() || checkDiagonalWin();
};

const checkRowWin = () => {
  for (let i = 0; i < 3; i++) {
    if ( board[i][0] !== ' ' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return true;
    }
  }
  return false;
};

const checkColumnWin = () => {
  for (let i = 0; i < 3; i++) {
    if ( board[0][i] !== ' ' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return true;
    }
  }
  return false;
};

const checkDiagonalWin = () => {
  if (board[0][0] !== ' ' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return true;
  } else if (board[0][2] !== ' ' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return true;
  }
  return false;
};

const printBoard = () => {
  console.log(`  0   1   2`);
  console.log(`0 ${board[0][0]} | ${board[0][1]} | ${board[0][2]}`);
  console.log(`  --|---|--`);
  console.log(`1 ${board[1][0]} | ${board[1][1]} | ${board[1][2]}`);
  console.log(`  --|---|--`);
  console.log(`2 ${board[2][0]} | ${board[2][1]} | ${board[2][2]}`);  
  return;
}

const runGame = () => {
  printBoard();

  if (player === 'X') {
    rl.question('Player X: \nMake your move in format "RC" e.g. "02"\n', (answer) => {
      let row = Number(answer[0]);
      let column = Number(answer[1]);
      if (updateBoard(row, column, 'X') === false) {
        console.log('Please enter a valid move');
        runGame();
      }
      count++;
      player = 'O';
      if (checkWin() === false) {
        if (count === 9) {
          console.log('Draw!');
          rl.close();
        } else {
          runGame();
        }
      } else {
        printBoard();
        console.log('Player X Wins!');
        rl.close();
      }
    });
  } else {
    rl.question('Player O: \nMake your move in format "RC" e.g. "02"\n', (answer) => {
      let row = Number(answer[0]);
      let column = Number(answer[1]);
      if (updateBoard(row, column, 'O') === false) {
        console.log('Please enter a valid move');
        runGame();
      }
      count++;
      player = 'X';
      if (checkWin() === false) {
        if (count === 9) {
          console.log('Draw!');
          rl.close();
        } else {
          runGame();
        }
      } else {
        printBoard();
        console.log('Player O Wins!');
        rl.close();
      }
    });    
  }


  // if (!checkWin()) {
    // runGame();
  // } else {
    // console.log('Game Over!');
  // }
};

runGame();
