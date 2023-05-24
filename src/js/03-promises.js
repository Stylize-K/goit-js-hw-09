import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmitForm);

//Функція, що викликається сабмітом форми. Збирає введені дані з полів форми та створює необхідну кількість промісів. По закінченню очищує форму.
function onSubmitForm(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let currentDelay = +delay.value;

  for (let i = 1; i <= +amount.value; i += 1) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise №${position} in ${delay} ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise №${position} in ${delay} ms`
        );
      });

    currentDelay += +step.value;
  }
  event.target.reset();
}

// Функція, що створює та повертає один проміс, який виконується або відхиляється через delay часу
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
