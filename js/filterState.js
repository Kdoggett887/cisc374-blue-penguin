var imageState = {

  puzzle: null,

  create: function(){
    //format for shader list: [[shader, textName, passes]
    game.input.onTap.add(onTap, this);


    this.puzzle = new filterClass(game, 'turtlePic1', TA.currentTurtle.shaderList);
    //console.log(TA.currentTurtle);
    this.puzzle.setup();

    this.setDialogue();

  },

  update: function(){
    this.puzzle.checkSliderPosition(null);
  },

  toGame: function(){
    game.state.start('GameOver');
    console.log('hello');
  },

  setDialogue: function() {
    sayDialogue(TA.currentTurtle.dialogue);
  },



}
