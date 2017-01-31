var Level3 = {
  create: function(){
    console.log("level 3");

    music = game.add.audio('noir1');
    music.play();

    // Setup World
    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);
    // Setup NPCs
    TA.level3.npc = new NPC(game.world.centerX/2 + 200, game.world.centerY/2 + 1300,game, 'npc', level3npcTalk);
    TA.level3.profpixel = new NPC(game.world.centerX + 500, game.world.centerY - 700, game, 'profpixel', profpixeltalk);

    TA.level3.turtleBlur = new Turtle(game.world.centerX - 100, game.world.centerY, game, 'turtle', level2RedText, [makeBlur(1)]);
    TA.level3.turtle1 = new Turtle(game.world.centerX - 550, game.world.centerY + 250, game, 'turtle', sampleText, [makeGreen(0), makeBlur(2), makeBlue(1)]);
    TA.level3.turtle2 = new Turtle(game.world.centerX - 750, game.world.centerY, game, 'turtle', sampleText, [makeBlue(0), makeRed(1), makeSub(2)]);
    TA.level3.turtle3 = new Turtle(game.world.centerX - 700, game.world.centerY - 800, game, 'turtle', sampleText, [makeGrayscale(1), makeAdd(1), makeBlur(0)]);

    var turtleList = [TA.level3.turtleBlur, TA.level3.turtle1, TA.level3.turtle2, TA.level3.turtle3];
    TA.setTurtleVisibility(turtleList);

    // Setup Player
    if(TA.level3.startingLevel){
      TA.level3.startingLevel = false;
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
    TA.wallGroup = game.add.physicsGroup();
    buildLevel(Levels.level3);
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
    game.physics.arcade.collide(player, TA.level3.profpixel, this.firstPersonCollision, null, this);


  },

  // Collision handler for the npc
  firstPersonCollision: function(obj1, obj2) {
    //npcCollision(obj1, obj2);
    //TA.level0.turtle.visible = true;
    game.state.start('GameOver');
    console.log('colli');
  }

}
