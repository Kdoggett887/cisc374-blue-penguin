var preloadState = {

  //preload function where we load all assets in assets folder
  preload: function(){
    game.load.image('phaser', 'assets/sprites/phaser2.png');
    game.load.script('filterX', 'js/lib/filters/BlurX.js');
    game.load.script('filterY', 'js/lib/filters/BlurY.js');
    game.load.script('gray', 'js/lib/filters/Gray.js');

    game.load.image('background','images/darkback.jpg');
    game.load.image('npc','images/npc.png');


    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.image('pic', 'assets/skies/underwater3.png');

    game.load.spritesheet('emptyButton', 'assets/buttons/flixel-button.png', 80, 20);
    game.load.image('turtlePic1', 'images/turtle_1.jpg');

    game.load.audio('noir1', 'images/DancesandDames.mp3');
    game.load.image('wall','images/wall.jpg');
    game.load.image('turtle','images/turtle.png');
    game.load.image('kiwi', 'images/detective_sprite.png');
    game.load.image('BWkiwi','images/detective_intro.png');
    game.load.image('slider', 'assets/sprites/pepper.png');
    game.load.image('profpixel', 'images/prof_pixelsm.png');
  },

  //sends us to the main menu
  create: function(){
    game.state.start("GameTitle");
  }

}
