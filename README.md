# Full Screen Header

Simplest possible way to have a full screen header that responds to browser resizing.  All page content is contained below the height of the screen.

![alt tag](https://raw.github.com/stefbowerman/full-screen-header/master/demo.gif)

##Initialization
All you need to do is call the plugin inside a `$(document).ready` function:

```javascript
$(document).ready(function() {
	$('#fs-header').fullScreenHeader()
});
```

Or, pass in options when initializing the plugin

```javascript
var initCallback = function(){
  // console.log('Full screen header initialized');
};

var scrollCallback = function(){
  // console.log(window.scrollY)
};

$(document).ready(function() {
  $('#fs-header').fullScreenHeader({
    fsContainerSelector: '#my-container', // Default: '#fs-header-container'
    fsPaddingId: 'fs-paddddddding', // Default: 'fs-header-padding'
    fsPaddingClass: 'fs-padddddding', // Default: null
    fsImgSelector: '.fullscreen-header', // Default: ''.fs-header-image'
    onInit: initCallback,
    onScroll: scrollCallback
  })
});

```

## Options

###fsContainerSelector
- Selector matching the parent of the element the plugin is called on
- Default: ```#fs-header-container```

###fsPaddingId
- Id to apply to the padding element created when the plugin is called
- Default: ```fs-header-padding```

###fsPaddingClass
- Class to apply to the padding element created when the plugin is called.
- Not required
- Default: ```null```

###fsImgSelector
- Selector matching the ```<img>``` element containing the header image
- Default: ```.fs-header-image```


## Callbacks
###onInit (`$headerImage`)
Callback fired once the plugin initialization is finished.
Parameters:

- `$headerImage`: jQuery version of the header image.


###onScroll (`$headerImage`, `$paddingElement`)
Callback fired on window scroll.  Context is set to the plugin itself.
Parameters:

- `$headerImage`: jQuery version of the header image.
- `$paddingElement`: jQuery version of the padding element used to determine height.


###onResize (`$headerImage`)
Callback fired on window resize.  Context is set to the plugin itself
Parameters:

- `$headerImage`: jQuery version of the header image.

## TODO
- Remove dependencies on ID'd elements
