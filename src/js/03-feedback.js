import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// Функція, яка зчитує localStorage. Якщо у localStorage зберігається інформація - то виводить її у відповідне поле/відповідні поля

populateMessageOutput();

function populateMessageOutput() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    form.email.value = savedMessage.email || '';
    form.message.value = savedMessage.message || '';
  }
}

//Функція, що спрацьовує при сабміті форми. Якщо всі поля заповнені, консолить значення localStorage, очищує поля форми, видаляє інформацію з localStorage

function onFormSubmit(evt) {
  evt.preventDefault();
  if (form.email.value && form.message.value) {
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
  } else {
    return alert('Please, fill in all the fields!');
  }
}

//Функція, що зберігає дані з полів форми у localStorage

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
