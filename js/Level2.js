var Level2 = {
  create: function(){
    console.log("level 2");

    music = game.add.audio('noir1');
    music.play();

    // Setup World
    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);
    // Setup NPCs

    TA.level2.turtleRed = new Turtle(game.world.centerX - 650, game.world.centerY + 400, game, 'turtle', sampleText, [[removeRedShader, "RED", 1],[grayscaleShader, "GREYSCALE", 0], [arithmeticAddShader,"ADD", 0]]);
    TA.level2.turtleGreen = new Turtle(game.world.centerX + 400, game.world.centerY + 100, game, 'turtle', sampleText, [[removeGreenShader, "GREEN", 1]]);
    TA.level2.turtleBlue = new Turtle(game.world.centerX - 650, game.world.centerY - 200, game, 'turtle', sampleText, [[removeBlueShader, "BLUE", 1]]);
    TA.level2.turtleFinal = new Turtle(game.world.centerX, game.world.centerY - 800, game, 'turtle', sampleText, [[removeRedShader, "RED", 1], [removeGreenShader, "GREEN", 1], [removeBlueShader, "BLUE", 0]]);

    var turtleList = [TA.level2.turtleRed, TA.level2.turtleGreen, TA.level2.turtleBlue, TA.level2.turtleFinal];
    TA.setTurtleVisibility(turtleList);

    // Setup Player
    if(TA.level2.startingLevel){
      TA.level2.startingLevel = false;
      player = game.add.sprite(game.world.centerX, game.world._height - 200, 'kiwi');
    }
    else{
      //if persisting data put it in here
      if (TA.turtleCount == 1) {
        TA.level2.turtleRed.visible = false;
      }
      else if (TA.turtleCount == 2) {
        TA.level2.turtleRed.visible = false;
        TA.level2.turtleGreen.visible = false;
      }
      else if (TA.turtleCount == 3) {
        TA.level2.turtleRed.visible = false;
        TA.level2.turtleGreen.visible = false;
        TA.level2.turtleBlue.visible = false;
      }
      player = game.add.sprite(TA.playerX, TA.playerY, 'kiwi');
    }


    // Add physics for all sprites
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable([player, TA.level2.turtleRed], Phaser.Physics.ARCADE); //, TA.level2.turtleGreen, TA.level2.turtleBlue, TA.level2.turtleFinal
    TA.level2.turtleRed.body.immovable = true;
    TA.level2.turtleGreen.body.immovable = true;
    TA.level2.turtleBlue.body.immovable = true;
    TA.level2.turtleFinal.body.immovable = true;
    player.fixedRotation = true;
    game.camera.follow(player);


    // setup double tap
    game.input.onTap.add(onTap, this);

    // Builds the level using a layout
    wallGroup = game.add.physicsGroup();
    buildLevel(Levels.level2);

  },

  // Update for the level
  update: function() {
    // Setup for update
    setupUpdate();
    this.addCollisions();

    // Add extra stuff...
  },

  // All collision handlers for the level
  addCollisions: function() {
    game.physics.arcade.collide(player, wallGroup, wallCollision, null, this);
    game.physics.arcade.collide(player, TA.level2.turtleRed, stateChangeCollision, null, this);
    game.physics.arcade.collide(player, TA.level2.turtleGreen, stateChangeCollision, null, this);
    game.physics.arcade.collide(player, TA.level2.turtleBlue, stateChangeCollision, null, this);
    game.physics.arcade.collide(player, TA.level2.turtleFinal, stateChangeCollision, null, this);

  },

  stateChangeCollision: function(obj1, obj2){
    if (!TA.level0.completedPuzzle) {
        TA.playerX = obj1.body.center.x;
        TA.playerY = obj2.body.center.y;
      TA.currentTurtle = obj2;
        game.state.start('Image');
    }
  }

}
