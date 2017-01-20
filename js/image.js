MonsterMystery.GameImage = function(game, asset, x, y, filter){

  //make image a new Sprite

  Phaser.Sprite.call(this, game, x, y, asset, 0);

  this.filtered = false;
  this.filter = filter;

  this.inputEnabled = true;
  this.events.onInputDown.add(this.toggle, this);
  this.toggle();
  this.toggle();

  game.add.existing(this);

  return this;

}

MonsterMystery.GameImage.prototype = Object.create(Phaser.Sprite.prototype);
MonsterMystery.GameImage.prototype.constructor = MonsterMystery.GameImage;


MonsterMystery.GameImage.prototype.update = function() {
  // if (this.filtered) {
  //   this.filters = [ ];
  // }
  // else {
  //   this.filters = [ this.filter ];
  // }
}

//This is the function to toggle the filter that is on the image
MonsterMystery.GameImage.prototype.toggle = function(){

  if(this.filtered){
    console.log("none");
    this.filtered = false;
    this.filters = null;

  }
  else{
    console.log("gray");
    this.filtered = true;

    this.filters = [ this.filter ];
    console.log(this.filters);
  }

}
