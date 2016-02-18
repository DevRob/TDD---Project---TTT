describe('GUI', function() {
  var gui;

  beforeEach(function() {
    gui = new GUI();
  });

  it('is defined', function() {
    expect(gui).toBeDefined();
  });

  it('has canvas', function() {
    var canvas = document.getElementById('canvas');
    expect(canvas == gui.canvas).toBeTruthy();
  });

  it('can draw the board', function() {
    expect(gui.drawBoard).toBeDefined();
  });

  it('draws moves on board', function() {
    expect(gui.drawMove).toBeDefined();
  });

  it('can draw circle', function() {
    expect(gui.drawCircle).toBeDefined();
  });

  it('can draw cross', function() {
    expect(gui.drawCross).toBeDefined();
  });

  it('can draw line', function() {
    expect(gui.drawLine).toBeDefined();
  });
});
