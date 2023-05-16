const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyEl = document.body;
let timerId = null;

// Відразу блокуємо кнопку "Stop", поки не буде натиснута кнопка "Start"
btnStop.disabled = true;

// Додаємо слухачів події "click" на кнопки
btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

// Функція, що випадково змінює фоновий колір сторінки раз на секунду
function onBtnStartClick() {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStop.disabled = false;
  btnStart.disabled = true;
}

// Функція, що припиняє зміну кольору сторінки
function onBtnStopClick() {
  clearInterval(timerId);
  btnStop.disabled = true;
  btnStart.disabled = false;
}

// Функція для генерування випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
