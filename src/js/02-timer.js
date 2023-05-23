import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

//Посилання на кнопки "Start" і "Reset" та на поле input
const btnStart = document.querySelector('button[data-start]');
const btnReset = document.querySelector('button[data-reset]');
const inputEl = document.querySelector('#datetime-picker');

//Блокуємо кнопки "Start" і "Reset" одразу після зарантаження сторінки
btnStart.disabled = true;
btnReset.disabled = true;

// Об'єкт налаштувань для функції бібліотеки "flatpickr"
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (Date.now() > selectedDates[0]) {
      Notiflix.Notify.failure('Please, choose a date in the future');
    } else {
      btnStart.disabled = false;
      timer.setTargetDate(selectedDates[0]);
    }
  },
};

// Ініціалізація бібліотеки "flatpickr" на елементі input
flatpickr('#datetime-picker', options);
// const fp = flatpickr('#datetime-picker', options);

//Створення класу countDownTimer
class countDownTimer {
  constructor({ selector }) {
    this.targetDate;
    this.intervalId = null;
    this.daysSpan = document.querySelector(`${selector} [data-days]`);
    this.hoursSpan = document.querySelector(`${selector} [data-hours]`);
    this.minutesSpan = document.querySelector(`${selector} [data-minutes]`);
    this.secondsSpan = document.querySelector(`${selector} [data-seconds]`);
  }
  //Метод класу, що приймає обрану дату з календаря та додає її у властивість targetDate
  setTargetDate(targetDate) {
    this.targetDate = targetDate;
  }

  //Метод класу, що генерує розмітку таймера
  updateMarkup() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const delta = this.targetDate - currentTime;
      const { days, hours, minutes, seconds } = this.convertMs(delta);
      this.daysSpan.textContent = days;
      this.hoursSpan.textContent = hours;
      this.minutesSpan.textContent = minutes;
      this.secondsSpan.textContent = seconds;

      //Зупинка таймера, коли delta менше 1 секунди
      if (delta < 1000) {
        clearInterval(this.intervalId);
        btnReset.disabled = true;
        inputEl.disabled = false;
        Notiflix.Notify.success('The timer has been completed');
      }
    }, 1000);
  }

  //Метод класу, що зупиняє таймер та очищуе поля
  reset() {
    clearInterval(this.intervalId);
    const { days, hours, minutes, seconds } = this.convertMs(0);
    this.daysSpan.textContent = days;
    this.hoursSpan.textContent = hours;
    this.minutesSpan.textContent = minutes;
    this.secondsSpan.textContent = seconds;
    Notiflix.Notify.info('Timer has been reset');
  }

  // Метод класу, що додає 0, якщо в числі менше двох символів (для форматування часу)
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  //Метод, що приймає значення в мілісекундах і повертає days, hours, minutes, seconds (від індуса :) )
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
}

//Ініціалізація таймера (створення еземплеру класу countDownTimer)
const timer = new countDownTimer({
  selector: '.timer',
});

btnStart.addEventListener('click', onStartclick);
btnReset.addEventListener('click', onResetClick);

// Функція, що запускає роботу таймера
function onStartclick() {
  btnReset.disabled = false;
  btnStart.disabled = true;
  inputEl.disabled = true;
  timer.updateMarkup();
}

// Функція, що скидує таймер
function onResetClick() {
  timer.reset();
  btnReset.disabled = true;
  inputEl.disabled = false;
}
