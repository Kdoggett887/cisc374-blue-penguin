


function filterClass(game, imageKey) {
    this.game = game;
    this.imageKey = imageKey;
    var cleanimage = null; 
    var filterimage = null;



    var cameraTopX = game.camera.x + (game.width/2) - (game.camera.width/2); 
    var cameraTopY = game.camera.y + (game.height/2) - (game.camera.height/2);


    this.setup = function() {
        

        var blurFilter = new Phaser.Filter(game, null, blurShader);

        this.setupImages(game, this.imageKey, blurFilter);

        var Dbutton;
        Dbutton = new FilterButton(game, cameraTopX + (game.camera.width/2), cameraTopY + 312, "emptyButton", "BLUR", blurFilter, Dbutton);
        Dbutton.button.scale.setTo(2,2);

        var undoButton;
        undoButton = new LabelButton(game, cameraTopX + (game.camera.width/2), cameraTopY + 380, "emptyButton", "UNDO", undoOnClick, undoButton);
        undoButton.scale.setTo(2,2);
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
        cleanimage = game.add.sprite(cameraTopX, cameraTopY, imageKey);
        cleanimage.scale.setTo(0.5, 0.5);
        filterimage = game.add.sprite(cameraTopX, cameraTopY, imageKey);
        filterimage.scale.setTo(0.5, 0.5);
        filterimage.x = cameraTopX + game.camera.width - filterimage.width;
        this.applyFilter(filterimage, filters);
    }

    function pushFilter(image, filter) {
        if (image.filters == null) {
            image.filters = [ filter ];
        }
        else {
            image.filters.push(filter);
            image.filters = image.filters;
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
        pushFilter(cleanimage, this.filter);
        this.button.frame = this.button.frame == 2 ? 0 : 2;
    }

    function undoOnClick() {
        popFilter(cleanimage);
        this.frame = this.frame == 2 ? 0 : 2;
    }

    var blurShader = [
        "precision mediump float;",

        "varying vec2 vTextureCoord;",
        
        "uniform sampler2D uSampler;",

        "void main(void) {",

            "vec4 sum = vec4(0.0);",

            "vec2 tc = vTextureCoord;",

            "float resolution = 600.0;",
            "float radius = 2.0;",
            "vec2 dir = vec2(1.0, 1.0);",

            "float blur = radius/resolution;",

            "float hstep = dir.x;",
            "float vstep = dir.y;",

            "sum += texture2D(uSampler, vec2(tc.x - 4.0*blur*hstep, tc.y - 4.0*blur*vstep)) * 0.0162162162;",
            "sum += texture2D(uSampler, vec2(tc.x - 3.0*blur*hstep, tc.y - 3.0*blur*vstep)) * 0.0540540541;",
            "sum += texture2D(uSampler, vec2(tc.x - 2.0*blur*hstep, tc.y - 2.0*blur*vstep)) * 0.1216216216;",
            "sum += texture2D(uSampler, vec2(tc.x - 1.0*blur*hstep, tc.y - 1.0*blur*vstep)) * 0.1945945946;",

            "sum += texture2D(uSampler, vec2(tc.x, tc.y)) * 0.2270270270;",

            "sum += texture2D(uSampler, vec2(tc.x + 1.0*blur*hstep, tc.y + 1.0*blur*vstep)) * 0.1945945946;",
            "sum += texture2D(uSampler, vec2(tc.x + 2.0*blur*hstep, tc.y + 2.0*blur*vstep)) * 0.1216216216;",
            "sum += texture2D(uSampler, vec2(tc.x + 3.0*blur*hstep, tc.y + 3.0*blur*vstep)) * 0.0540540541;",
            "sum += texture2D(uSampler, vec2(tc.x + 4.0*blur*hstep, tc.y + 4.0*blur*vstep)) * 0.0162162162;",

            //discard alpha for our simple demo, multiply by vertex color and return
            // "gl_FragColor = vec4(sum.rgb, 1.0);",
            "gl_FragColor = sum;",

        "}",

    ];
}
