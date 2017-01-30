var introState = {
  textIndex: 0,
  textBoxLength: null,
  introSlideText: null,



  create: function(){
    var labelButton = new LabelButton(game, game.math.roundTo(game.width/2), game.math.roundTo(game.height/2) + 200, "emptyButton", "Next", this.toMain, this);
    labelButton.scale.setTo(2.0, 2.0);


    //text2 = game.add.text(game.world.centerX - 40, game.world.centerY -50, "PRESS SPACE", style);
    //introSlideText = game.add.text(80, 80, intro2[0], {font: "25px Arial", fill: "#ffffff" });
    var introStyle = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 700, align: "center", backgroundColor: "#ffff00" };


    introSlideText = game.add.text(game.camera.width/2 - 50, game.camera.height/2 - 50, intro,{font: "25px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 700, align: "left"} );
    introSlideText.anchor.set(0.5);
    //this.textBoxLength = intro.length;


    var flashbackKiwi = game.add.sprite(game.width-250, game.height-250, 'BWkiwi');

  },

  toMain: function(){
    // game.state.start("Main");
    //console.log(introSlideText);
    solvedTurtle = false;
    completedPuzzle1 = false;
    foundPerson = false;
    game.state.start("Level0");
    // TA.currentLevel = 2
    // game.state.start("Level2");

  },

  changeText: function(){
    console.log(this.textBoxLength);
    console.log(this.textIndex);
    if(this.textIndex == (this.textBoxLength-1)){
      // game.state.start("Main");

      game.state.start("Level0");

    }
    else{
      this.textIndex += 1;
      introSlideText.setText(intro2[this.textIndex]);
    }
  }

}
