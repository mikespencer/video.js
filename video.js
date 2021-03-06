/*jshint browser: true*/
/*global ActiveXObject*/
var wpAd = window.wpAd || {};

(function(w, d, $, wpAd){

  'use strict';

  //add bind method if browser does not natively support it:
  if(!Function.prototype.bind)Function.prototype.bind=function(oThis){if(typeof this!=="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var aArgs=Array.prototype.slice.call(arguments,1),fToBind=this,FNOP=function(){},fBound=function(){return fToBind.apply(this instanceof FNOP&&oThis?this:oThis,aArgs.concat(Array.prototype.slice.call(arguments)));};FNOP.prototype=this.prototype;fBound.prototype=new FNOP();return fBound;};

  function Video(atts) {

    if(!atts.source){
      return this;
    }

    //default settings are overwritten by atts:
    this.settings = $.extend({
      'target' : '',
      'source': [],
      'width': 320,
      'height': 240,
      'mute': true,
      'autoplay': true,
      'poster': false,
      'preload': false,
      'preferHTML5': false,
      'clickTag': '',
      'customFlashVars': '',
      'backgroundColor': '#000000',
      'version': 1,
      'flashVideoPlayer': 'http://media.washingtonpost.com/wp-srv/ad/VidPlayer.v1.swf',
      'id': false,
      'pixels': false,
      'wmode': 'window',
      'html5PlayerSettings': {
        'controls': true,
        'loop': false,
        'setHeight': false
      }
    }, atts);

    if(typeof this.settings.source === 'string'){
      this.settings.source = [this.settings.source];
    }

    if(this.settings.version > 1){
      this.settings.flashVideoPlayer = this.settings.flashVideoPlayer.replace('v1', 'v' + this.settings.version);
    }

    this.num_sources = this.settings.source.length;
    this.id = this.settings.id || Math.floor(Math.random()*1E3);
    this.onLoadQueue = [];
    this.loaded = false;

    //file types flash video player supports:
    this.flashVideoTypes = /\.flv$|\.f4v$|\.mov$|\.mp4$/i;

    this.getCodecSupport();
    this.flashVideo = this.getFlashVideo();
    this.html5Video = this.gethtml5Video();

    this.playerType = this.getPlayerType();
    this.player = this.getplayer();

    if(this.playerType === 'html5'){
      this.onPlayerLoad();
    }
    return this.settings.target ? this.appendTo(this.settings.target) : this;
  }
  
  Video.prototype.getCodecSupport = function(){
    var codecs = {
        'webm' : 'video/webm; codecs="vp8, vorbis"',
        'ogg' : 'video/ogg; codecs="theora, vorbis"',
        'mp4' : 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
      }, v = d.createElement('video'), k;
      
    this.canPlay = {
      'flash': !!this.flashver()
    };

    for(k in codecs){
      if(codecs.hasOwnProperty(k)){
        this.canPlay[k] = v.canPlayType && v.canPlayType(codecs[k]) === "probably" ? true : false;
      }
    }
  };

  Video.prototype.getFlashVideo = function(){
    if(this.canPlay.flash){
      for(var i=0; i<this.num_sources; i++){
        if(this.flashVideoTypes.test(this.settings.source[i])){
          return this.settings.source[i];
        }
      }
    }
    return false;
  };
  
  Video.prototype.gethtml5Video = function(){
    var i = 0, a, ext;
    for(i; i<this.num_sources; i++){
      a = this.settings.source[i].split('.');
      ext = a[a.length-1];
      if(this.canPlay[ext]){
        return this.settings.source[i];
      }
    }
    return false;
  };

  Video.prototype.getPlayerType = function(){
    if(this.settings.preferHTML5 && this.html5Video){
      return 'html5';
    }
    if(this.flashVideo){
      return 'flash';
    }
    if(this.html5Video){
      return 'html5';
    }
    return false;
  };
  
  Video.prototype.getplayer = function(){
    if(this.playerType === 'flash'){
      this.flashvars = this.buildFlashvars();
      return this.constructFlashPlayer();
    }
    if(this.playerType === 'html5'){
      return this.constructHTML5Player();
    }
    return false;
  };

  Video.prototype.constructHTML5Player = function(){
    var v = d.createElement('video'),
      s = this.settings;

    v.id = 'video' + this.id;
    v.src = this.html5Video;
    v.width = s.width;
    if(s.html5PlayerSettings.setHeight){
      this.height = s.height;
    }
    v.height = s.height;
    v.muted = s.mute;
    v.autoplay = s.autoplay;
    v.loop = s.html5PlayerSettings.loop;
    v.controls = s.html5PlayerSettings.controls;
    v.preload = s.preload ? 'auto' : 'none';
    if(s.poster){
      v.poster = s.poster;
    }
    v.style.backgroundColor = s.backgroundColor;
    v.style.outline = 'none';
    
    return v;
  };

  Video.prototype.buildFlashvars = function(){
    var s = this.settings,
      options = {
        standAlone: true,
        clickTag: s.clickTag,
        source: this.flashVideo,
        mute: s.mute,
        autoplay: s.autoplay,
        preload: s.preload,
        poster: s.poster
      },
      flashvars = '',
      key;

    for(key in options){
      if(options.hasOwnProperty(key) && options[key] !== ''){
        flashvars += (flashvars ? '&' : '') + key + '=' + String(options[key]);
      }
    }
    
    return flashvars + (this.settings.customFlashVars ? '&' + this.settings.customFlashVars : '');
  };

  Video.prototype.listenForSWFLoad = function(){
    this.callbacksTried = 0;
    if(this.flashplayer() && this.flashplayer().bind){
      this.onPlayerLoad();
    } else if(this.callbacksTried < 10){
      this.swfLoadTimer = setTimeout(this.listenForSWFLoad.bind(this), 300);
      this.callbacksTried++;
    }
  };
  
  Video.prototype.onload = function(){
    var l = arguments.length,i;
    for(i=0;i<l;i++){
      this.onLoadQueue.push(arguments[i]);
    }
  };
  
  Video.prototype.onPlayerLoad = function(){    
    this.loaded = true;
    if(this.bindTrackingPixels){
      this.bindTrackingPixels();
    }
    var l = this.onLoadQueue.length, i;    
    for(i=0;i<l;i++){
      this.onLoadQueue[i].call(this);
    }
  };

  Video.prototype.constructFlashPlayer = function(){
    var s = this.settings;
    this.playerCodeString = 
      '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+ s.width +'" height="'+ s.height +'" id="videoie' + this.id + '" style="outline:none;">' +
        '<param name="movie" value="' + s.flashVideoPlayer + '" />' +
        '<param name="quality" value="high" />' +
        '<param name="bgcolor" value="'+s.backgroundColor+'" />' +
        '<param name="scale" value="noscale " />' +
        '<param name="play" value="true" />' +
        '<param name="wmode" value="'+ s.wmode +'" />' +
        '<param name="allowScriptAccess" value="always" />' +
        '<param name="flashvars" value="' + this.flashvars + '" />' + 
        '<!--[if !IE]>-->' +
          '<object type="application/x-shockwave-flash" data="' + s.flashVideoPlayer + '" width="'+ s.width +'" height="'+ s.height +'" id="video' + this.id + '" style="outline:none;">' +
            '<param name="movie" value="' + s.flashVideoPlayer + '" />' +
            '<param name="quality" value="high" />' +
            '<param name="bgcolor" value="'+s.backgroundColor+'" />' +
            '<param name="scale" value="noscale " />' +
            '<param name="play" value="true" />' +
            '<param name="wmode" value="'+ s.wmode +'" />' +
            '<param name="allowScriptAccess" value="always" />' +
            '<param name="flashvars" value="' + this.flashvars + '" />' +
          '</object>' +
        '<!--<![endif]-->' +
      '</object>';
      
    this.swfLoadTimer = setTimeout(this.listenForSWFLoad.bind(this), 500);
    
    //return as object:
    return $(this.playerCodeString)[0];
  };

  Video.prototype.toString = function(){    
    if(this.playerType === 'flash'){
      return this.playerCodeString;
    }
    if(this.playerType === 'html5'){
      return this.player.toString();
    }
    return '';
  };

  Video.prototype.flashver = function(){
    var i,a,o,p,s="Shockwave",f="Flash",t=" 2.0",u=s+" "+f,v=s+f+".",rSW=new RegExp("^"+u+" (\\d+)");
    if((o=navigator.plugins)&&(p=o[u]||o[u+t])&&(a=p.description.match(rSW)))return a[1];
    else if(!!(w.ActiveXObject))for(i=10;i>0;i--)try{if(!!(new ActiveXObject(v+v+i)))return i;}catch(e){}
    return 0;
  };

  Video.prototype.flashplayer = function(){
    var m=false;
    if($.browser.msie){
      if($.browser.version < 9){
        m = w['videoie' + this.id]; // < IE9
      } else{
        m = d['videoie' + this.id]; // >= IE9
      }
    } else{
      m = d['video' + this.id];
    }
    return m || d['video' + this.id];
  };

  Video.prototype.appendTo = function(arg){
    if(this.player){
      if(this.playerType === 'flash' && $.browser.msie){
        //allow video player to be added, but disable external interface:
        this.disableExtInt = true;
        try{w.console.log('For externalInterface to function in IE, the .swf cannot be loaded asynchronously and must be added inline via document.write');}catch(e){}
      }
      $(this.player).appendTo(arg);
    }
    return this;
  };

  wpAd.Video = Video;

})(window, document, jQuery, wpAd);