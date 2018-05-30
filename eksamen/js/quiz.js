const soundIndex = document.getElementById("soundIndex");
const playSoundBtn = document.getElementById("playSound");
const results = document.getElementById("results");
const score = document.getElementById("score");
const highscore = document.getElementById("highscore");
const restart = document.getElementById("restart");

const originalInstruments = ["fagott", "floyte", "klarinett", "obo", "valthorn"];
let instruments = originalInstruments.concat();

let lowestScore = null;
let right = 0;
let wrong = 0;
let currentGuess = 1;
let currentInstrument = "";

const sounds = {
  right: document.getElementById("rightSound"),
  wrong: document.getElementById("wrongSound"),
  fagott: document.getElementById("fagottSound"),
  floyte: document.getElementById("floyteSound"),
  klarinett: document.getElementById("klarinettSound"),
  obo: document.getElementById("oboSound"),
  valthorn: document.getElementById("valthornSound"),
};

const playSound = name => {
  Object.keys(sounds).forEach(key => {
    sounds[key].pause();
  });

  const audioEl = document.getElementById(name + "Sound");
  audioEl.currentTime = 0;
  audioEl.play();
};

const getRandomInstrument = () => {
  const min = 0;
  const max = instruments.length - 1;
  const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
  const item = instruments[randomIndex];

  let filteredArray = instruments.filter((item, index) => index !== randomIndex);
  instruments = filteredArray;

  return item;
};

const incrementGuess = () => {
  currentGuess++;
  soundIndex.innerHTML = currentGuess;
};

const nextInstrument = () => {
  if (right >= originalInstruments.length) {
    showResults();
    return;
  }

  incrementGuess();
  currentInstrument = getRandomInstrument();
};

const handleAnswer = (evt, name) => {
  if (name === currentInstrument) {
    right++;
    playSound("right");
    evt.target.parentElement.style.display = "none";
    nextInstrument();
  } else {
    wrong++;
    playSound("wrong");
  }
};

const showResults = () => {
  if (lowestScore === null) {
    lowestScore = wrong;
  } else if (wrong < lowestScore) {
    congrats.classList.add("show");
  }

  score.innerHTML = `Score: <b>${right} riktig, ${wrong} feil</b>. `;
  highscore.innerHTML = "5 riktig, " + lowestScore + " feil";
};

const reset = evt => {
  instruments = originalInstruments.concat();
  document.querySelectorAll(".instruments .instrument").forEach(el => {
    el.style.display = "";
  });
  soundIndex.innerHTML = currentGuess = 1;
  right = 0;
  wrong = 0;
  currentInstrument = getRandomInstrument();
};

currentInstrument = getRandomInstrument();

restart.addEventListener("click", reset);

playSoundBtn.addEventListener("click", evt => {
  playSound(currentInstrument);
});
