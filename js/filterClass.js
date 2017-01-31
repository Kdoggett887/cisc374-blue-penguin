function filterClass(game, imageKey, shaders) {
    this.game = game;
    this.imageKey = imageKey;
    var cleanImage = null;
    var filterImage = null;
    this.filters = [];
    this.shaders = shaders;
    var slideButton = [];
    var sliderText = [];
    var hasGrayscale = false;
    var filterCounter = {};
    var counterText = {};

    var cameraTopX = game.camera.x + (game.width/2) - (game.camera.width/2);
    var cameraTopY = game.camera.y + (game.height/2) - (game.camera.height/2);


    this.setup = function() {

      this.makeFilters();
      this.setupImages(game, this.imageKey, this.filters);
      this.setupButtons();
      this.setupCounters();

      //for(i = 0; i < shaders.length; i++){
      //  this.setupSlider(i, shaders[i]);
      //}

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

  //this will setup the counters for each filter in the bottom left corner
  this.setupCounters = function(){
    //x values will start at 50px, and first line will be at y = 500px
    xStart = 50;
    yStart = 400;

    //work through each shader to get the text down and setup hash
    for(i = 0; i < this.shaders.length; i++){
      //initialize all to zero and push text into counterText array
      var shaderName = this.shaders[i][1];

      filterCounter[shaderName] = 0;
      counterText[shaderName] = game.add.text(xStart, yStart + i*50, shaderName + ": " + filterCounter[shaderName], {font: "25px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 700, align: "left"});
    }

  }

    this.setupSlider = function(index, shader){
      slideButton.push(game.add.sprite(50 , 300 + index*50, 'slider'));

      slideButton[index].inputEnabled = true;
      slideButton[index].input.enableDrag();
      slideButton[index].input.allowVerticalDrag = false;

      bounds = new Phaser.Rectangle(50, 300 + index*50, 300, 100);

      slideButton[index].input.boundsRect = bounds;
      slideButton[index].numberOfSlides = 0;


      sliderText.push(game.add.text(400, 300 + index*50, shader[1] + ": " + slideButton[index].numberOfSlides, {font: "25px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 700, align: "left"}));

    }

    this.checkSliderPosition = function(index){
      var x = slideButton[index].position.x;
      var originalFilterValue = slideButton[index].numberOfSlides;


      //check the slider position
      var diff = x - 50;
      var slides = Math.floor(diff/75);



      //if there is a difference, update slideButton and text
      if(slides != originalFilterValue){
        if(slides > originalFilterValue){
          //push a filter on
          if(!(this.shaders[index][1] == "GRAYSCALE" && hasGrayscale == true)){
            pushFilter(cleanImage, this.filters[index]);
          }

        }
        else{
          //pop a filter
          removeSpecificFilter(cleanImage, this.filters[index]);
        }

        slideButton[index].numberOfSlides = slides;
        sliderText[index].setText(this.shaders[index][1] + ": " + slides);
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

    //ths will be used to check update the counters for the display
    this.updateCounters = function(){
      for (var key in filterCounter){
        //set text within counterText object
        counterText[key].setText(key + ": " + filterCounter[key]);
      }
    }

    function pushFilter(image, filter) {

      //check if filter is greyscale and greyscale already has 1 filter, if it does don't allow
      if(!(filter.name == "GREYSCALE" && filterCounter["GREYSCALE"] == 1)){
        if (image.filters == null) {
            image.filters = [ filter ];
        }
        else {


            image.filters.push(filter);
            image.filters = image.filters; //NOTE: only updates when you set it to itself, DO NOT DELETE


        }

        //now handle updating of filterCounter object
        var name = filter.name;
        filterCounter[name]++;
      }

    }

    function popFilter(image) {
        if (image.filters != null) {
            if (image.filters.length <= 1) {
                var filter = image.filters.pop(image);
                image.filters = null;
            }
            else {
                var filter = image.filters.pop(image);
                image.filters = image.filters;
            }

            //update count in the filterCoutner obj
            filterCounter[filter.name]--;
        }

    }

    function removeSpecificFilter(image, filter){
      console.log(filter);
      console.log("this is image filter below");
      console.log(image.filters);
      if (image.filters != null){
        if (image.filters.length <= 1){
          image.filters = null;
        }
        else{

            image.filters.splice(i, 1);
            image.filters = image.filters;
            return;

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
          TA.changeCurrentLevel();
          // var currentLevel = TA.getCurrentLevel();
          // console.log("currentlevel " + currentLevel);
          //
          //
          // if (currentLevel == 0) {
          //   game.state.start('Level1');
          //   currentLevel++;
          //   console.log('starting' + 'level1');
          // }
          // else if (currentLevel == 1) {
          //   game.state.start('Level2');
          //   currentLevel++;
          //   console.log('starting' + 'level2');
          // }
          // else if (currentLevel == 2) {
          //   game.state.start('Level3');
          //   currentLevel++;
          //   console.log('starting' + 'level3');
          // }
          // else if (currentLevel == 3) {
          //   game.state.start('GameOver');
          //   currentLevel++;
          //   console.log('starting' + 'levelgameover');
          // }


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
          // incompleteText = game.add.text(game.world.centerX, game.world.centerY, "images are different...try again",
          //   {font: "25px Arial", fill: "#ffffff", align: "center"});
          // console.log(incompleteText);
        }
    }

}
