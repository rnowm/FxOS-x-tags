(function(){

  xtag.register('x-appbar', {
    lifecycle: {
      created: function(){        
        var navType = this.getAttribute('navigation');
        if (navType){
          var navButton = document.createElement('button');
          navSpan = document.createElement('span');
          navButton.appendChild(navSpan);
          navSpan.innerHTML = navType;
          navSpan.className = 'icon icon-' + navType;
          this.appendChild(navButton);
        }

        var heading = xtag.queryChildren(this, 'h1')[0];
        if (!heading){
          heading = document.createElement('h1');
          var headingText = document.createTextNode('');
          heading.appendChild(headingText);
        }
        
        var subheading = xtag.queryChildren(this, 'h1 em')[0];
        if (!subheading){
          subheading = document.createElement('em');
          heading.appendChild(subheading);
        }
        this.appendChild(heading);

        this.xtag.data.heading = heading;
        this.xtag.data.subheading = subheading;

      }
    },
    accessors: {
      heading: {
        attribute: {},
        get: function(){
          return this.xtag.data.heading.firstChild.textContent;
        },
        set: function(value){          
          this.xtag.data.heading.firstChild.textContent = value;
        }
      },
      subheading: {
        attribute: {},
        get: function(){
          return this.xtag.data.subheading.innerHTML;
        },
        set: function(value){
          this.xtag.data.subheading.innerHTML = value;
        }
      }
    }
  });

})();
