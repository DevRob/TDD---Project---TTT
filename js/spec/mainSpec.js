describe('MAIN APP', function() {
  let btnPlayers = document.getElementById('players');

  it('Set up GUI', function() {
    let gui = new GUI();
    expect(gui).toBeDefined();
  });

  it('gameloop function defined', function() {
    expect(gameLoop).toBeDefined();
  });

  it('humanMove function defined', function() {
    expect(humanMove).toBeDefined();
  });

  it('aiMove function defined', function() {
    expect(aiMove).toBeDefined();
  });

  describe('* get options tests', function() {
    it('- player type: Human selected', function() {
      btnPlayers.click();
      checkOptions(options);
      expect(options.O).toBe("Human");
      btnPlayers.click();
    });
  });

  describe('* click event controls', function() {
    let canvas = document.getElementById('canvas');
    it('- allow click, trigger click success', function() {
      let gui = new GUI();
      let result;
      function mouseClick() {
        result = "success";
      }
      letClick(mouseClick);
      canvas.click();
      expect(result).toBe("success");
    });

    it('- deny click, trigger click fail', function() {
      let result;
      function mouseClick() {
        result = "success";
      }
      letClick(mouseClick);
      denyClick();
      canvas.click();
      expect(result).not.toBe("success");
    });
  });
});
