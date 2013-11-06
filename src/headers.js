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
  // Headers parameters
  var Header = {
    attributes: ['nav-id', 'nav-action', 'nav', 'heading', 'counter'],
    defaultAttributes: {
      heading: 'Default header'
    }
  };
  // Component
  xtag.register('bb-header', {
    lifecycle: {
      created: function() {
        var template = document.getElementById('header-template');
        this.template = template.innerHTML;
        this.render = Handlebars.compile(this.template);
      },
      inserted: function() {
        var data = { content: this.innerHTML };
        Header.attributes.forEach(function(attr) {
          data[attr] = this.getAttribute(attr)
            || Header.defaultAttributes[attr];
        }.bind(this));
        var holder = document.createElement('div');
        holder.innerHTML = this.render(data);
        this.parentElement.replaceChild(holder.firstElementChild, this);
      }
    }
  });
})();

