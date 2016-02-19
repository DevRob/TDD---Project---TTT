var BLUE = '#27a8e0';
var GREY = '#8894a0';
var DARKGREY = '#626e7a';

var GUI = function() {
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.squareSize = this.canvas.width / 3;
};

GUI.prototype.drawBoard = function() {
  var canvasSize = this.canvas.width;
  var squareSize = this.squareSize;
  var start, end, startPoint, endPoint;
  for (var i = 1; i < BOARDSIZE; i++) {
    start = [squareSize * i, 0];
    end = [squareSize * i, canvasSize];
    for (var j = 0; j < BOARDSIZE - 1; j++) {
      startPoint = {x: start[0], y: start[1]};
      endPoint = {x: end[0], y: end[1]};
      this.drawLine(startPoint, endPoint, 0, GREY, 5);
      start.reverse();
      end.reverse();
    }
  }
};

GUI.prototype.drawNought = function(index) {
  var size = this.squareSize / 3;
  var position = this.getCoord(index);
  this.drawCircle(position, size, 16, DARKGREY);
};

GUI.prototype.drawCross = function(index) {
  var size = this.squareSize;
  var position = this.getCoord(index);
  var startPoint = {
    x: position.x - size / 2,
    y: position.y
  };
  var endPoint = {
    x: position.x + size / 2,
    y: position.y
  }
  this.drawLine(startPoint, endPoint, 45, 16, BLUE);
  this.drawLine(startPoint, endPoint, -45, 16, BLUE);
};

GUI.prototype.drawCircle = function(position, radius, width, color) {
  var ctx = this.ctx;
  ctx.beginPath();
  ctx.arc(position.y, position.x, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
};

GUI.prototype.drawLine = function(startPoint, endPoint, angle, width, color) {
  /** can rotate a horizontal line by angle set @param {number} - angle */
  var len = Math.sqrt(Math.pow(startPoint.x - endPoint.x, 2) + Math.pow(startPoint.y - endPoint.y, 2));
  var deltaY = len / 2 * Math.sin(angle * Math.PI / 180);
  var deltaX = deltaY / Math.tan((360 - angle / 2 - 90) * Math.PI / 180);
  var ctx = this.ctx;
  ctx.beginPath();
  ctx.moveTo(startPoint.x + deltaX, startPoint.y - deltaY);
  ctx.lineTo(endPoint.x - deltaX, endPoint.y + deltaY);
  ctx.strokeStyle = color;
  ctx.lineCap="round";
  ctx.lineWidth = width;
  ctx.stroke();
};

GUI.prototype.getCoord = function(index) {
  var rowIndex = parseInt(index / 3);
  var colIndex = index % 3;
  return {
    x: this.squareSize * (colIndex + 1 / 2),
    y: this.squareSize * (rowIndex + 1 / 2)
  }
};
