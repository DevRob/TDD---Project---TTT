describe('GAME MODUL', function() {
  var game;
  var O = "O";
  var X = "X";
  beforeEach(function() {
    game = new Game();
  });

  it('Has Player class', function() {
    var player = new Player();
    expect(player).toBeDefined();
    expect(player.name).toBeDefined();
    expect(player.type).toBe("Human");
  });

  it('Player name and type can be set', function() {
    var name = "Bender";
    var type = "A.I.";
    var player = new Player(name, type);
    expect(player.name).toBeDefined("Bender");
    expect(player.type).toBeDefined("A.I.");
  });

  it('Has Game class', function() {
    var game = new Game();
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
    expect(game.board.squares.length).toEqual(0);
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
      expect(game.inProgress()).toBeFalsy();
    });
  });
});
