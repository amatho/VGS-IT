const canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext('2d');

const ac = new AudioContext();
let index = 0;
let hitTarget = false;

setInterval(drawCircles, 16);
setInterval(playSound, 0.01);

function drawCircles() {

  for (var i = 1000; i > 0; i -= 5) {
    ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(innerWidth / 2, innerHeight / 2, i, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}

function playSound() {
  if (index >= 500) {
    hitTarget = true;
  } else if (index <= 0) {
    hitTarget = false;
  }

  if (!hitTarget && index < 500) {
    index++;
  } else if (hitTarget && index > 0) {
    index--;
  }

  let osc = ac.createOscillator();
  osc.connect(ac.destination);
  osc.frequency.value = index + 500;
  osc.start(0);
  osc.stop(ac.currentTime + 0.2);
}
