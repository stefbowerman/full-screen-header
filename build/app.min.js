;(function ( $, window, document, undefined ) {

    var pluginName = "fullScreenHeader",
        defaults = {
          imgSelector: '.fs-header-image',
          windowResizeCallback: function(){},
          windowScrollCallback: function(){}
        };

    function Plugin( element, options ) {
        this.$element = $(element);

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var self = this;

            this.$paddingElement = $('<div></div>').attr('id', 'fs-header-before').css({height: 0}).height($('#fs-header-container').height());

            $('#fs-header-container').after(this.$paddingElement);

            // Properties to cache
            this.imageAspect = null;
            this.headerImage = null;

            // Initialization functions
            this.calculateImageAspect();
            this.imageFill();


            // Apply event handlers
            $(window).on('resize', $.proxy(this.windowResize, this));
            $(window).on('scroll', $.proxy(this.windowScroll, this));

            // Start the show
            this.openSplash();
        },

        calculateImageAspect: function(){
          if(!this.imageAspect){
            $headerImage = this.getHeaderImage();
            this.imageAspect = $headerImage.width() / $headerImage.height();
          }
          return this.imageAspect;
        },

        getHeaderImage: function(){
          if(!this.headerImage){
            this.headerImage = this.$element.find(this.options.imgSelector);
          }
          return this.headerImage;
        },

        openSplash: function(){
          var $image = this.getHeaderImage();
          
          $image.css({
            opacity: 1,
            "-webkit-transform": "scale(1)",
            "-moz-transform": "scale(1)",
            "-o-transform": "scale(1)",
            "-ms-transform": "scale(1)",
            transform: "scale(1)"
          });

        },

        windowResize: function(){
          this.$paddingElement.height($('#fs-header-container').height());
          this.imageFill();

          this.options.windowResizeCallback();
        },

        windowScroll: function(){
          var opacityAmount = ($(window).scrollTop() / parseInt(this.$paddingElement.height(), 10)),
              zoomAmount = 1 + opacityAmount / 16;

          if(opacityAmount < 1){
            var $image = this.getHeaderImage();

            $image.css({
              opacity: 1 - opacityAmount,
              "-webkit-transform": "scale(" + zoomAmount + ")",
              "-moz-transform": "scale(" + zoomAmount + ")",
              "-o-transform": "scale(" + zoomAmount + ")",
              "-ms-transform": "scale(" + zoomAmount + ")",
              transform: "scale(" + zoomAmount + ")"
            });

          }

          this.options.windowScrollCallback();
        },

        imageFill: function(){
          var $win = $(window),
              windowHeight = $win.height(),
              windowWidth = $win.width(),
              windowAspect = windowWidth / windowHeight,
              aspect = this.imageAspect,
              newCss;

          $splashImage = this.getHeaderImage();

          if(windowAspect < aspect){
            newCss = {
              width: windowHeight * aspect,
              height: windowHeight,
              top: 0,
              left: -(windowHeight * aspect - windowWidth) / 2
            };
          }
          else {
            newCss = {
              width: windowWidth,
              height: "auto",
              top: -(windowWidth / aspect - windowHeight) / 2,
              left: 0
            };
          }

          $splashImage.css( newCss );

        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );