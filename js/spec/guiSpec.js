describe('GUI', function() {
  var gui;

  beforeEach(function() {
    gui = new GUI();
  });

  it('Is defined', function() {
    expect(gui).toBeDefined();
  });

  it('Has canvas', function() {
    var canvas = document.getElementById('canvas');
    expect(canvas == gui.canvas).toBeTruthy();
  });

  describe('* helper functions', function() {
    beforeEach(function() {
      var gui = new GUI();
    });

    it('- getCoord(0).x returns 50', function() {
        expect(gui.getCoord(0).x).toEqual(50);
    });

    it('- getCoord(0).y returns 50', function() {
        expect(gui.getCoord(0).y).toEqual(50);
    });

    it('- getCoord(1).x returns 150', function() {
        expect(gui.getCoord(1).x).toEqual(150);
    });

    it('- getCoord(8).y returns 250', function() {
        expect(gui.getCoord(8).y).toEqual(250);
    });

    it('- getEndPoints() returns an object', function() {
      var midPoint = {x: 200, y: 200};
      var length = 120;
      expect(typeof getEndPoints(midPoint, length) == 'object').toBeTruthy();
    });

    it('- getEndPoints().startPoint returns {x: 0, y: 50}', function() {
      var midPoint = {x: 50, y: 50};
      var length = 100;
      expect(getEndPoints(midPoint, length).startPoint).toEqual(
        {x: 0, y: 50}
      );
    });

    it('- getEndPoints().endPoint returns {x: 100, y: 50}', function() {
      var midPoint = {x: 50, y: 50};
      var length = 100;
      expect(getEndPoints(midPoint, length).endPoint).toEqual(
        {x: 100, y: 50}
      );
    });

    it('- get square index from coord defined', function() {
      expect(gui.getIndex).toBeDefined();
    });

    it('- coord {x: 20, y: 20} returns 0', function() {
      var coord = {x: 20, y: 20};
      expect(gui.getIndex(coord)).toBe(0);
    });

    it('- coord {x: 101, y: 20} returns 1', function() {
      var coord = {x: 101, y: 20};
      expect(gui.getIndex(coord)).toBe(1);
    });

    it('- coord {x: 201, y: 20} returns 2', function() {
      var coord = {x: 201, y: 20};
      expect(gui.getIndex(coord)).toBe(2);
    });

    it('- coord {x: 201, y: 201} returns 8', function() {
      var coord = {x: 201, y: 201};
      expect(gui.getIndex(coord)).toBe(8);
    });

    it('- coord {x: 199, y: 199} returns 4', function() {
      var coord = {x: 199, y: 199};
      expect(gui.getIndex(coord)).toBe(4);
    });
  });

  describe('* VISUAL tests. Click on each test to check them one by one!', function() {
    var X = "X";
    var O = "O";

    it('- VISUAL: draw a canvas sized red circle', function() {
      var position = {x: gui.canvas.width / 2, y: gui.canvas.height / 2};
      var lineWidth = 16;
      var radius = gui.canvas.width / 2 - lineWidth / 2;
      var color = 'red';

      gui.drawCircle(position, radius, lineWidth, color);
      expect(gui.drawCircle).toBeDefined();
    });

    it('- VISUAL: draw a line across the canvas 45 degree', function() {
      var midPoint = {x: gui.canvas.height / 2, y: gui.canvas.height / 2};
      var length = gui.canvas.height;
      var angle = 45;
      var width = 16;
      var color = 'blue';
      gui.drawLine(midPoint, length, angle, width, color);
      expect(gui.drawLine).toBeDefined();
    });

    it('- VISUAL: draw the board', function() {
      gui.drawBoard();
      expect(gui.drawBoard).toBeDefined();
    });

    it('- VISUAL: draw cross in the middle', function() {
      var index = 4;
      gui.drawBoard();
      gui.drawCross(index);
      expect(gui.drawCross).toBeDefined();
    });

    it('- VISUAL: draw cross in the upper left corner', function() {
      var index = 0;
      gui.drawBoard();
      gui.drawCross(index);
      expect(gui.drawCross).toBeDefined();
    });

    it('- VISUAL: draw nought in the middle', function() {
      var index = 4;
      gui.drawBoard();
      gui.drawNought(index);
      expect(gui.drawNought).toBeDefined();
    });

    it('- VISUAL: draw nought in the 2nd row 3rd col', function() {
      var index = 5;
      gui.drawBoard();
      gui.drawNought(index);
      expect(gui.drawNought).toBeDefined();
    });

    it('- VISUAL: update board.', function() {
      var board = new Board([
        O, X, O,
        X, X, O,
        O, O, X
      ]);
      gui.updateBoard(board);
      expect(gui.updateBoard).toBeDefined();
    });

    it('- VISUAL: draw win 1st row', function() {
      var board = new Board([
        O, O, O,
        X, X, O,
        O, O, X
      ]);
      gui.updateBoard(board);
      expect(gui.drawWin).toBeDefined();
    });

    it('- VISUAL: draw win 2nd row', function() {
      var board = new Board([
        O, X, O,
        X, X, X,
        O, O, X
      ]);
      gui.updateBoard(board);
      expect(gui.drawWin).toBeDefined();
    });

    it('- VISUAL: draw win 3rd row', function() {
      var board = new Board([
        O, X, X,
        X, X, O,
        O, O, O
      ]);
      gui.updateBoard(board);
      expect(gui.drawWin).toBeDefined();
    });

    it('- VISUAL: draw win 1st column', function() {
      var board = new Board([
        O, X, O,
        O, X, O,
        O, O, X
      ]);
      gui.updateBoard(board);
      expect(gui.drawWin).toBeDefined();
    });

    it('- VISUAL: draw win 2nd column', function() {
      var board = new Board([
        O, O, X,
        X, O, O,
        O, O, X
      ]);
      gui.updateBoard(board);
      expect(gui.drawWin).toBeDefined();
    });

    it('- VISUAL: draw win 3rd column', function() {
      var board = new Board([
        O, X, O,
        X, X, O,
        X, O, O
      ]);
      gui.updateBoard(board);
      expect(gui.drawWin).toBeDefined();
    });

    it('- VISUAL: draw win 1st diagonal', function() {
      var board = new Board([
        X, O, O,
        X, X, O,
        O, O, X
      ]);
      gui.updateBoard(board);
      expect(gui.drawWin).toBeDefined();
    });

    it('- VISUAL: draw win 2nd diagonal', function() {
      var board = new Board([
        O, X, O,
        X, O, O,
        O, X, X
      ]);
      gui.updateBoard(board);
      expect(gui.drawWin).toBeDefined();
    });
  });

  describe('* test score counter:', function() {
    var X = "X";
    var O = "O";
    var game = new Game(options);

    it('- winner O', function() {
      var scoreO;
      var board = new Board([
        O, X, O,
        X, O, O,
        O, X, X
      ]);
      game.board = board;
      gui.refreshCounter(game);
      scoreO = $('.scoreO').text();
      expect(scoreO).toBe("1");
    });

    it('- winner X', function() {
      var scoreX;
      var board = new Board([
        O, X, O,
        X, O, O,
        X, X, X
      ]);
      game.board = board;
      gui.refreshCounter(game);
      scoreX = $('.scoreX').text();
      expect(scoreX).toBe("1");
    });

    it('- tie', function() {
      var scoreTie;
      var board = new Board([
        O, X, X,
        X, O, O,
        O, X, X
      ]);
      game.board = board;
      gui.refreshCounter(game);
      scoreTie = $('.tie').text();
      expect(scoreTie).toBe("1");
    });

  });
});
