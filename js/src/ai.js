function minMaxMove(board, player, depth) {
  depth += 1
  let moves = [], cloneBoard = {}
  let empties = board.getEmptySquares()
  let result = board.checkWin().result
  if (result !== null) {
    return score(result, depth)
  } else {
    for (let i = 0, len = empties.length; i < len; i++) {
      cloneBoard = new Board(board.squares)
      cloneBoard.move(player, empties[i])
      moves.push({
        score: minMaxMove(cloneBoard, nextPlayer(player), depth).score,
        move: empties[i]
      })
    }
    return getBestMove(moves, player)
  }
}

function getBestMove(moves, player) {
  moves.sort(function (a, b) { return a.score - b.score })
  if (player === "O") {
    return moves[0]
  } else if (player == "X") {
    return moves[moves.length - 1]
  }
}

function score(result, depth) {
  let score = 10
  let scoreTable = {
    "O": { score: (depth - score) },
    "X": { score: (score - depth) },
    "T": { score: 0 }
  }
  return scoreTable[result]
}
