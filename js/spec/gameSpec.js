describe('Game Modul', function() {
  var game;
  beforeEach(function() {
    game = new Game();
  });

  it('Has Game class', function() {
    expect(game).toBeDefined();
  });

  it('Game class has players', function() {
    var players = game.players;
    expect(players.playerX).toBeDefined();
    expect(players.playerY).toBeDefined();
  });

  it('Game class has game status', function() {
    expect(game.gameStatus).toBeDefined();
  });
});
