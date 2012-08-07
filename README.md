#wpAd.Video

jQuery is required. Add the following script to the page:

    :::html
    <script type="text/javascript" src="http://js.washingtonpost.com/wp-srv/ad/video.js"></script>
    
For more interaction options with the player, add this script below the video.js script:

    :::html
    <script type="text/javascript" src="http://js.washingtonpost.com/wp-srv/ad/video_interaction.js"></script>

This file adds support for the following methods:
######addPixel
######attr
######bind
######unbind
######switchVideo
######play
######pause
######stop
######mute
######unmute

#HOW TO USE:
Takes a single argument (Object) with the following possible keys and default values:

    :::javascript
    {
      'source': [], //REQUIRED
      'width': 320,
      'height': 240,
      'mute': true,
      'autoplay': true,
      'poster': false,
      'preload': false,
      'preferHTML5': false,
      'customFlashVars': '',
      'backgroundColor': '#000000',
      'flashVideoPlayer': 'http://media.washingtonpost.com/wp-srv/ad/VidPlayer.swf',
      'rndm': false,
      'html5PlayerSettings' : {
        'controls': true,
        'loop': false,
        'setHeight': false
      }
    }

##Example of creating a new player
    :::javascript
    var myPlayer = new wpAd.Video({ /*any options listed above go here*/ });
    
    //add the video player to a div with an id of 'target':
    myPlayer.appendTo('#target');
    
##source 
######The source of the video *REQUIRED
######Array or String
######Default: []
An array of possible video source URL's, for both Flash and HTML5 videos. A String can be used for a single video source.

##width
######The width of the video
######Number
######Default: 320
The width of the video (pixels).

##height
######The height of the video
######Number
######Default: 240
The height of the video (pixels).

##mute
######Indicates whether the video should start muted
######Boolean
######Default: true
Setting this value to true mutes the video. Setting this value to false unmutes the video.

##autoplay
######Indicates whether the video should autoplay on page load
######Boolean
######Default: true
Setting this value to true autoplays the video. Setting this value to false does not autoplays the video.

##poster
######Indicates whether the video should start muted
######String
######Default: false
URL of the poster image for the video. For no poster, use the boolean false or omit (uses default value of false).

##preferHTML5
######Attempt to use HTML5 video over Flash
######Boolean
######Default: false
Setting this to true will attempt to use HTML5 video over Flash. If the browser supports HTML5 video and is able to play at least one of the sources passed in, then an HTML5 video player will be used. Otherwise, it will default to a Flash player. Setting this to false (default) will always attempt to render a Flash player first and will then fall back on an HTML5 player if the browser doesn't support flash (ie: IOS), but does support HTML5 video and at least one of the video sources that are passed in.

##customFlashVars
######custom flashvars for Flash video player
######String
######Default: '' (Empty String)
Custom additional flashvars to be passed in to the flash player. Multiple flashvars should be seperated by & (eg: 'clicktag=http://www.example.com&controls_alpha=0.5').

##backgroundColor
######background colour of the player
######String
######Default: '#000000'
Hex value for background colour for the video player (as a String).

##flashVideoPlayer
######URL of Flash video player
######String
######Default: 'http://media.washingtonpost.com/wp-srv/ad/VidPlayer.swf'
URL to the Flash video player.

##rndm
######Number to appended to the ID of the video player
######Number
######Default: false
Override the random number assigned to the ID of the video player. Could be useful for applying specific styles or for targetting with JavaScript. Default ID will be 'video[random 3 digit number]' (eg: video538), or for IE it will be 'videoie[random 3 digit number]' (eg: videoie538). If you pass in a value here, the ID will become 'video[the value you pass in]' or 'videoie[the value you pass in]'. Set to false to generate a random number, or simply omit.

##html5PlayerSettings
Specific settings for HTML5 player
Object {key: boolean}
Default:

      :::javascript
      {
        'controls': true,
        'loop': false,
        'setHeight': false
      }
      
######controls
set to true to show controls. Set to false to hide controls.
  
######loop
set to true to loop the video. Set to false to not loop the video.
  
######setHeight
set to true to use the provided height for the player. Set to false to use a dynamic flexible height based on the width of the player and the video's aspect ratio







#JAVASCRIPT METHODS:

##appendTo
######Argument: 
1. jQuery selector (String), DOM object, or jQuery Object (required) *REQUIRED

######Description
Adds the video to the specified element
EG:

    :::javascript
    myVideo.appendTo('#target');

    
##flashplayer()
######0 Arguments
    
######Description
Returns the the flash video player object
EG:

    :::javascript
    myVideo.flashplayer();

    
##toString
######0 Arguments
    
######Description
Returns the the flash player embed code as a String (needed to document.write the player in IE)
EG:

    :::javascript
    myVideo.toString();

    
##addPixel
######Argument:
1. URL of tracking pixel (String) *REQUIRED

