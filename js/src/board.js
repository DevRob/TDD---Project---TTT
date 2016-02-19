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
  return this.squares.length == 9;
};

Board.prototype.checkWin = function() {
  var winCombos = {
    rowOne:   [0, 1, 2],
    rowTwo:   [3, 4, 5],
    rowThree: [6, 7, 8],
    colOne:   [0, 3, 6],
    colTwo:   [1, 4, 7],
    colThree: [2, 5, 8],
    diagOne:  [0, 4, 8],
    diagTwo:  [2, 4, 6]
  };

  for (var winline in winCombos) {
    var rowSet = new Set(this.getLine(winCombos[winline]));
    if (rowSet.size == 1) {
      return rowSet.values().next().value;
    }
  }
};

Board.prototype.getLine = function(positions) {
  var line = [];
  for (var i = 0, len = positions.length; i < len; i++) {
    line.push(this.playerAt(positions[i]));
  }
  return line;
};
