describe('GUI', function() {
  var gui;

  beforeEach(function() {
    gui = new GUI();
    gui.canvas.height = gui.canvas.width;
    gui.ctx.clearRect(0, 0, gui.canvas.width, gui.canvas.height);
  });

  it('is defined', function() {
    expect(gui).toBeDefined();
  });

  it('has canvas', function() {
    var canvas = document.getElementById('canvas');
    expect(canvas == gui.canvas).toBeTruthy();
  });

  it('getCoord(0).x returns 50', function() {
      expect(gui.getCoord(0).x).toEqual(50);
  });

  it('getCoord(0).y returns 50', function() {
      expect(gui.getCoord(0).y).toEqual(50);
  });

  it('getCoord(1).x returns 150', function() {
      expect(gui.getCoord(1).x).toEqual(150);
  });

  it('getCoord(8).y returns 250', function() {
      expect(gui.getCoord(8).y).toEqual(250);
  });

  describe('GUI VISUAL tests. Click on each test to check them one by one!', function() {

    it('VISUAL: draw circle', function() {
      var position = {x: gui.canvas.width / 2, y: gui.canvas.height / 2};
      var lineWidth = 16;
      var radius = gui.canvas.width / 2 - lineWidth / 2;
      var color = 'red';

      gui.drawCircle(position, radius, lineWidth, color);
      expect(gui.drawCircle).toBeDefined();
    });

    it('VISUAL: draw line', function() {
      var startPoint = {x: 0, y: gui.canvas.height / 2};
      var endPoint = {x: gui.canvas.width, y: gui.canvas.height / 2};
      var angle = 45;
      var width = 16;
      var color = 'blue';
      gui.drawLine(startPoint, endPoint, angle, width, color);
      expect(gui.drawLine).toBeDefined();
    });

    it('VISUAL: draw the board', function() {
      gui.drawBoard();
      expect(gui.drawBoard).toBeDefined();
    });

    it('VISUAL: draw cross in the middle', function() {
      var index = 4;
      gui.drawBoard();
      gui.drawCross(index);
      expect(gui.drawCross).toBeDefined();
    });

    it('VISUAL: draw cross in the upper left corner', function() {
      var index = 0;
      gui.drawBoard();
      gui.drawCross(index);
      expect(gui.drawCross).toBeDefined();
    });

    it('VISUAL: draw nought in the middle', function() {
      var index = 4;
      gui.drawBoard();
      gui.drawNought(index);
      expect(gui.drawNought).toBeDefined();
    });
  });
});
