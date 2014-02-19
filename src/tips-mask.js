
var tipsMask;

+function($){
  
  var tips = function(text, options){
    var options = $.extend({
      opacity: 0.2,// the opacity of bg layer 
      BGClickable: true, //the layer of bg is clickable
      callback: $.noop, //the callback after click some place of wrapper
      filter : [], // decide what elements are the trigger
      tipsTimeout: "infinit" //the delay time before the wrapper destroy
      
    }, options || {});
    
  
              
    /**
      format string using the Object or JSON
      
      @method format 
      @param {String} txt the formated string
      @param {Object | JSON} data use for formating
      @return {String} txt
      */
      var format = function(txt, data){
        var pattern = null;
        
        $.each(data, function(key, value){
          txt = txt.replace(new RegExp("\\${\\s*"+ key +"\\s*}","g"), value);
        });
        
        return txt;
      };
    /**
    build the tips wrapper

    @method build 
    */ 
    var build = function(){
      var tmpl, 
        data = {};
        
      data.text = text;
      data.opacity = options.opacity;
      data.IEOpacity = options.opacity * 100;
      tmpl = format(this.template, data);
      
      this.panel = $(tmpl);
    };
    /**
    bind event to wrapper

    @method attachEvents 
    */ 
    var attachEvents = function(){
      var self = this;
      this.panel.bind("click", function(e){
        var target = $(e.target);
        $.each(options.filter, function(index, item){
          if ($(target).is(item)){
            options.callback.call(target, self);
          }
        });
          
          
        if (options.BGClickable && target.is("[name='bg']")){
          self.destroy();
        }
          return false;
      });
    }; 
    
    //init
    build.call(this);
    attachEvents.call(this);
    $("body").append(this.panel);
    if (/[1-9]\d*/.test(options.tipsTimeout)) {
      ~function(self){
        setTimeout(function(){
          self.destroy();
        }, options.tipsTimeout)
      }(this);
    }
    
  };
  var proto = tips.prototype;
  proto.template = "<div class=\"tips-mask-container\" style=\"position: fixed; left: 0; top: 0; width: 100%; height: 100%; " +
    "_position: absolute; *zoom: 1;\"><div  name=\"bg\"style=\" position: fixed; filter:alpha(opacity=${ IEOpacity }); " +
    "opacity: ${ opacity };background-color: #000;top:0; left: 0; width: 100%; height: 100%;" +
    " _position: absolute;_height:expression( document.documentElement.scrollHeight);*zoom: 1;\"></div>" +
    "<div name=\"inner-box\" style=\" position: fixed; left: 50%;margin-left: -20%; top: 25%;width: 40%;background-color: #fff;" +
    " _position: absolute; _top: expression( document.documentElement.scrollTop + screen.height * 0.10);" +
    "box-shadow: 0 0 10px 3px #999\">${ text }</div></div>";
    
  /**
  * destroy the tips wrapper
  * @method destroy
  */
  proto.destroy = function(){
    this.panel.remove();
    this.panel = null;
  };
  
  /**
  instance a object of tips
 
  @method tipsMask
  */
  
  tipsMask = function(text, options){
    return new tips(text, options);
  }

}(jQuery)