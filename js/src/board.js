var BOARDSIZE = 3;

var Board = function(squares) {
  this.squares = squares || [];
};

Board.prototype.move = function(player, position) {
  this.squares[position] = player;
};

Board.prototype.playerAt = function(position) {
  return this.squares[position];
};

Board.prototype.isFull = function () {
  return this.squares.length == Math.pow(BOARDSIZE, 2);
};

Board.prototype.checkWin = function() {
  var gameStatus = {result: null, line: null};
  var winCombos = {
    rowOne:   {angle: 4, indexes: [0, 1, 2]},
    rowTwo:   {angle: -4, indexes: [3, 4, 5]},
    rowThree: {angle: 4, indexes: [6, 7, 8]},
    colOne:   {angle: 94, indexes: [0, 3, 6]},
    colTwo:   {angle: 86, indexes: [1, 4, 7]},
    colThree: {angle: 94, indexes: [2, 5, 8]},
    diagOne:  {angle: 48, indexes: [0, 4, 8]},
    diagTwo:  {angle: -43, indexes: [2, 4, 6]}
  };

  if (this.squares.length > 2) {
    for (var combo in winCombos) {
      var rowSet = new Set(this.getLine(winCombos[combo].indexes));
      if (rowSet.size == 1) {
        gameStatus.result = rowSet.values().next().value;
        gameStatus.line = winCombos[combo];
      }
    }
  }
  return gameStatus;
};

Board.prototype.getLine = function(positions) {
  var line = [];
  for (var i = 0, len = positions.length; i < len; i++) {
    line.push(this.playerAt(positions[i]));
  }
  return line;
};
