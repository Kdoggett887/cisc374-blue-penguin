var imageState = {

  puzzle: null,

  create: function(){
    //format for shader list: [[shader, textName, passes]
    game.input.onTap.add(onTap, this);


    this.puzzle = new filterClass(game, 'turtlePic1', TA.currentTurtle.shaderList);
    //console.log(TA.currentTurtle);
    this.puzzle.setup();

    this.setDialogue();

    addUI();//mute and retart etc.

  },

  update: function(){
    this.puzzle.updateCounters();

    //for(i = 0; i < this.puzzle.filters.length; i++){
    //  this.puzzle.checkSliderPosition(i);
    //}


  },

  toGame: function(){
    // var currentLevel = TA.getCurrentLevel();
    // console.log("fuckme");
    //
    // if (currentLevel = 0) {
    //   game.state.start('Level0');
    // }
    // else if (currentLevel == 1) {
    //   game.state.start('Level1');
    // }
    // game.state.start('GameOver');
    // console.log('hello');
  },

  setDialogue: function() {
    sayDialogue(TA.currentTurtle.dialogue);
  },



}
