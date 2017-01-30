var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');


//declare Game object and other globals
var TA = new function(){
  this.createDiaFlag = false;
  this.playerX;
  this.playerY;
  this.startingGame = true;
  this.currentTurtle = null;
  this.currentLevel = 0;

  this.turtleCount = 0;


  this.resetGlobals = function() {
    this.createDiaFlag = false;
    this.startingGame = true;
    this.currentTurtle = null;
    this.currentLevel = 0;
  }



  this.level0 = new function() {
    this.turtleGroup;
    this.fakeKiwi;
    this.npc;
    this.completedPuzzle = false;
    this.startingLevel = true;

    this.reset = function() {
      this.startingLevel = true;
      this.completedPuzzle = false;
    }

  }

  this.level1 = new function() {
    this.turtleGroup;
    this.turtle1;
    this.turtle2;
    this.turtle3;
    this.startingLevel = true;
    this.completedPuzzle = false;

    this.reset = function() {
      this.startingLevel = true;
      this.completedPuzzle = false;
    }

  }

  this.level2 = new function() {
    this.startingLevel = true;
    this.completedPuzzle = false;
    this.turtleRed;
    this.turtleGreen;
    this.turtleBlue;
    this.turtleFinal;

    this.reset = function() {
      this.startingLevel = true;
      this.completedPuzzle = false;
    }
  }

  this.level3 = new function() {
    this.startingLevel = true;
    this.completedPuzzle = false;
    this.profpixel;

    this.reset = function() {
      this.startingLevel = true;
      this.completedPuzzle = false;
    }
  }


  // Handles changing the current level state
  // also resets turtleCount and sets currentLevel
  this.changeCurrentLevel = function() {
    if (this.currentLevel == 0) {
      if (this.turtleCount == 1) {
        this.turtleCount = 0;
        this.currentLevel = 1;
        game.state.start('Level1');
      }
      else {
        game.state.start('Level0');
      }
    }
    else if (this.currentLevel == 1) {
      if (this.turtleCount == 3) {
        this.turtleCount = 0;
        this.currentLevel = 2;
        game.state.start('Level2');
      }
      else {
        game.state.start('Level1');
      }
    }
    else if (this.currentLevel == 2) {
      if (this.turtleCount == 4) {
        this.turtleCount = 0;
        this.currentLevel = 3;
        game.state.start('Level3');
      }

      else {
        game.state.start('Level2');
      }
    }
  }

  this.setTurtleVisibility = function(turtleList) {
    for (var i = 0; i < turtleList.length; i++) {
      if (i == this.turtleCount) {
        turtleList[i].visible = true;
      }
      else turtleList[i].visible = false;
    }
  }
}


//----------VARIABLES ---------------------//
var w = 800; // game width
var spacebar;

var createTextFlag = false;
var createDiaFlag = false;
var playerX;
var playerY;
var startingGame = true;
var foundPerson = false;
var solvedTurtle = false;

content = ['hello darkness my old friend', "zz zzz zzzz zzzz zzz zzz z z z z z z z z z z zz zzzz zzzz zzzz zzzz zzzzz", 'you found a key', "orange peels"];

var intro = ['It has been 10 years since you have lost Powder, your pet turtle. Recently a string of turtle disappearances have occurred. You have gotten a lead that there have been some turtle sightings at the Professor Pixel mansion. Unfortunately all the wanted pictures of missing turtles are all distorted. It is up to you to match the turtles you find to their rightful owners.'];

var intro2 = ['It has been 10 years since you have lost Powder, your pet turtle.', "Recently a string of turdle disappearances have occured.", 'You have gotten a lead that there have been some turtle sightings at the Professor Pixel mansion.', "Unfortunetly all the wanted pictures of missing turtles are all distorted.", 'It is up to you to match the turtles you find to their rightful owners'];

var sonictalk = ['HEY! Have you seen my missing turtle? I have not seen him in a week. Everyone I know has lost their turtles. Unfortunately all of the pictures in the missing turtle posters are messed up by some evil force. Hm, here are a lot of turtles in this place. Take some missing turtle flyers.', ' Tap twice to exit speech.'];

var npctalk = ['me: Im gonna help find and return these turtles.', 'me to me: Steal them and keep them all for yourself'];

var sampleText = ['This is sample text that will be replaced', 'by the real text later...'];

var profpixeltalk = ['Oh no! You figured out my secret image forumulas! You better not take my last turtles!'];

var level2RedText = ['This red filter will REMOVE the red in this picture. Match the images!'];
var level1AddText = ['This add filter will brighten picture. Match the images!'];
var level0GrayText = ['This gray filter will change the color pixels in to values in grayscale. Match the images!']


var player;
var npc;
var cursors;
var inBound;
var turtle;
var introText;
var NpcTest;
//var incompleteText;

var music;
var mute_label;
var wallGroup;
var turtleText;
var currentDialogue;
var dialogueTimer = false;

var puzzle;
var completedPuzzle1 = false;

function resetAll() {
  TA.resetGlobals();
  TA.level0.reset();
  TA.level1.reset();
}


function wallCollision (obj1, obj2) {
  //console.log('wall hit');
}

