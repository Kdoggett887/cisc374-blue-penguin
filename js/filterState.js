var imageState = {

  puzzle: null,

  create: function(){
    //format for shader list: [[shader, textName, passes]
    this.puzzle = new filterClass(game, 'turtlePic1', TA.currentTurtle.shaderList);
    //console.log(TA.currentTurtle);
    this.puzzle.setup();

  },

  update: function(){
    this.puzzle.checkSliderPosition(null);
  },

  toGame: function(){
    game.state.start('GameOver');
    console.log('hello');
  }

}
