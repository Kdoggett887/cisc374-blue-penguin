var imageState = {

  puzzle: null,

  create: function(){
    //format for shader list: [[shader, textName, passes]
    this.puzzle = new filterClass(game, 'turtlePic1', [[blurShader, "BLUR",2], [arithmeticAddShader,"ADD",1], [grayscaleShader, "GRAYSCALE",1]]);
    //var puzzle = new filterClass(game, 'turtlePic1', [[blurShader, "BLUR", 1]])
    this.puzzle.setup();

  },

  update: function(){

    for(i = 0; i < this.puzzle.filters.length; i++){
      this.puzzle.checkSliderPosition(i);
    }

  },

  toGame: function(){
    game.state.start('GameOver');
    console.log('hello');
  }

}
