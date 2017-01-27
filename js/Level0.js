var Level0 = {

  create: function(){
    console.log("level 0");

    music = game.add.audio('noir1');
    music.play();

    // Setup World
    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);
    TA.currentLevel = 0;

    // Setup NPCs
    TA.level0.fakeKiwi = new NPC(200, 100, game, 'kiwi', npctalk);
    TA.level0.npc = new NPC(game.world.centerX/2 + 200, game.world.centerY/2 + 900,game, 'npc', sonictalk);

    // Setup Player/Turtles
    if(TA.level0.startingLevel){
      TA.level0.turtle = new Turtle(game.world.centerX/2 + 400, game.world.centerY/2 + 600, game, 'turtle', [[blurShader, "BLUR", 1],[grayscaleShader, "GRAYSCALE", 1], [arithmeticAddShader,"ADD", 0]]);
      player = game.add.sprite(game.world.centerX, game.world._height - 200, 'kiwi');
      TA.level0.startingLevel = false;
    }
    else{
      //if persisting data put it in here
      player = game.add.sprite(TA.playerX, TA.playerY, 'kiwi');
    }


    // Add physics for all sprites
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable([player, TA.level0.turtle], Phaser.Physics.ARCADE);
    TA.level0.turtle.body.immovable = true;
    player.fixedRotation = true;
    game.camera.follow(player);



    // setup double tap
    game.input.onTap.add(onTap, this);

    // Builds the level using a layout
    wallGroup = game.add.physicsGroup();
    buildLevel(Levels.level0);

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
    game.physics.arcade.collide(player, TA.level0.npc, this.firstPersonCollision, null, this);
    game.physics.arcade.collide(player, TA.level0.turtle, this.stateChangeCollision, null, this);
    game.physics.arcade.collide(player, wallGroup, wallCollision, null, this);
    game.physics.arcade.collide(player, TA.level0.fakeKiwi, this.firstPersonCollision, null, this);
  },


  stateChangeCollision: function(obj1, obj2){
    if (!TA.level0.completedPuzzle) {
        TA.playerX = obj1.body.center.x;
        TA.playerY = obj2.body.center.y;
      TA.currentTurtle = obj2;
        game.state.start('Image');
    }
  },

  // Collision handler for the npc
  firstPersonCollision: function(obj1, obj2) {
    npcCollision(obj1, obj2);
    TA.level0.turtle.visible = true;
  }
}
