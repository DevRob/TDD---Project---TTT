
var BLUE = '#27a8e0';
var GREY = '#8894a0';
var DARKGREY = '#626e7a';

var GUI = function () {
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.squareSize = this.canvas.width / 3;
}

GUI.prototype.drawBoard = function () {
  var size = this.canvas.width;
  var midPoints = [
    {x: 1/2 * size, y: 1/3 * size},
    {x: 1/3 * size, y: 1/2 * size},
    {x: 1/2 * size, y: 2/3 * size},
    {x: 2/3 * size, y: 1/2 * size}
  ];
  var angle = 90;
  for (var i = 0; i < 4; i++) {
    this.drawLine(midPoints[i], size, angle * i, 2, GREY);
  }
  return this;
};

GUI.prototype.updateBoard = function(board) {
  self = this;
  self.clearCanvas().drawBoard();
  board.squares.forEach(function(square, index) {
    if (square == "X") {
      self.drawCross(index);
    } else if (square == "O") {
      self.drawNought(index);
    }
  });
  self.drawWin(board);
};

GUI.prototype.drawWin = function(board) {
  var gameStatus = board.checkWin();
  var midPoint, color, angle, lineWidth = 20;
  var length = this.canvas.width * 0.9;
  if (gameStatus.result != null) {
    midPoint = this.getCoord(gameStatus.line.indexes[1]);
    angle = gameStatus.line.angle;
    color = 'red';
    this.drawLine(midPoint, length, angle, lineWidth, color);
  }
};

GUI.prototype.drawCross = function(index) {
  var size = this.canvas.width / 3;
  var lineWidth = 16;
  var angle;
  for (var i = 0; i < 2; i++) {
    angle = (90 * i) + 45;
    this.drawLine(this.getCoord(index), size, angle, lineWidth, BLUE);
  }
};

GUI.prototype.drawNought = function(index) {
  var size = this.canvas.width / 9;
  this.drawCircle(this.getCoord(index), size, 16, DARKGREY)
};

GUI.prototype.getCoord = function(index) {
  var rowIndex = parseInt(index / 3);
  var colIndex = index % 3;
  return {
    x: this.squareSize * (colIndex + 1 / 2),
    y: this.squareSize * (rowIndex + 1 / 2)
  }
}

GUI.prototype.drawCircle = function(position, radius, width, color) {
  var ctx = this.ctx;
  ctx.beginPath();
  ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
};

GUI.prototype.drawLine = function(midPoint, length, angle, width, color) {
  var startPoint = lineTransform(midPoint, length, angle).startPoint;
  var endPoint  = lineTransform(midPoint, length, angle).endPoint;
  var ctx = this.ctx;
  ctx.beginPath();
  ctx.moveTo(startPoint.x , startPoint.y);
  ctx.lineTo(endPoint.x, endPoint.y);
  ctx.strokeStyle = color;
  ctx.lineCap="round";
  ctx.lineWidth = width;
  ctx.stroke();
};

GUI.prototype.clearCanvas = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  return this;
};

function lineTransform(midPoint, length, angle) {
  /** rotate a horizontal line by angle, @param {number} - angle */
  var startPoint = getEndPoints(midPoint, length).startPoint;
  var endPoint = getEndPoints(midPoint, length).endPoint;
  var deltaY = length / 2 * Math.sin(angle * Math.PI / 180);
  var deltaX = deltaY / Math.tan((360 - angle / 2 - 90) * Math.PI / 180);
  return {
    startPoint: {x: startPoint.x + deltaX, y: startPoint.y - deltaY},
    endPoint: {x: endPoint.x - deltaX, y: endPoint.y + deltaY}
  }
};

function getEndPoints(midPoint, length) {
  return {
    startPoint: {x: midPoint.x - length / 2, y: midPoint.y},
    endPoint: {x: midPoint.x + length / 2, y: midPoint.y}
  }
}
