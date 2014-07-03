# Full Screen Header

Simplest possible way to have a full screen header that responds to browser resizing.  All page content is contained below the height of the screen.

##Initialization
All you need to do is call the plugin inside a `$(document).ready` function:

```javascript
$(document).ready(function() {
	$('#fs-header').fullScreenHeader()
});
```

Or, pass in callback functions as options when initializing the plugin

```javascript
var initCallback = function(){
  // console.log('Full screen header initialized');
};

var scrollCallback = function(){
  // console.log(window.scrollY)
};

$(document).ready(function() {
  $('#fs-header').fullScreenHeader({
    onInit: initCallback,
    onScroll: scrollCallback
  })
});
```

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
- Simplify HTML / CSS if possible
