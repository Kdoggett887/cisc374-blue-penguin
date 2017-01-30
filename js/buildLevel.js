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

  this.level1 = [
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
    '       xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    '       x                    x                x',
    '       x                    x                x',
    '       x                    x                x',
    '       x                    x                x',
    '       x                    x                x',
    '       x                    x                x',
    '       x                    x                x',
    '       x                    x                x',
    '       x                    x                x',
    '       xxxxx        xxxxxxxxxxxxxxx       xxxx',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                     x x x x x x x x x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x     x x x x x x x x x x             x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       xxxxxxxxxxxxxxxx      xxxxx     xxxxxxx',
    '       x              x      x               x',
    '       x              x      x               x',
    '       x              x      x               x',
    '       x              x      x               x',
    '       x                     x               x',
    '       x                     x               x',
    '       x                     x               x',
    '       x                     x               x',
    '       x              x      x               x',
    '       x              x      x               x',
    '       xxxxxxxxxxxxxxxx      xxxxxxxxxxxxxxxxx',
  ];

  this.level2 = [
    '',
    '',
    '',
    '  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ',
    '  x                    x         x           x',
    '  x                    x         x           x',
    '  x                    x         x           x',
    '  x                    x         x           x',
    '  x                    x         x           x',
    '  xxxxxx               x         x           x',
    '       x               xxxx      x           x',
    '       x                                     x      x',
    '       x                                     x      x',
    '       x                                     x      x',
    '       x                                     x      x',
    '       x                                     x      x',
    '       x                                     x      x',
    '       x                                     x      x',
    '       xxxxxxxxxxxxxxxxxxxxxxxxxx            x      x',
    '       x                                            x',
    '       x                                            x',
    '       x                                            x',
    '       x                                            x',
    '       x                                            x',
    '       x                                            x',
    '       x           xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       xxxxxxxxxxxxxxxxxxxxxxxxxxxxx         x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       xxxxxxxxxxxxxxxxxxxxxxxxxxxxx         x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x       xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx       x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x',
    '       x                                     x ',
    '       xxxxxxxxxxxxxxxxx     xxxxxxxxxxxxxxxxx    ',
  ];

  this.level3 = [
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
}