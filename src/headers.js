(function() {
  // Helpers
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
    created: function(name) {
      var template = document.getElementById(name + '-template');
      this.attrs = Components[name].attributes || [];
      this.defaults = Components[name].defaultAttributes || {};
      this.template = template.innerHTML;
      this.render = Handlebars.compile(this.template);
    },
    inserted: function() {
      var data = { content: this.innerHTML };
      this.attrs.forEach(function(attr) {
        data[attr] = this.getAttribute(attr) || this.defaults[attr];
      }.bind(this));
      var holder = document.createElement('div');
      holder.innerHTML = this.render(data);
      this.parentElement.replaceChild(holder.firstElementChild, this);
    }
  };
  var Components = {
    header: {
      attributes: ['nav-id', 'nav-action', 'nav', 'heading', 'counter'],
      defaultAttributes: {
        heading: 'Default header'
      }
    },
    subheader: {
      attributes: ['heading']
    }
  };
  Object.keys(Components).forEach(function(component) {
    xtag.register('bb-' + component, {
      lifecycle: {
        created: function() { Helpers.created.call(this, component) },
        inserted: Helpers.inserted
      }
    });
  });
})();

