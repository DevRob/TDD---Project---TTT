
var Game = function(options) {
  this.O = options.O;
  this.X = options.X;
  this.currentPlayer = options.firstMove;
  this.board = new Board();
};

Game.prototype.switchPlayer = function() {
  this.currentPlayer = nextPlayer(this.currentPlayer);
};

Game.prototype.inProgress = function() {
  return this.board.isFull() ? false : this.board.checkWin().result === null;
};

Game.prototype.resetGame = function() {
 this.board = new Board();
 this.switchPlayer();
};

Game.prototype.getPlayerType = function(player) {
  return player == "X" ? this.X : this.O;
};

function randomChoice(array) {
  return array[parseInt(Math.floor(Math.random() * array.length))];
}

function nextPlayer(player) {
  return player == "X" ? "O" : "X";
}
