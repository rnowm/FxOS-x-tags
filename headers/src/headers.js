(function(){

  xtag.register('bb-header', {
    lifecycle: {
      created: function(){
        var actionButton = xtag.queryChildren(this, 'button');
        if (actionButton.length !== 0) {
          //var actionMenu = document.createElement ('menu');
          
          for (var i=0; i<actionButton.length; i++) {
            if (actionButton[i].className == "icon") {
              actionButton[i].className = "icon icon-" 
                + actionButton[i].innerHTML;
            }
            actionButton[i].classList.add('action');
          }
        }

        var navType = this.getAttribute('nav');
        if (navType){
          navButton = document.createElement('button');
          navButton.className = 'nav icon icon-nav-' + navType;
          if (actionButton.length === 0) {
            this.appendChild(navButton);
          } else {
            this.insertBefore(navButton, actionButton[0])
          }
        }

        var heading = xtag.queryChildren(this, 'h1')[0];
        if (!heading){
          heading = document.createElement('h1');
          var headingText = document.createTextNode('');
          heading.appendChild(headingText);
          if (actionButton.length === 0) {
            this.appendChild(heading);
          } else {
            this.insertBefore(heading, actionButton[0])
          }
        }

        var counter = xtag.queryChildren(this, 'h1 em')[0];
        if (!counter){
          var counter = this.getAttribute('counter');
          if (counter){
            counter = document.createElement('em');
            heading.appendChild(counter);
          }
        }
        
        this.xtag.data.heading = heading;
        this.xtag.data.counter = counter;
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
      counter: {
        attribute: {},
        get: function(){
          return this.xtag.data.counter.innerHTML;
        },
        set: function(value){
          this.xtag.data.counter.innerHTML = value;
        }
      }
    }
  });
  
  xtag.register('bb-subheader', {
    lifecycle: {
      created: function(){
        var heading = this.innerHTML;
        if (!heading){
          heading = document.createTextNode('');
          this.appendChild(heading);
        }
        this.xtag.data.heading = heading;
      }
    },
    accessors: {
      heading: {
        attribute: {},
        get: function(){
          return this.xtag.data.heading.textContent;
        },
        set: function(value){
          this.xtag.data.heading.textContent = value;
        }
      }
    }
  });

})();
