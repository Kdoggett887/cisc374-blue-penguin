var sprites;
var cursors;


function create() {

    //  Here we create a group, populate it with sprites, give them all a random velocity
    //  and then check the group against itself for collision

    sprites = game.add.physicsGroup(Phaser.Physics.ARCADE);


    //allow player to move
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    cursors = game.input.keyboard.createCursorKeys();




    for (var i = 0; i < 90; i++)
    {
        var s = sprites.create(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'spinner');
        s.animations.add('spin', [0, 1, 2, 3]);
        s.play('spin', 20, true);
        s.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
    }

    sprites.setAll('body.collideWorldBounds', true);
    sprites.setAll('body.bounce.x', 1);
    sprites.setAll('body.bounce.y', 1);

}
