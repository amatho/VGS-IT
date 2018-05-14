const countries = new Map();

//region data
countries.set("norway", new Map([
  ["name", "Norway"],
  ["points", 0]
]));
countries.set("sweden", new Map([
  ["name", "Sweden"],
  ["points", 0]
]));
countries.set("denmark", new Map([
  ["name", "Denmark"],
  ["points", 0]
]));
countries.set("finland", new Map([
  ["name", "Finland"],
  ["points", 0]
]));
countries.set("unitedKingdom", new Map([
  ["name", "United Kingdom"],
  ["points", 0]
]));
countries.set("germany", new Map([
  ["name", "Germany"],
  ["points", 0]
]));
countries.set("cyprus", new Map([
  ["name", "Cyprus"],
  ["points", 0]
]));
countries.set("israel", new Map([
  ["name", "Israel"],
  ["points", 0]
]));
countries.set("austria", new Map([
  ["name", "Austria"],
  ["points", 0]
]));
countries.set("estonia", new Map([
  ["name", "Estonia"],
  ["points", 0]
]));
countries.set("albania", new Map([
  ["name", "Albania"],
  ["points", 0]
]));
countries.set("serbia", new Map([
  ["name", "Serbia"],
  ["points", 0]
]));
countries.set("france", new Map([
  ["name", "France"],
  ["points", 0]
]));
countries.set("czechRepublic", new Map([
  ["name", "Czech Republic"],
  ["points", 0]
]));
countries.set("slovenia", new Map([
  ["name", "Slovenia"],
  ["points", 0]
]));
countries.set("lithuania", new Map([
  ["name", "Lithuania"],
  ["points", 0]
]));
countries.set("italy", new Map([
  ["name", "Italy"],
  ["points", 0]
]));
countries.set("moldova", new Map([
  ["name", "Moldova"],
  ["points", 0]
]));
countries.set("bulgaria", new Map([
  ["name", "Bulgaria"],
  ["points", 0]
]));
countries.set("theNetherlands", new Map([
  ["name", "The Netherlands"],
  ["points", 0]
]));
countries.set("australia", new Map([
  ["name", "Australia"],
  ["points", 0]
]));
countries.set("hungary", new Map([
  ["name", "Hungary"],
  ["points", 0]
]));
countries.set("ukraine", new Map([
  ["name", "Ukraine"],
  ["points", 0]
]));
countries.set("portugal", new Map([
  ["name", "Portugal"],
  ["points", 0]
]));
countries.set("ireland", new Map([
  ["name", "Ireland"],
  ["points", 0]
]));
countries.set("spain", new Map([
  ["name", "Spain"],
  ["points", 0]
]));
//endregion

const container = document.getElementById("container");
const form = document.getElementById("form");
const country = document.getElementById("country");
const points = document.getElementById("points");
const votingFor = document.getElementById("votingFor");
const errorDiv = document.getElementById("error");

form.addEventListener("submit", handleSubmit);

render();
populateSelects();

function render() {
  container.innerHTML = "";
  let countriesArray = Array.from(countries);

  countriesArray.sort(([keyA, valA], [keyB, valB]) => valB.get("points") - valA.get("points"));

  for (const [key, value] of countriesArray) {
    container.innerHTML += `
    <div class="item">
      <img src="assets/${value.get("name")}.png">
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
    errorDiv.innerHTML = "A country cannot vote for itself!"
    return;
  }

  errorDiv.innerHTML = "";

  const countryMap = countries.get(countryVotingFor);
  const previousPoints = countryMap.get("points");
  countryMap.set("points", previousPoints + pointsGiven);

  render();
  populateSelects();
  points.selectedIndex = 0;
  console.log(votingCountry, pointsGiven, countryVotingFor);
}