######Description
Render a tracking pixel that is appended to the body of the page
EG:

    :::javascript
    myVideo.addPixel('trackingPixelURL');


##bind
######Arguments:
1. The event to bind to: play, pause, stop, mute, unmute, scrub, all (String). *REQUIRED
2. The JavaScript function to call (String). *REQUIRED
3. Optional parameter to pass back to the js function (STRING) *OPTIONAL

######Description
Bind a JavaScript funciton to an event. Similar to jQuery's bind method.
EG:

    :::javascript
    myVideo.bind('play', 'console.log', 'play clicked');

    
##unbind
######Arguments:
1. Event. If omitted, all events/js functions are unbound (String) *OPTIONAL

######Description
Unbind JavaScript functions from an event. If argument is omitted, all events/js functions are unbound
EG:

    :::javascript
    myVideo.unbind('play');
    

##switchVideo
######Arguments:
1. Video Source (String) *REQUIRED

######Description
Switch the source of the video
EG:

    :::javascript
    myVideo.switchVideo('newVideoSource.swf');

    
##attr
######Arguments:
1. The attribute of the Flash player to get (String) OR an Object of mapped attributes to set (Object). *OPTIONAL

######Description
Get or set Flash video player attributes. If argument is omitted, return all attributes as an Object.
EG:

    :::javascript
    //returns all attributes as an Object
    myVideo.attr();

    //get the source of the video
    myVideo.attr('source');

    //set the source of the video
    myVideo.attr({source: 'newSource.flv'});


##play

    :::javascript
    myVideo.play();
    
##pause

    :::javascript
    myVideo.pause();
    
##stop

    :::javascript
    myVideo.stop();

##mute

    :::javascript
    myVideo.mute();

##unmute

    :::javascript
    myVideo.unmute();
    

    
    
    
    
    
#ADDING TO THE PAGE:
Use the appendTo method

    :::javascript
    if($.browser.msie){
      //looks like no async loading with ExternalInterface functionality for IE...
      document.write(vidplayer.toString());
    } else {
      vidplayer.appendTo('#target');
    }



#IN DEPTH EXAMPLE:
      :::html
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8"> 
        <title>Video Demo</title>
        
        <style type="text/css">
          #controls{
            size:14px;
            width: 100px;
            background-color:#efefef;
            border: 1px solid #666;
            margin:0;
            padding:30px;
            position:fixed;
            top:10px;
          }
          #controls ul{
            font-family:sans-serif;
            margin:0;
            padding:0;
          }
          #controls li{
            list-style:none;
            line-height:24px;
          }
        </style>
        
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
        
      </head>

      <body>

        <div id="target">
          <!-- Video player will be loaded here -->
        </div>
        
        <!-- Demo: JavaScript controls -->
        <div id="controls">
          <h3 style="margin:0;padding:0">Controls</h3>
          <ul>
            <li>
              <a rel="play" href="#"></a>
            </li>
            <li>
              <a rel="pause" href="#"></a>
            </li>
            <li>
              <a rel="stop" href="#"></a>
            </li>
            <li>
              <a rel="mute" href="#"></a>
            </li>
            <li>
              <a rel="unmute" href="#"></a>
            </li>
          </ul>
        </div>

        <script type="text/javascript" src="http://js.washingtonpost.com/wp-srv/ad/video.js"></script>
        <script type="text/javascript" src="http://js.washingtonpost.com/wp-srv/ad/video_interaction.js"></script>
        
        <script type="text/javascript">
          var vidplayer = new wpAd.Video({
            'preferHTML5': false,
            'source': ['http://videoads.washingtonpost.com/test.f4v', 
              'http://videoads.washingtonpost.com/attVideo_theRoot.webm',
              'http://videoads.washingtonpost.com/horsepower_15_min.ogg',
              'http://videoads.washingtonpost.com/attVideo_theRoot.mp4'
            ],
            'autoplay': false,
            'mute': false,
            'poster': 'http://media.washingtonpost.com/wp-adv/advertisers/smartwater/2011/poster.jpg',
            'preload': false,
            'width': 700,
            'height': 390
          });

          if($.browser.msie){
            //looks like no async loading with ExternalInterface functionality for IE...
            document.write(vidplayer.toString());
          } else {
            vidplayer.appendTo('#target');
          }

          $('#controls').css({
            'left':vidplayer.settings.width + 20 + 'px'
          }).find('a').each(function(){
            $(this).bind('click', function(e){
              e.preventDefault();
              vidplayer[this.rel]();
            }).html('&raquo; ' + this.rel)
          });
          
          //Demo: track video plays
          //important to wait for window.load or any other method to ensure the .swf has loaded
          $(window).load(function(){
            vidplayer.bind('play', 'vidplayer.addPixel', 'play_impression_pixel');
          })
        </script>

      </body>
      </html>
    

##Last updated by Mike Spencer 08/07/12