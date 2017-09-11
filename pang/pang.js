var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = innerWidth;
var height = innerHeight;
canvas.width = width;
canvas.height = height;

ctx.fillStyle = 'white';

var pos = document.getElementById('pos');

var shoot = new Audio();
shoot.src = 'pang.mp3';

var hit = new Audio();
hit.src = 'hit.mp3';

var getRandX = getRoundRandFunc(width);
var getRandY = getRoundRandFunc(height);

var targetX = getRandX();
var targetY = getRandY();
var targetRadius = 50;

console.log(targetX, targetY);

window.addEventListener('mousemove', function(evt) {
  pos.innerHTML = 'X: ' + evt.clientX + ', Y: ' + evt.clientY;

  ctx.clearRect(0, 0, width, height);
  ctx.fillRect(evt.clientX - 50, evt.clientY - 5, 100, 10);
  ctx.fillRect(evt.clientX - 5, evt.clientY - 50, 10, 100);
  ctx.clearRect(evt.clientX - 10, evt.clientY - 10, 20, 20);

  ctx.beginPath();
  ctx.arc(targetX, targetY, targetRadius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
});

window.addEventListener('click', function(evt) {
  shoot.load();
  shoot.play();

  if (mouseInRect(evt.clientX, evt.clientY, targetX - targetRadius, targetY - targetRadius, targetRadius * 2, targetRadius * 2)) {
    hit.load();
    hit.play();
  }
});

function getRoundRandFunc(max, min) {
  if (min) {
    return function() {
      return Math.round((Math.random() * (max - min)) + min);
    }
  } else {
    return function() {
      return Math.round(Math.random() * max);
    };
  }
}

function mouseInRect(mX, mY, rX, rY, rW, rH) {
  if ((mX >= rX && mX <= rX + rW) && (mY >= rY && mY <= rY + rH)) {
    return true;
  } else {
    return false;
  }
}
