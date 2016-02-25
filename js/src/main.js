var options = {
  playerO: {
    name: "Bender",
    type: "A.I.",
  },
  playerX: {
    name: "Fay",
    type: "Human",
  },
  firstMove: "X"
};

var gui;
var game;

function startGame() {
  game = new Game(options);
  gui = new GUI();
  gui.smoothening().drawBoard();
  gameLoop();
}

function gameLoop() {

}

function letClick(callback) {
  $('#canvas').on('click', callback);
}

function denyClick(callback) {
  $('#canvas').off('click', callback);
}
