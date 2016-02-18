describe('Board', function() {
  var X = "X";
  var O = "O";
  var board;

  beforeEach(function() {
    board = new Board();
  });

  it('Board class defined', function() {
    expect(board).toBeDefined();
  });

  it('Can make a move with X', function() {
    var position = 0;
    var player = X;
    board.move(player, position);
    expect(board.playerAt(position)).toBe(player);
  });

  it('Can make a move with O', function() {
    var position = 2;
    var player = O;
    board.move(player, position);
    expect(board.playerAt(position)).toBe(player);
  });

  it('New board is not full', function() {
    expect(board.isFull()).toBeFalsy();
  });

  it('- check if board is full', function() {
    var board = new Board([
      X, X, X,
      O, O, X,
      O, X, O,
    ]);

    expect(board.isFull()).toBeTruthy();
  });

  it('- check winner in 1st row', function() {
    var board = new Board([
      X, X, X,
      O, O, X,
      O, X, O,
    ]);
    expect(board.checkWin()).toBe(X);
  });

  it('- check winner in 2nd row', function() {
    var board = new Board([
      X, O, X,
      O, O, O,
      X, X, O,
    ]);
    expect(board.checkWin()).toBe(O);
  });

  it('- check winner in 3rd row', function() {
    var board = new Board([
      O, O, X,
      X, O, O,
      X, X, X,
    ]);
    expect(board.checkWin()).toBe(X);
  });

  it('- check winner in 1st colomn', function() {
    var board = new Board([
      X, O, X,
      X, O, O,
      X, X, O,
    ]);
    expect(board.checkWin()).toBe(X);
  });

  it('- check winner in 2nd colomn', function() {
    var board = new Board([
      O, O, X,
      X, O, O,
      X, O, X,
    ]);
    expect(board.checkWin()).toBe(O);
  });

  it('- check winner in 3rd colomn', function() {
    var board = new Board([
      O, O, X,
      X, O, X,
      O, X, X,
    ]);
    expect(board.checkWin()).toBe(X);
  });

  it('- check winner in 1st diagonal', function() {
    var board = new Board([
      O, O, X,
      X, O, X,
      O, X, O,
    ]);
    expect(board.checkWin()).toBe(O);
  });

  it('- check winner in 2nd diagonal', function() {
    var board = new Board([
      X, O, O,
      X, O, X,
      O, X, X,
    ]);
    expect(board.checkWin()).toBe(O);
  });
});
