var Level1 = {
  create: function(){
    console.log("level 1");

    music = game.add.audio('noir1');
    music.play();

    // Setup World
    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);
    this.nextLevel = "Level2";

    // Setup NPCs
    TA.level1.turtleGroup = game.add.physicsGroup();
    TA.level1.turtleGroup.classType = Turtle;
    //TA.level1.turtleGroup.forEach(function(turtle){});
    var turtleBlur = new Turtle(game.world.centerX/2 + 400, game.world.centerY/2 + 600, game, 'turtle', [[blurShader, "BLUR",2], [arithmeticAddShader,"ADD",1], [grayscaleShader, "GRAYSCALE",1]]);
    var turtleBlur2 = new Turtle(game.world.centerX/2 + 400, game.world.centerY/2 + 700, game, 'turtle', [[grayscaleShader, "GRAYSCALE",1]]);
    var turtleBlur3 = new Turtle(game.world.centerX/2 - 200, game.world.centerY/2 + 900, game, 'turtle', [[arithmeticAddShader,"ADD",1]]);

    TA.level1.turtleGroup.add(turtleBlur);
    TA.level1.turtleGroup.add(turtleBlur2);
    TA.level1.turtleGroup.add(turtleBlur3);



    //TA.level1.turtles

    // Setup Player
    if(TA.level1.startingLevel){
      TA.level1.startingLevel = false;
      player = game.add.sprite(game.world.centerX, game.world._height - 200, 'kiwi');
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
    wallGroup = game.add.physicsGroup();
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
    //game.physics.arcade.collide(player, wallGroup, wallCollision, null, this);
    //game.physics.arcade.collide(player, TA.level0.npc, this.firstPersonCollision, null, this);
    //game.physics.arcade.collide(player, TA.level0.turtle, this.stateChangeCollision, null, this);

      //game.physics.arcade.collide(player, TA.level0.npc, this.firstPersonCollision, null, this);
      //game.physics.arcade.collide(player, TA.level0.turtle, this.stateChangeCollision, null, this);
      game.physics.arcade.collide(player, wallGroup, wallCollision, null, this);
      game.physics.arcade.collide(player, TA.level1.turtleGroup, stateChangeCollision, null, this);
      //game.physics.arcade.collide(player, TA.level0.fakeKiwi, this.firstPersonCollision, null, this);

  },

  turtlecalling: function(obj1, obj2){
    console.log(obj2.shaderList);
  }



}
