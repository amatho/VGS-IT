const task1 = document.getElementById("task1");
const task2 = document.getElementById("task2");
const task3 = document.getElementById("task3");
const task4 = document.getElementById("task4");
const task5 = document.getElementById("task5");
const task6 = document.getElementById("task6");

task1.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => task1.classList.toggle("changed"));
});

task2.querySelector("input").addEventListener("input", evt => {
  const reversed = evt.target.value
    .split("")
    .reverse()
    .join("");
  evt.target.parentElement.querySelector("div").innerHTML = reversed;
});

task3.querySelector("input").addEventListener("input", evt => {
  let size = Number(evt.target.value) / 10;
  if (isNaN(size)) size = 1.2;
  evt.target.parentElement.querySelector("div").style.fontSize = size + "rem";
});

task4.querySelector("button").addEventListener("click", evt => {
  const canvas = task4.querySelector("canvas");
  const inputs = task4.querySelectorAll("input");
  const x = Number(inputs[0].value);
  const y = Number(inputs[1].value);

  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
});

const calculateScrabblePoints = word => {
  const onePointers = ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"];
  const twoPointers = ["D", "G"];
  const threePointers = ["B", "C", "M", "P"];
  const fourPointers = ["F", "H", "V", "W", "Y"];
  const fivePointers = ["K"];
  const eightPointers = ["J", "X"];
  const tenPointers = ["Q", "Z"];

  const arr = word.split("");
  return (points = arr.reduce((acc, currentVal) => {
    const val = currentVal.toUpperCase();

    if (onePointers.indexOf(val) !== -1) {
      return acc + 1;
    } else if (twoPointers.indexOf(val) !== -1) {
      return acc + 2;
    } else if (threePointers.indexOf(val) !== -1) {
      return acc + 3;
    } else if (fourPointers.indexOf(val) !== -1) {
      return acc + 4;
    } else if (fivePointers.indexOf(val) !== -1) {
      return acc + 5;
    } else if (eightPointers.indexOf(val) !== -1) {
      return acc + 8;
    } else if (tenPointers.indexOf(val) !== -1) {
      return acc + 10;
    }

    return acc;
  }, 0));
};

task5.querySelector("input").addEventListener("input", evt => {
  const points = calculateScrabblePoints(evt.target.value);
  task5.querySelector("div").innerHTML = "You got " + points + " points!";
});
