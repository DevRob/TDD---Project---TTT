let gui
let game
let options = {
  O: null,
  X: null,
  firstMove: null
}

let players = document.querySelector('[data-player-type]')

function getPlayers() {
  return players.checked
}

function checkOptions(options) {
  options.X = getPlayers() ? 'Human' : 'A.I.'
  options.O = 'Human'
  options.firstMove = "O"
  for (let item in options) {
    if (!options[item]) {
      alert("Please set: " + item)
      return false
    }
  }
  return true
}

function startGame() {
  gui = new GUI();
  game = new Game(options);
  gui.smoothening().drawBoard();
  gameLoop(false)
}

function gameLoop(playSound = true) {
  gui.refreshCounter(game).updateBoard(game.board)
  if (game.inProgress()) {
    callMoveType()
    if (playSound) handleSound(game.lastPlayer)
  } else {
    playEndSound()
    setTimeout(function () {
      game.resetGame()
      gameLoop(false)
    }, 1000)
  }
}

function callMoveType() {
  let playerType = game.getPlayerType(game.currentPlayer)
  if (playerType == "Human") {
    letClick(humanMove)
  } else if (playerType == "A.I.") {
    setTimeout(function () { aiMove() }, 850)
  }
}

function humanMove(event) {
  let coords = {
    x: event.offsetX,
    y: event.offsetY
  }
  let squareIndex = gui.getIndex(coords)
  if (!game.board.playerAt(squareIndex)) {
    game.board.move(game.currentPlayer, squareIndex)
    game.switchPlayer()
    denyClick()
    gameLoop()
  }
}

function aiMove() {
  let bestMove = game.board.isEmpty() ? {
    move: randomChoice(game.board.getEmptySquares())
  } : minMaxMove(game.board, game.currentPlayer, 0)
  game.board.move(game.currentPlayer, bestMove.move)
  game.switchPlayer()
  gameLoop()
}

function letClick(callback) {
  document.getElementById('canvas').onclick = callback
}

function denyClick() {
  document.getElementById('canvas').onclick = null
}

function newGame() {
  location.reload()
}

function handleSound(player) {
  if (player === 'O') playNoughtSound()
  if (player === 'X') playCrossSound()
}

function playEndSound() {
  document.querySelector('audio#complete').play()
}

function playNoughtSound() {
  document.querySelector('audio#on').play()
}

function playCrossSound() {
  document.querySelector('audio#off').play()
}

$(function () {
  if (checkOptions(options)) {
    startGame()
  }

  $('[data-player-type]').on('click', function () {
    if (checkOptions(options)) {
      startGame()
    }
  })

  $('.jasmin-icon').on('click', function () {
    $('.jasmine_html-reporter').attr('data-visible', true)
    injectCloseButton()
  })

  $('.mute-icon').on('click', function () {
    let isMuted = $(this).attr('data-muted') === 'true'
    $(this).attr('data-muted', !isMuted)
    handleMute(!isMuted)
  })
})

function injectCloseButton() {
  const jasminClose = $('.jasmin-close-icon')
  if (jasminClose.length === 0) {
    const jasmin = document.querySelector('.jasmine-banner')
    const buttonTemplate = document.querySelector('#jasmin-close')
    const clone = buttonTemplate.content.cloneNode(true)
    let closebutton = clone.querySelector('.jasmin-close-icon')
    jasmin.appendChild(closebutton)

    $('.jasmin-close-icon').on('click', function () {
      $('.jasmine_html-reporter').attr('data-visible', false)
    })
  }
}

function handleMute(muted) {
  const players = document.querySelectorAll('audio')
  players.forEach(player => {
    player.muted = muted
  })
}