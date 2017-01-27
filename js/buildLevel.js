function buildLevel(level) {
  for (var i = 0; i < level.length; i++) {
    for (var j = 0; j < level[i].length; j++) {

      // Create a wall and add it to the 'walls' group
      if (level[i][j] == 'x') {
        var wall = game.add.sprite(32+32*j, 32+32*i, 'wall');
        wallGroup.add(wall);
        wall.body.immovable = true;
      }
    }
  }
}

var Levels = new function() {
  this.level0 = [
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
}
