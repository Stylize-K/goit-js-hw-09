import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');

btnStart.disabled = true;

let delta = null;
let targetTime = null;
let currentTime = null;

// Об'єкт налаштувань для функції бібліотеки "flatpickr"
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetTime = selectedDates[0].getTime();
    currentTime = Date.now();
    delta = targetTime - currentTime;
    // console.log(currentTime);
    // console.log(targetTime);
    // console.log(delta);
    if (delta < 0) {
      Notiflix.Notify.failure('Please, choose a date in the future');
    } else {
      btnStart.disabled = false;
    }
  },
};

// Ініціалізація бібліотеки "flatpickr" на елементі input
const fp = flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', onBtnStartClick);

// Функція, що додає 0, якщо в числі менше двох символів
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

//Створення класу countDownTimer
class countDownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.daysSpan = document.querySelector(`${selector} [data-days]`);
    this.hoursSpan = document.querySelector(`${selector} [data-hours]`);
    this.minutesSpan = document.querySelector(`${selector} [data-minutes]`);
    this.secondsSpan = document.querySelector(`${selector} [data-seconds]`);
  }

  updateMarkup() {
    setInterval(() => {
      currentTime = Date.now();
      delta = this.targetDate - currentTime;
      const { days, hours, minutes, seconds } = this.convertMs(delta);
      console.log(delta);
      this.daysSpan.textContent = days;
      this.hoursSpan.textContent = hours;
      this.minutesSpan.textContent = minutes;
      this.secondsSpan.textContent = seconds;
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
}

//Ініціалізація таймера (створення еземплеру класу countDownTimer)
const timer1 = new countDownTimer({
  selector: '.timer',
  // targetDate: new Date('Jul 1, 2023'),
  targetDate: targetTime,
});

//Функція запуску таймера по кліку кнопки "Start"
function onBtnStartClick() {
  timer1.updateMarkup();
}
