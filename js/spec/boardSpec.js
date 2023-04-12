describe('BOARD', function() {
  let X = "X";
  let O = "O";
  let board;
  beforeEach(function() {
    board = new Board();
  });

  it('Board class defined', function() {
    expect(board).toBeDefined();
  });

  it('Can make a move with X', function() {
    let position = 0;
    let player = X;
    board.move(player, position);
    expect(board.playerAt(position)).toBe(player);
  });

  it('Can make a move with O', function() {
    let position = 2;
    let player = O;
    board.move(player, position);
    expect(board.playerAt(position)).toBe(player);
  });

  it('After move board is not empty', function() {
    let position = 2;
    let player = O;
    board.move(player, position);
    expect(board.isEmpty()).toBeFalsy();
  });

  it('New board is not full', function() {
    expect(board.isFull()).toBeFalsy();
  });

  it('Check if board is full', function() {
    let board = new Board([
      X, X, X,
      O, O, X,
      O, X, O,
    ]);
    expect(board.isFull()).toBeTruthy();
  });

  it('Board is not full after 1st move on bot-right',
    function() {
      let board = new Board();
      board.move(X, 8);
      expect(board.isFull()).toBeFalsy();
  });

  it('is the board empty', function() {
    let board = new Board();
    expect(board.isEmpty()).toBeTruthy();
  });

  it('Get Empty squares', function() {
    let board = new Board([
      X, X, X,
      O, O
    ]);
    let empties = [5, 6, 7, 8];
    expect(board.getEmptySquares).toBeDefined();
    expect(board.getEmptySquares().toString()).toBe(empties.toString());
  });

  describe('* check game results', function() {
    it('- check winner in 1st row', function() {
      let board = new Board([
        X, X, X,
        O, O, X,
        O, X, O,
      ]);
      expect(board.checkWin().result).toBe(X);
    });

    it('- check winner in 2nd row', function() {
      let board = new Board([
        X, O, X,
        O, O, O,
        X, X, O,
      ]);
      expect(board.checkWin().result).toBe(O);
    });

    it('- check winner in 3rd row', function() {
      let board = new Board([
        O, O, X,
        X, O, O,
        X, X, X,
      ]);
      expect(board.checkWin().result).toBe(X);
    });

    it('- check winner in 1st colomn', function() {
      let board = new Board([
        X, O, X,
        X, O, O,
        X, X, O,
      ]);
      expect(board.checkWin().result).toBe(X);
    });

    it('- check winner in 2nd colomn', function() {
      let board = new Board([
        O, O, X,
        X, O, O,
        X, O, X,
      ]);
      expect(board.checkWin().result).toBe(O);
    });

    it('- check winner in 3rd colomn', function() {
      let board = new Board([
        O, O, X,
        X, O, X,
        O, X, X,
      ]);
      expect(board.checkWin().result).toBe(X);
    });

    it('- check winner in 1st diagonal', function() {
      let board = new Board([
        O, O, X,
        X, O, X,
        O, X, O,
      ]);
      expect(board.checkWin().result).toBe(O);
    });

    it('- check winner in 2nd diagonal', function() {
      let board = new Board([
        X, O, O,
        X, O, X,
        O, X, X,
      ]);
      expect(board.checkWin().result).toBe(O);
    });

    it('- check winner X after 5 moves', function() {
      let board = new Board([
        X, X, X,
        O, O
      ]);
      expect(board.checkWin().result).toBe("X");
    });

    it('- check if it is a TIE', function() {
      let board = new Board([
        X, O, O,
        O, X, X,
        O, X, O,
      ]);
      expect(board.checkWin().result).toBe("T");
    });
  });
});
