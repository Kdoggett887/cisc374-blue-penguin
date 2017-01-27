


function filterClass(game, imageKey, shaders) {
    this.game = game;
    this.imageKey = imageKey;
    var cleanImage = null;
    var filterImage = null;
    this.filters = [];
    this.shaders = shaders;
    var slideButton;
    var sliderText;

    var cameraTopX = game.camera.x + (game.width/2) - (game.camera.width/2);
    var cameraTopY = game.camera.y + (game.height/2) - (game.camera.height/2);


    this.setup = function() {

      this.makeFilters();
      this.setupImages(game, this.imageKey, this.filters);
      this.setupButtons();
      //this.setupSlider(null, null);


    }


  //make array of filters from the shader array
  this.makeFilters = function(){
    for (var i=0; i < this.shaders.length; i++){
      this.filters[i] = new Phaser.Filter(game, null, this.shaders[i][0]);
      this.filters[i].name = this.shaders[i][1];
      this.filters[i].numPasses = this.shaders[i][2];
    }
  }


  //make a button for each filter in our filters array. also makes undo and complete buttons
  this.setupButtons = function(){
    var yloc = 310;
    var xspace = 100;
    var side = 1;

    for (var i=0; i < this.filters.length; i++){
      if(this.filters.length == 1 || i==0){
        side = 0; //middle
      }
      else if(i%2 == 0){
        side = 1; //right side
      }
      else{
        side = -1; //left side
      }


    var newButton = new FilterButton(game, cameraTopX + (game.camera.width/2) + xspace*side*(Math.round(i/2)+1), cameraTopY + yloc, "emptyButton", this.filters[i].name, this.filters[i], newButton);
      newButton.button.scale.setTo(2,2);
    }

    var undoButton;
    undoButton = new LabelButton(game, cameraTopX + (game.camera.width/2), cameraTopY + 380, "emptyButton", "UNDO", undoOnClick, undoButton);
    undoButton.scale.setTo(2,2);

    var completeButton;
    completeButton = new LabelButton(game, cameraTopX + (game.camera.width/2), cameraTopY + 450, "emptyButton", "COMPLETE", completeFilter, completeButton);
    completeButton.scale.setTo(2,2);
  }

    this.setupSlider = function(index, shader){
      slideButton = game.add.sprite(50, 300, 'slider');

      slideButton.inputEnabled = true;
      slideButton.input.enableDrag();
      slideButton.input.allowVerticalDrag = false;

      bounds = new Phaser.Rectangle(50, 300, 300, 100);

      slideButton.input.boundsRect = bounds;
      slideButton.numberOfSlides = 0;

      sliderText = game.add.text(400, 300, "Blur: " + slideButton.numberOfSlides, {font: "25px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 700, align: "left"});

    }

    this.checkSliderPosition = function(index){
      var x = slideButton.position.x;
      var originalFilterValue = slideButton.numberOfSlides;


      //check the slider position
      var diff = x - 50;
      var slides = Math.floor(diff/75);


      //if there is a difference, update slideButton and text
      if(slides != originalFilterValue){
        slideButton.numberOfSlides = slides;
        sliderText.setText("Blur: " + slides);
      }

    }


    //FilterButton is a container class that holds a LabelButton (set up for filtering) and other variables, like the filter object to be applied.
    var FilterButton = function(game, x, y, key, label, filter, overFrame, outFrame, downFrame, upFrame){
        this.filter = filter;
        //note: callbackContext is the FilterButton instance, not the LabelButton
        this.button = new LabelButton(game, x, y, key, label, filterOnClick, this, overFrame, outFrame, downFrame, upFrame)

    };


    //applies a filter from a FilterButton to an image (currently only applies one filter at a time)
    this.applyFilter = function(image, newFilter){
        //toggle on
        if(!image.isFiltered){
            image.filters = [ newFilter ];
            image.isFiltered = true;
        }

        //toggle off
        else{
            image.filters = null;
            image.isFiltered = false;

        }
    }

    this.setupImages = function(game, imageKey, filters) {
        cleanImage = game.add.sprite(cameraTopX, cameraTopY, imageKey);
        cleanImage.scale.setTo(0.5, 0.5);
        filterImage = game.add.sprite(cameraTopX, cameraTopY, imageKey);
        filterImage.scale.setTo(0.5, 0.5);
        filterImage.x = cameraTopX + game.camera.width - filterImage.width;


      //right now this applies all filters in the list to the filtered image
      //later you might want to only apply 1 or 2 or some other combo so the player has to choose amongst the options
      for (var i=0; i < filters.length; i++){
        for(var p = filters[i].numPasses; p > 0; p--){
          pushFilter(filterImage, filters[i]);
        }
      }
    }

    function pushFilter(image, filter) {
        if (image.filters == null) {
            image.filters = [ filter ];
        }
        else {
            image.filters.push(filter);
            image.filters = image.filters; //NOTE: only updates when you set it to itself, DO NOT DELETE
        }
    }

    function popFilter(image) {
        if (image.filters != null) {
            if (image.filters.length <= 1) {
                image.filters = null;
            }
            else {
                image.filters.pop(image);
                image.filters = image.filters;
            }
        }

    }


    //default callback for FilterButtons
    function filterOnClick(){
        // applyFilter(cleanImage, this.filter);
        pushFilter(cleanImage, this.filter);//add the buttons filter
        this.button.frame = this.button.frame == 2 ? 0 : 2;
    }

    function undoOnClick() {
        popFilter(cleanImage);
        this.frame = this.frame == 2 ? 0 : 2;
    }

    function completeFilter() {
        if (compareImages(cleanImage, filterImage)) {

          // completedPuzzle1 = true;
          //
          // console.log("u win");
          TA.turtleCount++;
          console.log(TA.turtleCount);
          var currentLevel = TA.getCurrentLevel();

          if (currentLevel == 0) {
            game.state.start('Level1');
          }
          else if (currentLevel == 1) {
            game.state.start('Level2');
          }
          else if (currentLevel == 2) {
            game.state.start('Level3');
          }
          else if (currentLevel == 3) {
            game.state.start('GameOver');
          }


          // TA.currentTurtle.destroy();
          // TA.currentTurtle = null;

          // TA.currentLevelDone

          // TA.level0.checkTurtlesDone();

          //console.log(TA.currentLevel);
          //console.log(currentLevel.turtleGroup);

          //if(TA.currentLevel.turtleGroup.length == 0){
          //  game.state.start(TA.currentLevel.nextLevel);
          //}

        }
        else{
          console.log("Images different...try again");

          //console.log("Images different...try again");
          //var introStyle = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 700, align: "center", backgroundColor: "#ffff00" };
          incompleteText = game.add.text(game.camera.width/2 - 40, game.camera.height - 70, "images are different...try again",
             {font: "25px Arial", fill: "#ffffff", align: "center"});
          incompleteText.anchor.set(0.5);
          game.time.events.add(Phaser.Timer.SECOND * 3, function(){
            incompleteText.destroy();
          }, this);

          // console.log(incompleteText);
        }
    }

}
