(function() {
  'use strict';
  var content = document.getElementById('content');

  function addElement(tagName, innerHTML) {
    var el = document.createElement(tagName);
    el.innerHTML = innerHTML;
    content.appendChild(el);
  };

  function side32() {
    alert('Informasjonteknologi 2');

    content.innerHTML = '<h1 id="nameEl">Amandus</h1><br>' +
      'Navn: <input id="name" type="text"><br><br>' +
      'String er en datatype som inneholder en serie av bokstaver/symboler';
  }

  function side37() {
    content.innerHTML = '';
    addElement('p', 'Høyde på fanen: ' + window.innerHeight + 'px<br><br>');
    addElement('p', 'navigator.appName: ' + navigator.appName + '<br><br>');
    addElement('p', 'navigator.userAgent: ' + navigator.userAgent);

    addElement('h1', 'Overskrift');
    addElement('p', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
  }

  document.getElementById('side32').addEventListener('click', side32);
  document.getElementById('side37').addEventListener('click', side37);
}());
