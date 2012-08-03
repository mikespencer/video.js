/*global wpAd:true, ActiveXObject*/
(function(w, d, $){

  'use strict';

  function Video(atts) {
    this.settings = $.extend({
      'flashVideoSource': '',
      'html5VideoSource': [],
      'width': 320,
      'height': 240,
      'mute': true,
      'autoplay': true,
      'poster': '',
      'customFlashVars': '',
      'forceHTML5': false,
      'flashVideoPlayer': 'http://media.washingtonpost.com/wp-srv/ad/VidPlayer.swf'
    }, atts);

    //maybe just if flash:
    this.rndm = Math.floor(Math.random()*1E9);
    
    //if flash:
    this.flashvars = this.buildFlashvars();
    
    this.canPlay = {
      'flash': !!this.flashver()
    };
    
    this.getCodecSupport();
    this.playerType = this.getPlayerType();
    
    //console.log('player type:', this.playerType);
    
    //this.buildPlayer();
   // ->-> in there either call buldFlash Player or buildHTM5Player..
    return this;
  }

  Video.prototype.getCodecSupport = function(){
		var codecs = {
        'webm' : 'video/webm; codecs="vp8, vorbis"',
        'ogg' : 'video/ogg; codecs="theora, vorbis"',
        'mp4' : 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
      }, v = d.createElement('video'), k;

    for(k in codecs){
      if(codecs.hasOwnProperty(k)){
        //or if(v.canPlayType(codecs[k]) === "probably"){return first codec that browser can play, and is passed in in this.video..}
        this.canPlay[k] = v.canPlayType(codecs[k]) === "probably" ? true : false;
      }
    }
    
	};
  
  Video.prototype.getPlayerType = function(){
    var l = this.settings.html5VideoSource.length, i=0, a, ext;
    if((!this.canPlay.flash || this.settings.forceHTML5) && this.settings.html5VideoSource.length){
      for(i; i<l; i++){
        a = this.settings.html5VideoSource[i].split('.');
        ext = a[a.length-1];

        if(this.canPlay[ext]){
          this.settings.html5VideoSource = this.settings.html5VideoSource[i];
          return 'html5';
        }
      }
    }
    //default to flash player
    return 'flash';
  };

  Video.prototype.flashver  = function(){
    var i,a,o,p,s="Shockwave",f="Flash",t=" 2.0",u=s+" "+f,v=s+f+".",rSW=new RegExp("^"+u+" (\\d+)");
    if((o=navigator.plugins)&&(p=o[u]||o[u+t])&&(a=p.description.match(rSW)))return a[1];
    else if(!!(w.ActiveXObject))for(i=10;i>0;i--)try{if(!!(new ActiveXObject(v+v+i)))return i;}catch(e){}
    return 0;
  };

  Video.prototype.bind = function() {};
  Video.prototype.play = function() {};
  Video.prototype.pause = function() {};
  Video.prototype.stop = function() {};
  
  Video.prototype.flashplayer = function() {
    return w['video-' + this.rndm] || d['video-' + this.rndm + '-ie'];
  };
  
  Video.prototype.buildFlashvars = function() {
    var s = this.settings,
      checks = ['mute', 'autoplay'],
      l = checks.length,
      rv = 'standAlone=true&source=' + s.flashVideoSource;
      while(l--){
        rv += '&' + checks[l] + '=' + (s[checks[l]] ? true : false);
      }
    return rv + (s.customFlashVars ? '&' + s.customFlashVars : '');
  };
  
  Video.prototype.flashPlayerCode = function() {
    return '<video ...';
  };

  Video.prototype.flashPlayerCode = function() {
    return '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+ this.settings.width +'" height="'+ this.settings.height +'" id="video-' + this.rndm + '-ie" name="video-' + this.rndm + '-ie" style="outline:none;">' +
      '<param name="movie" value="' + this.settings.flashVideoPlayer + '" />' +
      '<param name="quality" value="high" />' +
      '<param name="bgcolor" value="#000000" />' +
      '<param name="play" value="true" />' +
      '<param name="wmode" value="window" />' +
      '<param name="allowScriptAccess" value="always" />' +
      '<param name="flashvars" value="' + this.flashvars + '" />' +
      '<!--[if !IE]>-->' +
      '<object type="application/x-shockwave-flash" data="' + this.settings.flashVideoPlayer + '" width="'+ this.settings.width +'" height="'+ this.settings.height +'" id="video-' + this.rndm + '" name="video-' + this.rndm + '" style="outline:none;">' +
        '<param name="movie" value="' + this.settings.flashVideoPlayer + '" />' +
        '<param name="quality" value="high" />' +
        '<param name="bgcolor" value="#000000" />' +
        '<param name="play" value="true" />' +
        '<param name="wmode" value="window" />' +
        '<param name="allowScriptAccess" value="always" />' +
        '<param name="flashvars" value="' + this.flashvars + '" />' +
      '</object>' +
      '<!--<![endif]-->' +
    '</object>';
  };

  wpAd = w.wpAd || {};
  wpAd.Video = Video;
  
})(window, document, jQuery);