var Level0 = {

  create: function(){
    console.log("level 1");

    music = game.add.audio('noir1');
    music.play();

    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);

    TA.level0.turtle = new Turtle(game.world.centerX/2 + 400, game.world.centerY/2 + 600, game, 'turtle', content);
    TA.level0.fakeKiwi = new NPC(200, 100, game, 'kiwi', npctalk);

    TA.level0.npc = new NPC(game.world.centerX/2 + 200, game.world.centerY/2 + 900,game, 'npc', sonictalk);

    if(TA.level0.startingLevel){
      TA.level0.startingLevel = false;
      player = game.add.sprite(game.world.centerX, game.world._height - 200, 'kiwi');
    }
    else{
      //if persisting data put it in here
      player = game.add.sprite(TA.playerX, TA.playerY, 'kiwi');
    }


    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable([player, TA.level0.turtle], Phaser.Physics.ARCADE);
    TA.level0.turtle.body.immovable = true;
    player.fixedRotation = true;

    wallGroup = game.add.physicsGroup();

    game.camera.follow(player);

    game.input.onTap.add(onTap, this);

    buildLevel(Levels.level0);

  },

  update: function() {
    player.body.velocity.setTo(0, 0);
    player.body.angularVelocity = 0;

    game.physics.arcade.collide(player, TA.level0.npc, this.firstPersonCollision, null, this);
    game.physics.arcade.collide(player, TA.level0.turtle, this.stateChangeCollision, null, this);
    game.physics.arcade.collide(player, wallGroup, wallCollision, null, this);
    game.physics.arcade.collide(player, TA.level0.fakeKiwi, this.firstPersonCollision, null, this);

    if(TA.createDiaFlag == false){// if text box not up, move //createTextFlag == false ||
      if (game.input.activePointer.isDown)
      {
        //  400 is the speed it will move towards the touch
        game.physics.arcade.moveToPointer(player, 400);

        //  if it's overlapping the touch, don't move any more
        if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
        {
          player.body.velocity.setTo(0, 0);
        }
      }
      else
      {
        player.body.velocity.setTo(0, 0);
      }
    }else if(TA.createDiaFlag == true){

      if(game.input.activePointer.isDown){
        console.log('hallowe');
      }

    }
  },


  stateChangeCollision: function(obj1, obj2){
    if (!TA.level0.completedPuzzle) {
        TA.playerX = obj1.body.center.x;
        TA.playerY = obj2.body.center.y;
        game.state.start('Image');
    }
  },

  firstPersonCollision: function(obj1, obj2) {
    npcCollision(obj1, obj2);
    TA.level0.turtle.visible = true;
  }
}
