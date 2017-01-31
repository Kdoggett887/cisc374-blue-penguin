## Authors and Contact Information

Kevin Jones - ksjones@udel.edu  
Keith Doggett  
Kalina Ye  
Danielle Wegrzyn - dwegrzyn@udel.edu  

## Description
Detective KJ and the 30,000 Turtles is a game that helps kids learn about image processing. In the game, you are a kiwi detective, 'KJ', who must solve a mystery involving missing turtles inside Professor Pixel's mansion. KJ navigates around Professor Pixel's mansion mazes and finds turtles. He must match images of turtles to other images that have been altered by a  variety of filters.

## Installation Steps

### Terminal Based Server
Open terminal and navigate to the directory containing 'index.html'  
Run your server command (i.e. `http-server`)  
Navigate to http://localhost:your-port  

### X AMP Stack
Move all files/folders in repository into 'www' folder inside of the stack  
Run your server  
Navigate to http://localhost:your-port  

### Android
Use cordova to create a new project  
Copy repository files/folders to 'www' folder  
Add android platform to project  
Build Project  
Find APK in 'platform' folder  
Copy APK file to connected device  
Find in device files and install  

More information can be found at [https://cordova.apache.org/](https://cordova.apache.org/)  



## How to Use
Open the 'index.html' file in your web browser  

## Issues
*There is no buffer after hitting NPCs so it is possible to have dialogue boxes pop up frequently. Sometimes when it happens too quickly, the text will say 'undefined' in certain areas.

*On Android devices, the app's ratio does not fit when switching screen orientation. It is suggested to open the app while the device is in landscape mode to have better view.

*There could be a problem with how filters are applied that it creates and image that is equivalent based on the number of filters, but could look different. Untested for the most part

## Sidelined Code
  *Sliders for applying filters instead of buttons (except grayscale, which can only toggle)
  *Sobel filter (works but unused)

## Future Plans
  *Sliders for changing filters  
  *Additional levels  
  *More in-depth story
  *Clear all filters button (might not be needed if sliders are implemented)

## Project Sources
  Kiwi base for detective_intro.png - https://commons.wikimedia.org/wiki/File:TeTuatahianui.jpg  
  Phaser Javascript Library - https://phaser.io/  
  Music: DancesandDames.mp3- http://incompetech.com/music/royalty-free/index.html?collection=41  
  underwater3.png- phaser asset folder (https://phaser.io/examples/v2/loader/asset-pack)  
  Game background: darkback.jpg- https://pixabay.com/en/rain-falling-black-effect-dark-316580/  
  Wall texture: wall.jpg- https://sftextures.com/2014/09/01/mysterious-world-destroyed-black-noisy-metal-texture/  
