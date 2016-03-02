describe('BOARD', function() {
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

  it('After move board is not empty', function() {
    var position = 2;
    var player = O;
    board.move(player, position);
    expect(board.isEmpty()).toBeFalsy();
  });

  it('New board is not full', function() {
    expect(board.isFull()).toBeFalsy();
  });

  it('Check if board is full', function() {
    var board = new Board([
      X, X, X,
      O, O, X,
      O, X, O,
    ]);
    expect(board.isFull()).toBeTruthy();
  });

  it('Board is not full after 1st move on bot-right',
    function() {
      var board = new Board();
      board.move(X, 8);
      expect(board.isFull()).toBeFalsy();
  });

  it('is the board empty', function() {
    var board = new Board();
    expect(board.isEmpty()).toBeTruthy();
  });

  it('Get Empty squares', function() {
    var board = new Board([
      X, X, X,
      O, O
    ]);
    var empties = [5, 6, 7, 8];
    expect(board.getEmptySquares).toBeDefined();
    expect(board.getEmptySquares().toString()).toBe(empties.toString());
  });

  describe('* check game results', function() {
    it('- check winner in 1st row', function() {
      var board = new Board([
        X, X, X,
        O, O, X,
        O, X, O,
      ]);
      expect(board.checkWin().result).toBe(X);
    });

    it('- check winner in 2nd row', function() {
      var board = new Board([
        X, O, X,
        O, O, O,
        X, X, O,
      ]);
      expect(board.checkWin().result).toBe(O);
    });

    it('- check winner in 3rd row', function() {
      var board = new Board([
        O, O, X,
        X, O, O,
        X, X, X,
      ]);
      expect(board.checkWin().result).toBe(X);
    });

    it('- check winner in 1st colomn', function() {
      var board = new Board([
        X, O, X,
        X, O, O,
        X, X, O,
      ]);
      expect(board.checkWin().result).toBe(X);
    });

    it('- check winner in 2nd colomn', function() {
      var board = new Board([
        O, O, X,
        X, O, O,
        X, O, X,
      ]);
      expect(board.checkWin().result).toBe(O);
    });

    it('- check winner in 3rd colomn', function() {
      var board = new Board([
        O, O, X,
        X, O, X,
        O, X, X,
      ]);
      expect(board.checkWin().result).toBe(X);
    });

    it('- check winner in 1st diagonal', function() {
      var board = new Board([
        O, O, X,
        X, O, X,
        O, X, O,
      ]);
      expect(board.checkWin().result).toBe(O);
    });

    it('- check winner in 2nd diagonal', function() {
      var board = new Board([
        X, O, O,
        X, O, X,
        O, X, X,
      ]);
      expect(board.checkWin().result).toBe(O);
    });

    it('- check winner X after 5 moves', function() {
      var board = new Board([
        X, X, X,
        O, O
      ]);
      expect(board.checkWin().result).toBe("X");
    });

    it('- check if it is a TIE', function() {
      var board = new Board([
        X, O, O,
        O, X, X,
        O, X, O,
      ]);
      expect(board.checkWin().result).toBe("T");
    });
  });
});
