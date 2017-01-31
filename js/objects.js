

Turtle = function(x, y, game, sprite, dialogue, shaderList){ //turtle object: contains the filter explanations and list of filters/shaders that appear during the filter state after colliding with a turtle
  Phaser.Sprite.call(this, game, x, y, sprite); // extends a phaser sprite object

  this.shaderList = shaderList; //note format: [[shaderObject, filterStringName, numPasses], [....]]
  this.dialogue = dialogue;
  this.game.physics.arcade.enableBody(this);
  this.enableBody = true;
  this.body.immovable = true;
  //this.body.moves = false;
  game.add.existing(this); //adds turtle


}

Turtle.prototype = Object.create(Phaser.Sprite.prototype);
Turtle.prototype.constructor = Turtle;


//displays an NPC's dialogue
var sayDialogue = function(dialogue){
  //later, add an overlay that displays text box and sprite for this person
  currentDialogue = new DialogueBox(game.camera.width/2, game.camera.height/2, dialogue);
  TA.createDiaFlag = true;
  currentDialogue.createText();
}


// =======
// These are efforts to add a buffer for hitting NPCs so the dialogue box doesn't keep popping up.

  // if(dialogueTimer == false){
  //   if(!currentDialogue){
  //     currentDialogue = new DialogueBox(game.camera.width/2, game.camera.height/2, person.dialogue);
  //     console.log("made new dialog box");
  //   }
  //   else{
  //     currentDialogue.content = person.dialogue;
  //     //console.log("updated dialog content " + currentDialogue.content);
  //   }
  //   TA.createDiaFlag = true;
  //   currentDialogue.createText();
  //   dialogueTimer = true;
  //   console.log('dialgoe' + dialogueTimer);
  //
  //
  // }else{// if hit Recently
  //   game.time.events.add(Phaser.Timer.SECOND * 4, function(){
  //     dialogueTimer = false;
  //     console.log('timer' + dialogueTimer);
  //   }, this);
  // }
// }



//a subclass(?) of sprite that displays a dialogue when collided with
NPC = function(x, y, game, sprite, dialogue){
    this.dialogue = dialogue;
    Phaser.Sprite.call(this, game, x, y, sprite);

    this.enableBody = true;
    game.add.existing(this);

    game.physics.enable([this], Phaser.Physics.ARCADE);
    this.body.immovable = true;

}

NPC.prototype = Object.create(Phaser.Sprite.prototype);
NPC.prototype.constructor = NPC;
