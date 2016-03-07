describe('GAME MODUL', function() {
  var game;
  var O = "O";
  var X = "X";
  var options = {
    O: "Human",
    X: "Human",
    firstMove: "X"
  };
  
  beforeEach(function() {
    game = new Game(options);
  });

  it('Has Game class', function() {
    expect(game).toBeDefined();
  });

  it('switchPLayer() defined and functional', function() {
    game.currentPlayer = "X";
    expect(game.switchPlayer).toBeDefined();
    game.switchPlayer();
    expect(game.currentPlayer).toBe("O");
    game.switchPlayer();
    expect(game.currentPlayer).toBe("X");
  });

  it('Reset game', function() {
    game.board = new Board([
      O, X, O,
      X, O, O,
      O, X, X
    ]);
    var preResetPlayer = game.currentPlayer;
    game.resetGame();
    var squareSet = new Set(game.board.squares);
    expect(squareSet.size).toEqual(1);
    expect(squareSet.values().next().value).toBe(undefined);
    expect(game.currentPlayer).not.toBe(preResetPlayer);
  });

  describe('* check if game is in progress', function() {
    it('- false, with full board, winner O', function() {
      game.board = new Board([
        O, X, O,
        X, O, O,
        O, X, X
      ]);
      expect(game.inProgress()).toBeFalsy();
    });

    it('- true, after game reset', function() {
      game.resetGame();
      expect(game.inProgress()).toBeTruthy();
    });

    it('- false, after 5 moves, winner O in 1st row', function() {
      game.board = new Board([
        O, O, O,
        X, X
      ]);
      expect(game.inProgress()).toBeFalsy();
    });

    it('- true, after 6 moves, no winner yet', function() {
      game.board = new Board([
        O, X, O,
        X, X, O
      ]);
      expect(game.inProgress()).toBeTruthy();
    });

    it('- false, after 9 moves, no winner', function() {
      game.board = new Board([
        O, X, O,
        X, X, O,
        O, O, X
      ]);
      expect(game.inProgress()).toBeFalsy();
    });
  });
});
