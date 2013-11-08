(function() {
  // Helpers
  var $ = function(selector) {
    return document.getElementById(selector);
  }
  Handlebars.registerHelper('em', function(counter) {
    var html = counter ? ' <em>' + counter + '</em>' : '';
    return new Handlebars.SafeString(html);
  });
  Handlebars.registerHelper('a', function(options) {
    var attrs = [];
    for(var attr in options.hash) {
      var value = options.hash[attr];
      if (value) {
        attrs.push(attr + '="' + value + '"');
      }
    }
    if (attrs.length === 0) {
      return '';
    } else {
      var html = '<a ' + attrs.join(' ') + '>' + options.fn(this) + '</a>';
      return new Handlebars.SafeString(html);
    }
  });
  var Helpers = {
    replaceNode: function(newNode, oldNode) {
      while(newNode.firstChild) {
        oldNode.parentNode.insertBefore(newNode.firstChild, oldNode);
      }
      setTimeout(function() {
        oldNode.parentNode && oldNode.parentNode.removeChild(oldNode);
      }, 0);
    },
    created: function(name) {
      console.log('Created', name, this);
      var data = {  };
      (WebComponents[name].attributes || []).forEach(function(attr) {
        data[attr] = this.getAttribute(attr)
          || WebComponents[name].defaults[attr];
      }.bind(this));
      var holder = document.createElement('div');
      holder.innerHTML = WebComponents[name].render(data);
      var content = holder.querySelector('content');
      if (content) {
        for(var i = 0; i < this.childNodes.length; i++) {
          if (this.childNodes[i].nodeName.match('BB-')) {
            this.removeChild(this.childNodes[i]);
          }
        }
        console.log('Content find! -> replace with', this.innerHTML);
        content.innerHTML = this.innerHTML;
        Helpers.replaceNode(this, content);
      }
      // this.parentElement.replaceChild(holder.firstElementChild, this);
      // Trick !
      console.log('Parent', name, this);
      Helpers.replaceNode(holder, this);
    }
  }
  var WebComponents = window.WebComponents = {
    header: {
      render: Handlebars.compile($('header-template').innerHTML),
      attributes: ['nav-id', 'nav-action', 'nav', 'heading', 'counter',
        'theme'],
      defaults: {
        theme: null,
        heading: 'Default header'
      }
    },
    subheader: {
      render: Handlebars.compile($('subheader-template').innerHTML),
      attributes: ['heading'],
      defaults: {}
    },
    list: {
      render: Handlebars.compile($('list-template').innerHTML),
      attributes: ['heading'],
      defaults: {}
    },
    row: {
      render: Handlebars.compile($('row-template').innerHTML),
      attributes: ['icon'],
      defaults: {}
    }
  };
  xtag.register('bb-header', {
    lifecycle: {
      created: function() { Helpers.created.call(this, 'header'); }
    }
  });
  xtag.register('bb-subheader', {
    lifecycle: {
      created: function() { Helpers.created.call(this, 'subheader'); }
    }
  });
  xtag.register('bb-list', {
    lifecycle: {
      created: function() { Helpers.created.call(this, 'list'); }
    }
  });
  xtag.register('bb-row', {
    lifecycle: {
      created: function() { Helpers.created.call(this, 'row'); }
    }
  });
})();

