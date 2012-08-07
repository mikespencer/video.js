/* Extends the wpAd.Video object with javascript interaction capabilities */
(function(w, d, $, wpAd){

  'use strict';

  wpAd.Video.prototype.addPixel = function(arg){
    $(d.createElement('img')).attr({
      'width': '1',
      'height': '1',
      'src': arg,
      'alt': 'Pixel'
    }).css({
      'border': '0',
      'display': 'none'
    }).appendTo('body');
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
    if(this.playerType === 'flash' && !this.disableExtInt){
      this.flashplayer().switchVideo(a);
    } else if(this.playerType === 'html5'){
      this.player.src = a;
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

})(window, document, jQuery, wpAd);