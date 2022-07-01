import throttle from 'lodash.throttle';

const FORM_STORAGE_KEY = 'feedback-form-state';

const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');
const formEl = document.querySelector('.feedback-form');

let objectData = {};
formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);
updateChanges();

function onFormInput(event) {
  objectData[event.target.name] = event.target.value;
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(objectData));
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem(FORM_STORAGE_KEY)));
  objectData = {};
  localStorage.removeItem(FORM_STORAGE_KEY);
  event.currentTarget.reset();
}

function updateChanges() {
  const valuesChanged = JSON.parse(localStorage.getItem(FORM_STORAGE_KEY));
  if (!valuesChanged) {
    return;
  }

  if (valuesChanged.email) {
    inputEl.value = valuesChanged.email;
  }

  if (valuesChanged.message) {
    textareaEl.value = valuesChanged.message;
  }

  objectData = { ...valuesChanged };
}
