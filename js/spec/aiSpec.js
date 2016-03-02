describe('A.I. MODUL', function() {
  it('Has miniMax function', function() {
    expect(minMaxMove).toBeDefined();
  });

  it('Has score function', function() {
    expect(score).toBeDefined();
  });

  it('Scores at depth 5: O = -5, X = 5, Tie = 0',function() {
    var O = "O";
    var X = "X";
    var T = "T"
    var depth = 5;
    expect(score(O, depth).score).toEqual(-5);
    expect(score(X, depth).score).toEqual(5);
    expect(score(T, depth).score).toEqual(0);
  });

  it('Get highest scored move for X and lowest for O', function() {
    var moves = [
      { score: 3, move: 8 },
      { score: -2, move: 3 },
      { score: 8, move: 4 }
    ];
    expect(getBestMove(moves, "X").move).toBe(4);
    expect(getBestMove(moves, "O").move).toBe(3);
  });

  it('Get best move for O when X are on opposite corners and O in the middle',
    function() {
      var O = "O";
      var X = "X";
      var U = undefined;
      var bestMove;
      var testBoardOne = new Board([
        X, U, U,
        U, O, U,
        U, U, X
      ]);
      bestMove = minMaxMove(testBoardOne, O, 0).move;
      function isOdd(number) {
        return number % 2;
      }
      expect(bestMove).toBeTruthy(isOdd(bestMove));
    });

    it('Get best move is 3 for player O', function() {
        var O = "O";
        var X = "X";
        var U = undefined;
        var testBoardTwo = new Board([
          X, U, U,
          U, O, O,
          U, U, X
        ]);
        var bestMove = minMaxMove(testBoardTwo, O, 0).move;
        expect(bestMove).toEqual(3);
      });
});
