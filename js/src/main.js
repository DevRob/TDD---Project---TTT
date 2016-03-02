var gui;
var game;
var options = {
  O: null,
  X: null,
  firstMove: null
};

function getOType() {
  return $('#radio1').children('.checked').attr('data-ptype1');
}

function getXType() {
  return $('#radio2').children('.checked').attr('data-ptype2');
}

function getFirstMove() {
  var selection = {
    0: "O",
    1: "X",
    2: randomChoice(["O", "X"])
  }
  return selection[$('#radio3').children('.checked').attr('data-firstmove')];
}

function checkOptions(options) {
  options.O = getOType();
  options.X = getXType();
  options.firstMove = getFirstMove();
  for (var item in options) {
    if (!options[item]) {
      alert("Please set: " + item);
      return false;
    }
  }
  return true;
}

function startGame() {
  gui = new GUI();
  game = new Game(options);
  gui.smoothening().drawBoard();
  gameLoop();
}

function gameLoop() {
  gui.refreshCounter(game).updateBoard(game.board);
  if (game.inProgress()) {
    callMoveType();
  } else {
    setTimeout(function() {
      game.resetGame();
      gameLoop();
    }, 1250);
  }
}

function callMoveType() {
  var playerType = game.getPlayerType(game.currentPlayer);
  if (playerType == "Human") {
    letClick(humanMove);
  } else if (playerType == "A.I."){
    setTimeout(function() { aiMove(); }, 750);
  }
}

function humanMove(event) {
  var coords = {
    x: event.offsetX,
    y: event.offsetY
  }
  var squareIndex = gui.getIndex(coords);
  if (!game.board.playerAt(squareIndex)) {
    game.board.move(game.currentPlayer, squareIndex);
    game.switchPlayer();
    denyClick()
    gameLoop();
  }
}

function aiMove() {
  var bestMove = game.board.isEmpty() ? {
    move: randomChoice(game.board.getEmptySquares())
  } : minMaxMove(game.board, game.currentPlayer, 0);
  game.board.move(game.currentPlayer, bestMove.move);
  game.switchPlayer();
  gameLoop();
}

function letClick(callback) {
  document.getElementById('canvas').onclick = callback;
}

function denyClick() {
  document.getElementById('canvas').onclick = null;
}

function newGame() {
  location.reload();
}

$(function() {
  // DOM manipulation
  $('.fake-button').on('click', function() {
    $(this).parent('.button-bar').find('img').addClass("gray-filter");
    $(this).siblings('.fake-button').removeClass("checked");
    $(this).children('img').removeClass("gray-filter");
    $(this).addClass("checked");
  });

  $('#startGame').on('click', function() {
    if(checkOptions(options)) {
      startGame();
      $(this).css('display', 'none');
      $('#newGame').css('display', 'inline-flex');
    }
  });
  $('#newGame').on('click', newGame);
});
