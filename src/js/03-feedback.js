import throttle from 'lodash.throttle';

const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');
const formEl = document.querySelector('.feedback-form');

let objectData = {};
formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);
updateChanges();

function onFormInput(event) {
  console.log(objectData);
  objectData[event.target.name] = event.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(objectData));
  console.log(objectData);
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
}

function updateChanges() {
  const valuesChanged = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (!valuesChanged) {
    return;
  }

  if (valuesChanged['email']) {
    inputEl.value = valuesChanged['email'];
  }

  if (valuesChanged['message']) {
    textareaEl.value = valuesChanged['message'];
  }

  objectData = { ...valuesChanged };
}
