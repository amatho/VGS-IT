const countries = new Map();

//region data
countries.set("norway", new Map([
  ["name", "Norway"],
  ["flag", ""],
  ["points", 0]
]));

countries.set("sweden", new Map([
  ["name", "Sweden"],
  ["flag", ""],
  ["points", 0]
]));

countries.set("denmark", new Map([
  ["name", "Denmark"],
  ["flag", ""],
  ["points", 0]
]));

countries.set("finland", new Map([
  ["name", "Finland"],
  ["flag", ""],
  ["points", 0]
]));

countries.set("unitedKingdom", new Map([
  ["name", "United Kingdom"],
  ["flag", ""],
  ["points", 0]
]));

countries.set("germany", new Map([
  ["name", "Germany"],
  ["flag", ""],
  ["points", 0]
]));
//endregion

const container = document.getElementById("container");
const form = document.getElementById('form');
const country = document.getElementById("country");
const points = document.getElementById('points');
const votingFor = document.getElementById('votingFor');

form.addEventListener("submit", handleSubmit);

render();
populateSelects();

function render() {
  container.innerHTML = "";
  let countriesArray = Array.from(countries);

  countriesArray.sort(([keyA, valA], [keyB, valB]) => valA.get("points") < valB.get("points"));

  for (const [key, value] of countriesArray) {
    container.innerHTML += `
    <div class="item">
      <img src="${value.get("flag")}">
      <span class="name">${value.get("name")}</span>
      <span class="points">${value.get("points")}</span>
    </div>
    `;
  }
}

function populateSelects() {
  let html = "<option value=\"\">Choose a country...</option>";
  for (const [key, value] of countries) {
    html += `
    <option value="${key}">${value.get("name")}</option>
    `;
  }

  country.innerHTML = votingFor.innerHTML = html;
}

function handleSubmit(evt) {
  evt.preventDefault();

  const votingCountry = country.options[country.selectedIndex].value;
  const pointsGiven = Number(points.options[points.selectedIndex].value);
  const countryVotingFor = votingFor.options[votingFor.selectedIndex].value;

  if (votingCountry === countryVotingFor) {
    console.log("ikke stem på deg selv!!11!!11!! >:(");
    return;
  }

  const countryMap = countries.get(countryVotingFor);
  const previousPoints = countryMap.get("points");
  countryMap.set("points", previousPoints + pointsGiven);

  render();
  populateSelects();
  points.selectedIndex = 0;
  console.log(votingCountry, pointsGiven, countryVotingFor);
}
