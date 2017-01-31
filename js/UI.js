//--- START/RESTART

var addUI = function(){



var restart_label = game.add.text(game.camera.width - 100, game.camera.height - 50, 'Restart', { font: '20px Arial', fill: '#fff', align: 'right'});
restart_label.inputEnabled = true;
console.log(restart_label);

restart_label.events.onInputUp.add(function () {
   startingGame = true;
   solvedTurtle = false;
   completedPuzzle1 = false;
   foundPerson = false;
   TA.currentLevel = 0;
   TA.level0.reset();
   TA.level1.reset();
   TA.level2.reset();
   TA.level3.reset();
   //game.state.start('GameTitle');
   game.state.start("Intro");
});


restart_label.fixedToCamera = true;
console.log(game.camera.width);

//MUTE BUTTON LABEL
var mute_label = game.add.text(game.camera.width - 100, game.camera.height - 30, 'Mute', { font: '20px Arial', fill: '#fff', align: 'left'});
 mute_label.inputEnabled = true;
 mute_label.fixedToCamera = true;

mute_label.events.onInputUp.add(function () {

    if(music.mute == false){
      music.mute = true;
    }else{
      music.mute = false;
    }
     //game.input.onDown.add(changeVolume, this);
});

}
