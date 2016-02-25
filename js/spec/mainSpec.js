describe('MAIN APP', function() {
  it('Set up GUI', function() {
    var gui = new GUI();
    expect(gui).toBeDefined()
  });

  it('Options holds players properties', function() {
    var O = options.playerO;
    var X = options.playerX;
    var firstMove = options.firstMove;
    expect(O.name).toBe("Bender");
    expect(X.name).toBe("Fay");
    expect(firstMove).toBe("X");
  });

  it('Has gameloop', function() {
    expect(gameLoop).toBeDefined();
  });

  describe('* click events', function() {
    it('allow click, trigger click success', function() {
      var gui = new GUI();
      var result;
      function mouseClick() {
        result = "success";
      }
      letClick(mouseClick);
      $('#canvas').trigger('click');
      expect(result).toBe("success");
    });

    it('deny click, trigger click fail', function() {
      var result;
      function mouseClick() {
        result = "success";
      }
      letClick(mouseClick);
      denyClick(mouseClick);
      $('#canvas').trigger('click');
      expect(result).not.toBe("success");
    });
  });
});
