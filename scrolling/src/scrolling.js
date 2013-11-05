'use strict';

var scrolling = (function () {
  var characters = [ 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'];
  var isTouch = 'ontouchstart' in window;
  var touchstart = isTouch ? 'touchstart' : 'mousedown';
  var touchmove = isTouch ? 'touchmove' : 'mousemove';
  var touchend = isTouch ? 'touchend' : 'mouseup';
  var target, callback;
  
  var getY = (function getYWrapper() {
    return isTouch ? function(e) { return e.touches[0].pageY } :
                     function(e) { return e.pageY };
  })();
  
  var getTarget = (function getTargetWrapper() {
    if (isTouch) {
      return function(e) {
        var touch = e.touches[0];
        return document.elementFromPoint(touch.pageX, touch.pageY);
      }
    } else {
      return function(e) {
        return e.target;
      }
    }
  })();
  
  xtag.register('bb-scrolling', {
    lifecycle: {
      created: function (){
        var scrollingSelected = document.createElement('p');
        this.appendChild(scrollingSelected);

        var scrollingList = document.createElement('ol');
        scrollingList.innerHTML =
          '<li class="icon icon-search">search</li>' +
          '<li class="icon icon-contact-favorite">favorites</li>';

        for (var i=0; i<characters.length; i++) {
          var listItem = document.createElement('li');
          listItem.innerHTML = characters[i];
          scrollingList.appendChild(listItem);
        }
        this.appendChild(scrollingList);
        

        scrollingList.addEventListener(touchstart, function(ev) {
          target = getTarget(ev);
          callback && callback(target.innerHTML);
        });
            
        scrollingList.addEventListener(touchmove, function(ev) {
          var currentTarget = getTarget(ev);
          
          scrollingSelected.style.opacity = 1;
          if (currentTarget.classList.contains('icon')) {
            scrollingSelected.className = currentTarget.className;
            scrollingSelected.innerHTML = '';
          } else {
            scrollingSelected.className = '';
            scrollingSelected.innerHTML = currentTarget.innerHTML;
          }
          
          if (currentTarget !== target) {
            target = currentTarget;
            callback && callback(currentTarget.innerHTML);
          }
        });
        
        scrollingList.addEventListener(touchend, function() {
          scrollingSelected.style.opacity = 0;
        });
      }
    }
  });
  
  return {
    addEventListener: function(eventName, cb) {
      if (eventName === 'letterChange')
        callback = cb; 
    }
  }

})();
