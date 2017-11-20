const contacts = document.getElementById('contacts');
const searchInput = document.getElementById('search-input');
const contactForm = document.getElementById('contact-form');
const addContactButton = document.getElementById('add-contact');
const closeContactButton = document.getElementById('close-contact');
const shadow = document.getElementById('shadow');

let contactArray = [];
// The index of the contact we're currently editing. Set to -1 if we aren't in editing mode.
let editMode = false;

function addContactRow(contact) {
  let tr = document.createElement('tr');
  const contactIndex = contactArray.indexOf(contact);

  tr.innerHTML += `
  <td>${contact.firstName}</td>
  <td>${contact.lastName}</td>
  <td>${contact.tel}</td>
  <td>${contact.email}</td>
  <td data-const="true">
    <button data-target="${contactIndex}" onclick="editContact(event)">edit</button>
    <button onclick="removeContact(${contactIndex})">x</button>
  </td>
  `;

  contacts.appendChild(tr);
}

function setRowToEditingMode(tableRow, contact) {
  const contactIndex = contactArray.indexOf(contact);

  tableRow.innerHTML = `
  <td>
    <input data-key="firstName" value="${contact.firstName}">
  </td>
  <td>
    <input data-key="lastName" value="${contact.lastName}">
  </td>
  <td>
    <input data-key="tel" value="${contact.tel}">
  </td>
  <td>
    <input data-key="email" value="${contact.email}">
  </td>
  <td data-const="true">
    <button onclick="saveContact(event, ${contactIndex})">done</button>
    <button onclick="removeContact(${contactIndex})">x</button>
  </td>
  `;
}

function addContact(firstName, lastName, tel, email) {
  contactArray.push({
    firstName,
    lastName,
    tel,
    email
  });

  storeContacts();
  renderContacts();
}

function changeContact(index, newContact) {
  contactArray[index] = newContact;

  storeContacts();
  renderContacts();
}

function editContact(evt) {
  if (editMode) {
    return;
  }

  const targetIndex = evt.target.dataset.target;
  editMode = true;
  setRowToEditingMode(evt.target.parentElement.parentElement, contactArray[targetIndex]);
}

function saveContact(evt, contactIndex) {
  const tr = evt.target.parentElement.parentElement;
  let newContact = {};

  Array.prototype.forEach.call(tr.children, td => {
    if (td.dataset.const) {
      return;
    }

    newContact[td.firstElementChild.dataset.key] = td.firstElementChild.value;
  });

  editMode = false;
  changeContact(contactIndex, newContact);
}

function removeContact(index) {
  contactArray = contactArray.filter(contact => contactArray.indexOf(contact) !== index);
  storeContacts();
  renderContacts();
}

function getStoredContacts() {
  contactArray = JSON.parse(localStorage.getItem('contacts'));
  renderContacts();
}

function storeContacts() {
  localStorage.setItem('contacts', JSON.stringify(contactArray));
}

function renderContacts() {
  contacts.innerHTML = '';
  contactArray.forEach(addContactRow);
}

function renderContactsFiltered(filterCallback) {
  contacts.innerHTML = '';
  contactArray.filter(filterCallback).forEach(contact => {
    addContactRow(contact);
  });
}

function onSearchInput(evt) {
  if (evt.target.value === '') {
    renderContacts();
    return;
  }

  renderContactsFiltered(contactContains(evt.target.value));
}

function showForm(willShow) {
  if (!willShow) {
    contactForm.classList.add('hidden');
    shadow.classList.add('hidden');
    return;
  }

  contactForm.classList.remove('hidden');
  shadow.classList.remove('hidden');
}

function onContactSubmit(evt) {
  evt.preventDefault();
  const {firstName, lastName, tel, email} = evt.target.elements;
  console.log(firstName, lastName, tel, email);

  if (firstName.value && lastName.value && tel.value && email.value) {
    addContact(firstName.value, lastName.value, tel.value, email.value);

    firstName.value = '';
    lastName.value = '';
    tel.value = '';
    email.value = '';

    showForm(false);
  }
}

function contactContains(str) {
  return contact => {
    str = str.toLowerCase();
    return (
      contact.firstName.toLowerCase().indexOf(str) >= 0 ||
      contact.lastName.toLowerCase().indexOf(str) >= 0 ||
      contact.tel.toString().indexOf(str) >= 0 ||
      contact.email.toLowerCase().indexOf(str) >= 0
    );
  }
}

getStoredContacts();

searchInput.addEventListener('input', onSearchInput);
contactForm.addEventListener('submit', onContactSubmit);
addContactButton.addEventListener('click', () => {
  showForm(true);
});
closeContactButton.addEventListener('click', () => {
  showForm(false);
});
