(function() {
  var imports = document.querySelectorAll('link[rel="import"]');
  for(var i = 0; i < imports.length; i++) {
    var path = imports[i].href;
    var req = new XMLHttpRequest();
    req.open('get', path, true);
    req.send();
    req.onload = function() {
      var holder = document.createElement('div');
      holder.style.display = 'none';
      holder.innerHTML = this.responseText;
      document.body.appendChild(holder);
    };
  }
})();
