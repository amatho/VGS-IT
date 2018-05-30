const shadow = document.getElementById('shadow');
const form = document.getElementById("form");
const formError = document.getElementById("form-error");
const confirmation = document.getElementById("confirmation");
const confirmationContent = document.getElementById("confirmation-content");

const eventArray = [
  {
    id: 1,
    title: "Trondheim kammermusikkfestival: Fabelaktig formiddag",
    date: "1. juni",
    time: "11:00",
    description: `Dette er barnas og familiens
    festivaldag. Én billett gjelder for alt, og
    du kan velge mellom en rekke ulike
    forestillinger`
  },
  {
    id: 2,
    title: "Spill opp!",
    date: "4. juni",
    time: "14:30",
    description: `Mastereksamen NTNU fløyte
    v/Matthias Lauga`
  },
  {
    id: 3,
    title: "Onsdagskonsert",
    date: "6. juni",
    time: "13:00",
    description: `Barokke treblåserensembler`
  },
  {
    id: 4,
    title: "Juiogat: Joik for folk",
    date: "9. juni",
    time: "14:00",
    description: `En vandring i samisk musikkhistorie
    ved Lena Jansen`
  }
];

const compose = (a, b) => (...args) => a(b(...args));
const composeThree = (a, b, c) => (...args) => a(b(c(...args)));

const createEvent = ({
  id,
  title,
  date,
  time,
  description
} = {}) => `
<div class="event">
  <h1>${title}</h1>
  <p>${description}</p>
  <p><b>${date}</b>, kl. <b>${time}</b>.</p>
  <div class="order">
    <button onclick="order(${id})">
      <i class="material-icons">arrow_forward</i>
      Bestill
    </button>
  </div>
</div>
`;

const displayEventHTML = html => {
  const parent = document.getElementById("events");
  parent.innerHTML += html;
};

const displayAndCreate = compose(displayEventHTML, createEvent);

const createAllEvents = () => {
  eventArray.forEach(event => displayAndCreate(event));
};

const calculateConfirmation = (id, adults, children) => {
  let price = 100 * adults + 50 * children;

  if (adults + children >= 5) {
    price *= 0.8;
  }

  let title = "";
  eventArray.forEach(event => {
    if (event.id === id) title = event.title;
  });

  return {
    price,
    adults,
    children,
    title,
    tickets: adults + children
  };
};

const createConfirmation = ({
  price,
  adults,
  children,
  title,
  tickets
} = {}) => {
  let and = "";
  if (adults !== 0 && children !== 0) and = " og ";

  let adultText = "";
  if (adults !== 0) adultText = adults + " voksne";

  let childText = "";
  if (children !== 0) childText = children + " barn";

  let discount = "";
  if (tickets >= 5) discount = ", inklusiv en grupperabatt på 20 prosent";

  let plural = "";
  if (tickets > 1) plural = "er";

  return `
  Du har bestilt ${tickets} billett${plural} til "${title}", for ${adultText}${and}${childText}.
  Totalprisen er kr ${price}${discount}.
  `;
};

const displayConfirmation = html => {
  confirmationContent.innerHTML = html;
};

const displayCreateAndCalculate = composeThree(
  displayConfirmation,
  createConfirmation,
  calculateConfirmation
);

const order = id => {
  form.onsubmit = evt => orderSubmit(evt, id);
  shadow.classList.add("active");
  form.classList.add("active");
};

const orderSubmit = (evt, id) => {
  evt.preventDefault();
  const elements = evt.target.elements;
  const {adult, child} = elements;

  if (!(adult.value > 0 || child.value > 0)) {
    formError.innerHTML = "Du må bestille for minst ett barn/voksen."
    return;
  }

  const adults = Number(adult.value);
  const children = Number(child.value);

  displayCreateAndCalculate(id, adults, children);

  form.classList.remove("active");
  confirmation.classList.add("active");

  setTimeout(() => {
    form.reset();
  }, 400);
};

createAllEvents();
