var gameTitleState = {

  create: function(){
    //display the title of the game
    var name = game.add.text(80, 80, 'Detective KJ and the Mystery of the 30,000 Turtles', { font: '50px Arial', fill: '#ffffff', wordWrap:true, wordWrapWidth:700});
    name.font = 'Lilita One';
    name.fontSize = 80;
    name.align = 'center';
    //text to show how to start the game
    var startLabel = game.add.text(80, 520,
                    "Press button to start!", {font: "25px Arial", fill: "#ffffff" });

    var startButton = new LabelButton(game, game.math.roundTo(game.width/2), game.math.roundTo(game.height/2) + 200, "emptyButton", "START", this.start, startButton);
    startButton.scale.setTo(2.0, 2.0);
    
    var flashbackKiwi = game.add.sprite(game.width-250, game.height-250, 'BWkiwi');
    

  },

  start: function(){
    game.state.start('Intro');
  }

}
