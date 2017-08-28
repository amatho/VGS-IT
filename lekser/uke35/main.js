(function() {
  'use strict';
  var content = document.getElementById('content');

  function addElement(tagName, innerHTML, props) {
    var el = document.createElement(tagName);
    innerHTML && (el.innerHTML = innerHTML);

    props && Object.keys(props).forEach(function(prop) {
      el[prop] = props[prop];
    });

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

  function side42() {
    content.innerHTML = '';

    addElement('p', 'Et p-element. Trykk på knappen for å endre innholdet. <button onclick="this.parentElement.innerHTML = \'Innholdet i p-elementet er endret.\'">Endre innhold</button>');

    addElement('h2', 'Her kommer et bilde');
    addElement('img', '', {src: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', id: 'bilde1', width: '100'});
    addElement('button', 'Endre bildet', {
      onclick: function(evt) {
        document.getElementById('bilde1').src = 'http://elevweb.akershus-fk.no/~tham1211/svg/thumbsup.gif';
      }
    });
    addElement('br');
    addElement('br');

    addElement('div', 'Hallo hallo.', {id: 'div1'});
    addElement('div', 'Hei hei.', {id: 'div2'});
    addElement('br');
    addElement('button', 'Legg sammen div-ene', {
      onclick: function(evt) {
        var div1 = document.getElementById('div1');
        var div2 = document.getElementById('div2');
        div2.innerHTML = div1.innerHTML + ' ' + div2.innerHTML;
      }
    });
  }

  document.getElementById('side32').addEventListener('click', side32);
  document.getElementById('side37').addEventListener('click', side37);
  document.getElementById('side42').addEventListener('click', side42);
}());
