;(function ( $, window, undefined ) {

    var pluginName = "fullScreenHeader",
        defaults = {
          fsContainerSelector: '#fs-header-container',
          fsPaddingId: 'fs-header-padding',
          fsPaddingClass: '',
          fsImgSelector: '.fs-header-image',
          onInit: function(){},
          onResize: function(){},
          onScroll: function(){}
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

            this.$paddingElement = $('<div></div>').attr('id', this.options.fsPaddingId).addClass(this.options.fsPaddingClass).css({height: 0});
            this.$paddingElement.height( $(this.options.fsContainerSelector).height() );

            $(this.options.fsContainerSelector).after(this.$paddingElement);

            // Properties to cache
            this._imageAspect = null;
            this._headerImage = null;

            // Initialization functions
            this.calculateImageAspect();
            this.imageFill();


            // Apply event handlers
            $(window).on('resize', $.proxy(this.windowResize, this));
            $(window).on('scroll', $.proxy(this.windowScroll, this));


            this.options.onInit.call( this, this.getHeaderImage() );
        },

        calculateImageAspect: function(){
          if(!this._imageAspect){
            $headerImage = this.getHeaderImage();
            this._imageAspect = $headerImage.width() / $headerImage.height();
          }
          return this._imageAspect;
        },

        getHeaderImage: function(){
          if(!this._headerImage){
            this._headerImage = this.$element.find(this.options.fsImgSelector);
          }
          return this._headerImage;
        },

        windowResize: function(){
          var containerHeight = $(this.options.fsContainerSelector).height();

          this.$paddingElement.height( containerHeight );
          this.imageFill();

          this.options.onResize.call( this, this.getHeaderImage());
        },

        windowScroll: function(){
          this.options.onScroll.call( this, this.getHeaderImage(), this.$paddingElement );
        },

        imageFill: function(){
          var $win = $(window),
              windowHeight = $win.height(),
              windowWidth = $win.width(),
              windowAspect = windowWidth / windowHeight,
              aspect = this.imageAspect,
              newCss;

          $headerImage = this.getHeaderImage();

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

          $headerImage.css( newCss );

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

})( jQuery, window );