// function collidePerson(obj1, obj2){
//     if(!foundPerson){
//         foundPerson = true;
//         console.log("found sonic!");
//         turtle.visible = true;
//     }
//   npcCollision(obj1, obj2);
// }



//method to compare if two images are filtered the same way
function compareImages(firstImage, secondImage){
    console.log("compare images");
    console.log(firstImage);
    console.log(secondImage);

    //test for array comparisons
    var arr1 = firstImage.filters;
    var arr2 = secondImage.filters;

    if (firstImage.key != secondImage.key){
        return false;
      }

    //neither image is filtered
    if (arr1 == null && arr2 == null){
        return true;
      }
    else if (arr1 == null || arr2 == null){
        return false;
      }

    if (arr1.length != arr2.length){
        return false;
      }

    //if here, we know that they are both arrays so we can sort them
    var nameArr1 = [];
    var nameArr2 = [];


    for(var i = arr1.length; i--;){
        nameArr1.push(arr1[i].name);
        nameArr2.push(arr2[i].name);
      }

    arr1 = nameArr1.sort();
    arr2 = nameArr2.sort();


    for (var i = arr1.length; i--;) {
        if(arr1[i] != arr2[i]){
            return false;
          }
      }

    return true;
}

//Collision handler for NPCs
var npcCollision = function(player, npc){
  TA.createDiaFlag = true;
  sayDialogue(npc.dialogue);
}

//collision handler for Turtles
var stateChangeCollision = function(obj1, obj2){
  if (!TA.level0.completedPuzzle) {
    TA.playerX = obj1.body.center.x;
    TA.playerY = obj2.body.center.y;
    TA.currentTurtle = obj2;
    game.state.start('Image');
  }
}


function onTap(pointer, doubleTap) {
   if (doubleTap)
   {
     //  They double-tapped, so swap the image
     if(TA.createDiaFlag == true){
       TA.createDiaFlag = false;
     }
   }
}


function setupUpdate() {
  player.body.velocity.setTo(0, 0);
  player.body.angularVelocity = 0;

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
    }

  }
}


//-----------STATES-----------------//

game.state.add("Boot", bootState);
game.state.add("Preload", preloadState);
game.state.add("GameTitle", gameTitleState);
game.state.add("Intro", introState);
game.state.add("Main", mainState);
game.state.add("Level0", Level0);
game.state.add("Level1", Level1);
game.state.add("Level2", Level2);
game.state.add("Level3", Level3);
game.state.add("Image", imageState);
game.state.add("GameOver", gameOverState);
game.state.start("Boot");


/*
var level = [
  '                                                       ',
  '                                                       ',
  '                                                       ',
  '                                                       ',
  '                              ',
  '                              ',
  '',
  '',
  '',
  '',
  '',
  '',
  '  ',
  '   ',
  ' ',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '              xxxxxxxxxxxxxxxxxxxxxxxx             ',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              xxxxxxxxxx     xxxxxxxxx             ',
];
var level2 = [
 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
 'x              x                                      x',
 'x              x                                      x',
 'x              x                                      x',
 'x              x       x                              x',
 'x                      x                           xxxx',
 'x                      x                x          x',
 'x                      x                x          x',
 'xxxxxxxxxxxxxxxxxxxxxxxx                x          x',
 '                                        x          x',
 '                                        x          x',
 '                                        x          x',
 '                                        x          x',
 '                                        x          x',
 'x      xxxxxx          xxx    xxx       xxxxxxxxxxxx',
 'x         x            xxxx  xxxx                 x',
 'x         x             xxxxxxxx                  x',
 'x         x              xxxxxx                   x',
 'x      xxxxxx              xx                     x',
 'x                                                 x',
 'x                                                 x',
 'x                                                 x',
 'x      xxxxxx  x   x  xxxx  xxxxx  x     xxxxxxx  x',
 'x         x    x   x  x  x    x    x     x        x',
 'x         x    x   x  x x     x    x     xxxxx    x',
 'x         x     xxx   x  x    x    x     x        x',
 'x         x                        xxxxx xxxxx    x',
 'x         x                                       x',
 'x         x                                       x',
 'x         x                                       x',
 'x         x                                       x',
 'x         xxxxxxxxxxxxxx      xxxxxxxxxxxxxxxxxxxxx',
 'x         x            x      x                    ',
 'x         x            x      x                    ',
 'x         x            x      x           x        ',
 'x         xxxxxxx      x      x           x       x',
 'x         x                   x           x       x',
 'x         x                   xxxxxxxxxxxxx       x',
 'x         x                               x       x',
 'x         x                               x       x',
 'x       xxxxxxxxxxxxxxxx     xxxxxxxx     x       x',
 'x       x                    x            x       x',
 'x       x                    x            x       x',
 'x       x                    x            x       x',
 'x       x                    x            x       x',
 'x       x      xxxxxxxxx     x            x       x',
 'x                      x     x            x       x',
 'x                      x     xxxxxxxxxxxxxx       x',
 'x                      x                          x',
 'x                      x                          x',
 'x                      x                          x',
 'xxxxxxxxxxxxxxxxxxxxxxxx     xxxxxxxxxxxxxxxxxxxxxx',
];

*/
