const data = {};
const randDeg = getRandomIntFunc(360);

calculateValues();
makeCubes();

document.getElementById('recalculate').addEventListener('click', evt => {
  calculateValues();
  document.querySelectorAll('div').forEach(div => {
    div.parentElement.removeChild(div);
  });
  makeCubes();
});

function makeCubes() {
  for (i = 0; i < data.cubes; i++) {
    const el = document.createElement('div');
    const div = document.body.appendChild(el);
    const length = data.randomLength();
    div.style.width = length + 'px';
    div.style.height = length + 'px';
    div.style.backgroundColor = 'hsl(' + randDeg() + ', 100%, 50%)';

    data.intervalId = setInterval(() => {
      requestAnimationFrame(() => {
        div.style.transform = `translate(${data.randomX()}px, ${data.randomY()}px)`
        div.style.backgroundColor = 'hsl(' + randDeg() + ', 100%, 50%)';
      });
    }, data.duration);
  }
}

function calculateValues() {
  const minLength = Math.round(innerWidth / 50);
  const maxLength = Math.round(innerWidth / 40);

  data.cubes = 10;
  data.duration = 2000;
  data.randomLength = getRandomIntFunc(minLength, maxLength);
  data.randomX = getRandomIntFunc(maxLength, innerWidth - maxLength);
  data.randomY = getRandomIntFunc(maxLength, innerHeight - maxLength);
}

function getRandomIntFunc(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  return () => {
    return Math.round((Math.random() * (max - min)) + min);
  }
}
