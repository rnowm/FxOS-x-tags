(function(){

  var characters = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
    'Q','R','S','T','U','V','W','X','Y','Z','#'] 

  xtag.register('bb-scrolling', {
    lifecycle: {
      created: function(){
        var scrollingList = document.createElement('ol');
        scrollingList.innerHTML =
          '<li><a href="#search" class="icon icon-search">search</a></li>' +
          '<li><a href="#favorites" class="icon icon-contact-favorite">favorites</a></li>';

        for (var i=0; i<characters.length; i++) {
          var listItem = document.createElement('li');
          listItem.innerHTML = 
            '<li><a href="#'+ characters[i] +'">' + characters[i] + '</a></li>';
          scrollingList.appendChild(listItem);
        }
        this.appendChild(scrollingList);
      }
    },
    accessors: {
      
    }
  });

})();
