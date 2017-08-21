(function() {
  'use strict';

  function side32() {
    alert('Informasjonteknologi 2');
    document.body.innerHTML = '<h1 id="nameEl">Amandus</h1><br><input id="name" type="text">';
    document.getElementById('name').addEventListener('input', function(evt) {
      document.getElementById('nameEl').text = evt.target.value;
    });
  }
}());
