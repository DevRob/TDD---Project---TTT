describe('Game Modul', function() {
  var game;
  beforeEach(function() {
    game = new Game();
  });

  it('Has Game class', function() {
    expect(game).toBeDefined();
  });

  it('Game class has players', function() {
    expect(game.players).toBeDefined();
  });

  it('Game class has game status', function() {
    expect(game.gameStatus).toBeDefined();
  });
});
