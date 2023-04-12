
const COLOR_CROSS = '#232323'
const COLOR_NOUGHT = '#232323'
const COLOR_GRID = '#d0ae48'
const COLOR_WINLINE = '#d0ae48'

let GUI = function () {
  this.canvas = document.getElementById('canvas')
  this.ctx = this.canvas.getContext('2d')
  this.squareSize = this.canvas.width / 3
  this.canvas.height = this.canvas.width
  this.winnerCount = { "O": 0, "X": 0, "T": 0 }
}

GUI.prototype.drawBoard = function () {
  let size = this.canvas.width
  let midPoints = [
    { x: 1 / 2 * size, y: 1 / 3 * size },
    { x: 1 / 3 * size, y: 1 / 2 * size },
    { x: 1 / 2 * size, y: 2 / 3 * size },
    { x: 2 / 3 * size, y: 1 / 2 * size }
  ]
  let angle = 90
  for (let i = 0; i < 4; i++) {
    this.drawLine(midPoints[i], size, angle * i, 3, COLOR_GRID)
  }
  return this
}

GUI.prototype.updateBoard = function (board) {
  self = this
  self.clearCanvas().drawBoard()
  board.squares.forEach(function (square, index) {
    if (square == "X") {
      self.drawCross(index)
    } else if (square == "O") {
      self.drawNought(index)
    }
  })
  self.drawWin(board)
}

GUI.prototype.drawWin = function (board) {
  let gameStatus = board.checkWin()
  let midPoint, angle, lineWidth = parseInt(this.squareSize / 6.5)
  let length = this.canvas.width * 0.9
  if (gameStatus.result !== null && gameStatus.result != "T") {
    midPoint = this.getCoord(gameStatus.line.indexes[1])
    angle = gameStatus.line.angle
    this.drawLine(midPoint, length, angle, lineWidth, COLOR_WINLINE)
  }
}

GUI.prototype.drawCross = function (index) {
  let size = this.canvas.width / 3
  let lineWidth = parseInt(this.squareSize / 6.5)
  let angle
  for (let i = 0; i < 2; i++) {
    angle = (90 * i) - 45
    this.drawLine(this.getCoord(index), size, angle, lineWidth, COLOR_CROSS)
  }
}

GUI.prototype.drawNought = function (index) {
  let size = this.canvas.width / 9
  let lineWidth = parseInt(this.squareSize / 6.5)
  this.drawCircle(this.getCoord(index), size, lineWidth, COLOR_NOUGHT)
}

GUI.prototype.getCoord = function (index) {
  let rowIndex = parseInt(index / 3)
  let colIndex = index % 3
  return {
    x: this.squareSize * (colIndex + 1 / 2),
    y: this.squareSize * (rowIndex + 1 / 2)
  }
}

GUI.prototype.getIndex = function (coords) {
  let row = parseInt(coords.y / this.squareSize)
  let col = parseInt(coords.x / this.squareSize)
  return row * 3 + col
}

GUI.prototype.drawCircle = function (position, radius, width, color) {
  let ctx = this.ctx
  ctx.beginPath()
  ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI)
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.stroke()
}

GUI.prototype.drawLine = function (midPoint, length, angle, width, color) {
  let startPoint = lineTransform(midPoint, length, angle).startPoint
  let endPoint = lineTransform(midPoint, length, angle).endPoint
  let ctx = this.ctx
  ctx.beginPath()
  ctx.moveTo(startPoint.x, startPoint.y)
  ctx.lineTo(endPoint.x, endPoint.y)
  ctx.strokeStyle = color
  ctx.lineCap = "round"
  ctx.lineWidth = width
  ctx.stroke()
}

GUI.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  return this
}

GUI.prototype.drawShadow = function () {
  let ctx = this.ctx
  ctx.shadowColor = '#999'
  ctx.shadowBlur = 20
  ctx.shadowOffsetX = 10
  ctx.shadowOffsetY = 10
  return this
}

GUI.prototype.smoothening = function () {
  let ctx = this.ctx
  ctx.mozImageSmoothingEnabled = true
  ctx.msImageSmoothingEnabled = true
  ctx.imageSmoothingEnabled = true
  return this
}

GUI.prototype.hideMenu = function () {
  this.menu = document.getElementById('menu')
  this.menu.style.display = "none"
  return this
}

GUI.prototype.showScoreScreen = function () {
  this.scoreScreen = document.getElementsByClassName('scoreScreen')
  this.scoreScreen.style.display = "block"
  return this
}

GUI.prototype.refreshCounter = function (game) {
  let result = game.board.checkWin().result
  let counter = this.winnerCount
  if (result) { counter[result] += 1 }
  $('.scoreO').text(counter["O"])
  $('.scoreX').text(counter["X"])
  $('.tie').text(counter["T"])
  return this
}

function lineTransform(midPoint, length, angle) {
  /** rotate a horizontal line by angle, @param {number} - angle */
  let startPoint = getEndPoints(midPoint, length).startPoint
  let endPoint = getEndPoints(midPoint, length).endPoint
  let deltaY = length / 2 * Math.sin(angle * Math.PI / 180)
  let deltaX = deltaY / Math.tan((360 - angle / 2 - 90) * Math.PI / 180)
  return {
    startPoint: { x: startPoint.x + deltaX, y: startPoint.y - deltaY },
    endPoint: { x: endPoint.x - deltaX, y: endPoint.y + deltaY }
  }
}

function getEndPoints(midPoint, length) {
  return {
    startPoint: { x: midPoint.x - length / 2, y: midPoint.y },
    endPoint: { x: midPoint.x + length / 2, y: midPoint.y }
  }
}