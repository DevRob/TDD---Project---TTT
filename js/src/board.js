let BOARDSIZE = 3
let WINCOMBOS = {
  rowOne: { angle: 4, indexes: [0, 1, 2] },
  rowTwo: { angle: -4, indexes: [3, 4, 5] },
  rowThree: { angle: 4, indexes: [6, 7, 8] },
  colOne: { angle: 94, indexes: [0, 3, 6] },
  colTwo: { angle: 86, indexes: [1, 4, 7] },
  colThree: { angle: 94, indexes: [2, 5, 8] },
  diagOne: { angle: 48, indexes: [0, 4, 8] },
  diagTwo: { angle: -43, indexes: [2, 4, 6] }
}

let Board = function (squares) {
  squares ? this.squares = squares.slice() : this.squares = new Array(Math.pow(BOARDSIZE, 2))
}

Board.prototype.move = function (player, position) {
  this.squares[position] = player
}

Board.prototype.playerAt = function (position) {
  return this.squares[position]
}

Board.prototype.isFull = function () {
  let squareSet = new Set(this.squares)
  return !squareSet.has(undefined) && this.squares.length == Math.pow(BOARDSIZE, 2)
}

Board.prototype.checkWin = function () {
  let gameStatus = { result: null, line: null }
  for (let combo in WINCOMBOS) {
    let rowSet = new Set(this.getLine(WINCOMBOS[combo].indexes))
    if (rowSet.size == 1) {
      let lineValue = rowSet.values().next().value
      if (lineValue) {
        gameStatus.result = lineValue
        gameStatus.line = WINCOMBOS[combo]
        break
      }
    } else if (this.isFull()) {
      gameStatus.result = "T"
    }
  }
  return gameStatus
}

Board.prototype.getLine = function (positions) {
  let line = []
  for (let i = 0, len = positions.length; i < len; i++) {
    line.push(this.playerAt(positions[i]))
  }
  return line
}

Board.prototype.getEmptySquares = function () {
  let squares = this.squares
  let empties = []
  for (let i = 0, len = Math.pow(BOARDSIZE, 2); i < len; i++) {
    if (squares[i] === undefined) {
      empties.push(i)
    }
  }
  return empties
}

Board.prototype.isEmpty = function () {
  return this.getEmptySquares().length == Math.pow(BOARDSIZE, 2)
}
