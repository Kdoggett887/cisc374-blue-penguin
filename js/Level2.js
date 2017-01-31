var Level2 = {
  create: function(){
    console.log("level 2");

    music = game.add.audio('noir1');
    music.play();

    // Setup World
    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);

    // Setup NPCs

    TA.level2.turtleRed = new Turtle(game.world.centerX - 650, game.world.centerY + 400, game, 'turtle', level2RedText, [makeRed(1), makeGrayscale(0), makeAdd(0)]);
    TA.level2.turtleGreen = new Turtle(game.world.centerX + 400, game.world.centerY + 100, game, 'turtle', sampleText, [makeGreen(1)]);
    TA.level2.turtleBlue = new Turtle(game.world.centerX - 650, game.world.centerY - 200, game, 'turtle', sampleText, [makeBlue(1)]);
    TA.level2.turtleFinal = new Turtle(game.world.centerX, game.world.centerY - 775, game, 'turtle', sampleText, [makeRed(1), makeGreen(1), makeBlue(0)]);

    var turtleList = [TA.level2.turtleRed, TA.level2.turtleGreen, TA.level2.turtleBlue, TA.level2.turtleFinal];
    TA.setTurtleVisibility(turtleList);

    // Setup Player
    if(TA.level2.startingLevel){
      TA.level2.startingLevel = false;
      player = game.add.sprite(game.world.centerX, game.world._height - 150, 'kiwi');
    }
    else{
      //if persisting data put it in here
      player = game.add.sprite(TA.playerX, TA.playerY, 'kiwi');
    }


    // Add physics for all sprites
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable([player], Phaser.Physics.ARCADE);
    player.fixedRotation = true;
    game.camera.follow(player);


    // setup double tap
    game.input.onTap.add(onTap, this);

    // Builds the level using a layout
    TA.wallGroup = game.add.physicsGroup();
    buildLevel(Levels.level2);
    addUI();//mute and retart etc.

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
    game.physics.arcade.collide(player, TA.wallGroup, wallCollision, null, this);
    game.physics.arcade.collide(player, TA.level2.turtleRed, stateChangeCollision, null, this);
    game.physics.arcade.collide(player, TA.level2.turtleGreen, stateChangeCollision, null, this);
    game.physics.arcade.collide(player, TA.level2.turtleBlue, stateChangeCollision, null, this);
    game.physics.arcade.collide(player, TA.level2.turtleFinal, stateChangeCollision, null, this);

  }

}
