var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = innerWidth;
var height = innerHeight;
canvas.width = width;
canvas.height = height;

ctx.fillStyle = 'white';

var pos = document.getElementById('pos');

var sound = new Audio();
sound.src = 'pang.mp3';

window.addEventListener('mousemove', function(evt) {
  pos.innerHTML = 'X: ' + evt.clientX + ', Y: ' + evt.clientY;

  ctx.clearRect(0, 0, width, height);
  ctx.fillRect(evt.clientX - 50, evt.clientY - 5, 100, 10);
  ctx.fillRect(evt.clientX - 5, evt.clientY - 50, 10, 100);
  ctx.clearRect(evt.clientX - 10, evt.clientY - 10, 20, 20);
});

window.addEventListener('click', function(evt) {
  sound.load();
  sound.play();
});
