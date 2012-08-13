/*jshint browser: true, evil: true, loopfunc: true */
/* Extends the wpAd.Video object with javascript interaction capabilities */
(function(w, d, $, wpAd){

  'use strict';
  
  wpAd.Video.prototype.bindTrackingPixels = function(){
    var p = this.settings.pixels, key;
    if(this.playerType === 'flash' && !this.disableExtInt){
      for(key in p){
        if(p.hasOwnProperty(key) && p[key]){
          this.bind(key, 'wpAd.addVideoPixel', p[key], key);
        }
      }
    } else if(this.playerType === 'html5'){
      var events = {
        'play': 'play',
        'pause': 'pause',
        'stop': 'ended',
        'mute': 'volumechange',
        'unmute': 'volumechange'
      };

      if(p.all){
        for(key in events){
          if(events.hasOwnProperty(key)){
            this.player.addEventListener(events[key], function(e){
              wpAd.addVideoPixel(p.all, e.type);
            }, false);
          }
        }
      } else {
        for(key in p){
          if(p.hasOwnProperty(key) && p[key] && events[key]){
            if(!p[events[key]]){
              p[events[key]] = p[key];
            }
            this.player.addEventListener(events[key], function(e){
              wpAd.addVideoPixel(p[e.type], e.type);
            }, false);
          }
        }
      }
    }
  };
  
  wpAd.Video.prototype.bind = function(a,b,c){
    if(this.playerType === 'flash' && !this.disableExtInt){
      c=c||'';
      this.flashplayer().bind(a,b,c);
    }
  };

  wpAd.Video.prototype.unbind = function(a){
    if(this.playerType === 'flash' && !this.disableExtInt){
      if(a){
        this.flashplayer().unbind(a);
      } else {
        this.flashplayer().unbind();
      }
    }
  };

  wpAd.Video.prototype.switchVideo = function(a){
    this.settings.source = typeof a === 'string' ? [a] : a;
    if(this.playerType === 'flash' && !this.disableExtInt){
      this.flashVideo = this.getFlashVideo();
      this.flashplayer().switchVideo(this.flashVideo);
    } else if(this.playerType === 'html5'){
      this.html5Video = this.gethtml5Video();
      this.player.src = this.html5Video;
      this.player.play();
    }
  };

  wpAd.Video.prototype.attr = function(a){
    if(this.playerType === 'flash' && !this.disableExtInt){
      if(typeof a === 'object'){
        this.flashplayer().attr(a);
      } else if(a === 'string'){
        return this.flashplayer().attr(a);
      } else{
        return this.flashplayer().attr();
      }
    }
  };

  wpAd.Video.prototype.play = function(){
    if(this.playerType === 'flash' && !this.disableExtInt){
      this.flashplayer().playVideo();
    } else if(this.playerType === 'html5'){
      this.player.play();
    }
  };

  wpAd.Video.prototype.pause = function(){
    if(this.playerType === 'flash' && !this.disableExtInt){
      this.flashplayer().pauseVideo();
    } else if(this.playerType === 'html5'){
      this.player.pause();
    }
  };

  wpAd.Video.prototype.stop = function(){
    if(this.playerType === 'flash' && !this.disableExtInt){
      this.flashplayer().stopVideo();
    } else if(this.playerType === 'html5'){
      this.pause();
      this.player.currentTime = 0;
    }
  };

  wpAd.Video.prototype.mute = function(){
    if(this.playerType === 'flash' && !this.disableExtInt){
      this.flashplayer().muteVideo();
    } else if(this.playerType === 'html5'){
      this.player.volume = 0;
    }
  };

  wpAd.Video.prototype.unmute = function(){
    if(this.playerType === 'flash' && !this.disableExtInt){
      this.flashplayer().unmuteVideo();
    } else if(this.playerType === 'html5'){
      this.player.volume = 1;
    }
  };
  
  wpAd.addVideoPixel = function(arg){
    $(d.createElement('img')).attr({
      'width': '1',
      'height': '1',
      'src': arg.replace(/\[timestamp\]|\[random\]|\%n/gi, Math.floor(Math.random()*1E9)),
      'alt': arguments[1] || 'pixel'
    }).css({
      'border': '0',
      'display': 'none'
    }).appendTo('body');
  };
  
  wpAd.Video.prototype.addPixel = wpAd.addVideoPixel;

})(window, document, jQuery, wpAd);