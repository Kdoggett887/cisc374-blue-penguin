var Level1 = {
  create: function(){
    console.log("level 1");

    music = game.add.audio('noir1');
    music.play();

    // Setup World
    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);

    // Setup NPCs

    TA.level1.turtle1 = new Turtle(game.world.centerX/2 - 200, game.world.centerY/2 + 900, game, 'turtle', sampleText, [[grayscaleShader, "GREYSCALE",1]]);
    TA.level1.turtle2 = new Turtle(game.world.centerX/2 + 400, game.world.centerY/2 + 700, game, 'turtle', level1AddText, [[arithmeticAddShader,"ADD",1],[grayscaleShader,"GREYSCALE",0]]);
    TA.level1.turtle3 = new Turtle(game.world.centerX/2 + 400, game.world.centerY/2 + 600, game, 'turtle', sampleText, [[arithmeticAddShader,"ADD",1], [grayscaleShader, "GREYSCALE",1]]);

    var turtleList = [TA.level1.turtle1, TA.level1.turtle2, TA.level1.turtle3];
    TA.setTurtleVisibility(turtleList);

    //TA.level1.turtleGroup = game.add.physicsGroup();
    //TA.level1.turtleGroup.add(turtleBlur2);
    //TA.level1.turtleGroup.add(turtleBlur3);
    //TA.level1.turtleGroup.add(turtleBlur);


    // Setup Player
    if(TA.level1.startingLevel){
      TA.level1.startingLevel = false;
      player = game.add.sprite(game.world.centerX, game.world._height - 200, 'kiwi');

    } else{
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
    buildLevel(Levels.level1);

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
      game.physics.arcade.collide(player, TA.level1.turtle1, stateChangeCollision, null, this);
      game.physics.arcade.collide(player, TA.level1.turtle2, stateChangeCollision, null, this);
      game.physics.arcade.collide(player, TA.level1.turtle3, stateChangeCollision, null, this);

  },

  turtlecalling: function(obj1, obj2){
    console.log(obj2.shaderList);
  }



}
