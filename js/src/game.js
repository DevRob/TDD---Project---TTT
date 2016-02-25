var NAMES = ["bob", "tom", "selly", "katy", "zorg", "daro", "rik", "nisi"];

var Player = function(name, type) {
  this.name = name || randomChoice(NAMES);
  this.type = type || "Human";
};

var Game = function() {
  this.options = options || null;
  this.players = {
    "X" : new Player(),
    "O" : new Player(),
  };
  this.currentPlayer = randomChoice(["X", "O"]);
  this.board = new Board();
};

Game.prototype.switchPlayer = function() {
  this.currentPlayer = nextPlayer(this.currentPlayer);
};

Game.prototype.inProgress = function() {
  return this.board.checkWin().result === null;
};

Game.prototype.resetGame = function() {
 this.board = new Board();
 this.switchPlayer();
};

Game.prototype.getPlayerType = function() {
 return this.players[this.currentPlayer].playerType;
};

function randomChoice(array) {
  return array[parseInt(Math.floor(Math.random() * array.length))];
}

function nextPlayer(player) {
  if (player == "X") {
    return "O";
  } else {
    return "X";
  }
}
