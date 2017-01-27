var Level2 = {
  create: function(){
    console.log("level 2");

    music = game.add.audio('noir1');
    music.play();

    // Setup World
    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);
    TA.currentLevel = 2;

    // Setup NPCs


    // Setup Player
    if(TA.level2.startingLevel){
      TA.level2.turtleRed = new Turtle(game.world.centerX - 650, game.world.centerY - 200, game, 'turtle', content);
      TA.level2.turtleGreen = new Turtle(game.world.centerX + 400, game.world.centerY + 100, game, 'turtle', content);
      TA.level2.turtleBlue = new Turtle(game.world.centerX - 650, game.world.centerY + 400, game, 'turtle', content);
      TA.level2.turtleFinal = new Turtle(game.world.centerX, game.world.centerY - 800, game, 'turtle', content);
      TA.level2.startingLevel = false;
      player = game.add.sprite(game.world.centerX, game.world._height - 200, 'kiwi');
    }
    else{
      //if persisting data put it in here
      player = game.add.sprite(TA.playerX, TA.playerY, 'kiwi');
    }


    // Add physics for all sprites
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable([player, TA.level2.turtleRed, TA.level2.turtleGreen, TA.level2.turtleBlue, TA.level2.turtleFinal], Phaser.Physics.ARCADE);
    TA.level0.turtleRed.body.immovable = true;
    TA.level0.turtleGreen.body.immovable = true;
    TA.level0.turtleBlue.body.immovable = true;
    TA.level0.turtleFinal.body.immovable = true;
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

  }

}
