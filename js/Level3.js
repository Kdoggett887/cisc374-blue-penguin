var Level3 = {
  create: function(){
    console.log("level 3");

    music = game.add.audio('noir1');
    music.play();

    // Setup World
    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);
    this.nextLevel = "GameOver";
    TA.currentLevel++;
    // Setup NPCs

    TA.level3.profpixel = new NPC(200, 100, game, 'profpixel', profpixeltalk);



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
    wallGroup = game.add.physicsGroup();
    buildLevel(Levels.level3);

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
