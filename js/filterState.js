var imageState = {

  create: function(){
    //format for shader list: [[shader, textName, passes]
    var puzzle = new filterClass(game, 'turtlePic1', [[blurShader, "BLUR",2], [arithmeticAddShader,"ADD",1], [grayscaleShader, "GRAYSCALE",1]]);
    //var puzzle = new filterClass(game, 'turtlePic1', [[blurShader, "BLUR", 1]])
    puzzle.setup();

  },

  toGame: function(){
    game.state.start('GameOver');
    console.log('hello');
  }

}
