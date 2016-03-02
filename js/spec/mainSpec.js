describe('MAIN APP', function() {
  var btnOHuman = document.getElementById('radio1').children[1];
  var btnXHuman = document.getElementById('radio2').children[1];
  var btnOai = document.getElementById('radio1').children[0];
  var btnXai = document.getElementById('radio2').children[0];
  var btnFirstO = document.getElementById('radio3').children[0];
  var btnFirstX = document.getElementById('radio3').children[1];
  var btnFirstRandom = document.getElementById('radio3').children[2];

  it('Set up GUI', function() {
    var gui = new GUI();
    expect(gui).toBeDefined()
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

    it('- player O type: Human selected', function() {
      btnOHuman.click();
      expect(getOType()).toBe("Human");
      $('.fake-button').removeClass("checked");
    });

    it('- player O type: A.I. selected', function() {
      btnOai.click();
      expect(getOType()).toBe("A.I.");
      $('.fake-button').removeClass("checked");
    });

    it('- player X type: Human selected', function() {
      btnXHuman.click();
      expect(getXType()).toBe("Human");
      $('.fake-button').removeClass("checked");
    });

    it('- player X type: A.I. selected', function() {
      btnXai.click();
      expect(getXType()).toBe("A.I.");
      $('.fake-button').removeClass("checked");
    });

    it('- first move: O selected', function() {
      btnFirstO.click();
      expect(getFirstMove()).toBe("O");
      $('.fake-button').removeClass("checked");
    });

    it('- first move: X selected', function() {
      btnFirstX.click();
      expect(getFirstMove()).toBe("X");
      $('.fake-button').removeClass("checked");
    });

    it('- first move: Random selected', function() {
      btnFirstRandom.click();
      function isElementOf(target, array) {
        for (var element in array) {
          if (target == array[element]) {
            return true;
          }
        }
        return false;
      }
      expect(isElementOf(getFirstMove(), ["X", "O"])).toBeTruthy();
      $('.fake-button').removeClass("checked");
    });
  });

  describe('* click event controls', function() {
    var canvas = document.getElementById('canvas');
    it('- allow click, trigger click success', function() {
      var gui = new GUI();
      var result;
      function mouseClick() {
        result = "success";
      }
      letClick(mouseClick);
      canvas.click();
      expect(result).toBe("success");
    });

    it('- deny click, trigger click fail', function() {
      var result;
      function mouseClick() {
        result = "success";
      }
      letClick(mouseClick);
      denyClick();
      canvas.click();
      expect(result).not.toBe("success");
    });
  });

  describe('* gather options', function() {

    it('- after start, game received options', function() {
      btnOHuman.click();
      btnXai.click();
      btnFirstO.click();
      checkOptions(options);
      var game = new Game(options);
      expect(game.O).toBe("Human");
      expect(game.X).toBe("A.I.");
      expect(game.currentPlayer).toBe("O");
    });

    it('- check if instances of Game and GUI class created.',
    function() {
      btnOHuman.click();
      btnXHuman.click();
      btnFirstX.click();
      startGame();
      expect(game).toBeDefined();
      expect(gui).toBeDefined();
    });

    it('- game options: first move X, 2x A.I.', function() {
      btnOai.click();
      btnXai.click();
      btnFirstX.click();
      checkOptions(options);
      var game = new Game(options);
      expect(game.X).toBe("A.I.");
      expect(game.O).toBe("A.I.");
      expect(game.currentPlayer).toBe("X");
      var squareSet = new Set(game.board.squares);
      expect(squareSet.has(undefined)).toBeTruthy();
      expect(squareSet.size).toEqual(1);
    });

    it('- game options: first move X, 2x Human', function() {
      btnOHuman.click();
      btnXHuman.click();
      btnFirstX.click();
      checkOptions(options);
      var game = new Game(options);
      expect(game.X).toBe("Human");
      expect(game.O).toBe("Human");
      expect(game.currentPlayer).toBe("X");
      var squareSet = new Set(game.board.squares);
      expect(squareSet.has(undefined)).toBeTruthy();
      expect(squareSet.size).toEqual(1);
    });

    it('- game options: first move O, Human <-> A.I.', function() {
      btnOHuman.click();
      btnXai.click();
      btnFirstO.click();
      checkOptions(options);
      var game = new Game(options);
      expect(game.X).toBe("A.I.");
      expect(game.O).toBe("Human");
      expect(game.currentPlayer).toBe("O");
      var squareSet = new Set(game.board.squares);
      expect(squareSet.has(undefined)).toBeTruthy();
      expect(squareSet.size).toEqual(1);
      $('.fake-button').removeClass("checked");
      $('.fake-button').children('img').addClass("gray-filter");
      denyClick();
    });

    it('- game starts witouot options', function() {
      expect(3).toBe(3);
    });
  });
});
