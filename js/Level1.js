var Level1 = {
  create: function(){

    console.log("level 1");

    music = game.add.audio('noir1');
    music.play();

    // Setup World
    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);

    // Setup NPCs
    TA.level1.npc = new NPC(game.world.centerX/2 + 275, game.world.centerY/2 + 1200,game, 'npc', level1npcTalk);
    TA.level1.turtle1 = new Turtle(game.world.centerX/2 - 170, game.world.centerY/2 + 900, game, 'turtle', level1AddText, [makeAdd(1)]);
    TA.level1.turtle2 = new Turtle(game.world.centerX/2 + 700, game.world.centerY/2 + 800, game, 'turtle', level1SubText, [makeSub(3)]);
    TA.level1.turtle3 = new Turtle(game.world.centerX/2 + 300, game.world.centerY/2 + 100, game, 'turtle', level1MultiText, [makeAdd(2), makeSub(0), makeGrayscale(1)]);



    var turtleList = [TA.level1.turtle1, TA.level1.turtle2, TA.level1.turtle3];
    TA.setTurtleVisibility(turtleList);

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
      game.physics.arcade.collide(player, TA.level1.turtle1, stateChangeCollision, null, this);
      game.physics.arcade.collide(player, TA.level1.turtle2, stateChangeCollision, null, this);
      game.physics.arcade.collide(player, TA.level1.turtle3, stateChangeCollision, null, this);
      game.physics.arcade.collide(player, TA.level1.npc, this.firstPersonCollision, null, this);

  },
  // Collision handler for the npc
  firstPersonCollision: function(obj1, obj2) {
    npcCollision(obj1, obj2);
    //TA.level0.turtle.visible = true;
  }



}
