import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');

//Блокуємо кнопку "Start" одразу після зарантаження сторінки
btnStart.disabled = true;

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
const fp = flatpickr('#datetime-picker', options);

//Створення класу countDownTimer
class countDownTimer {
  constructor({ selector }) {
    this.targetDate;
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
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const delta = this.targetDate - currentTime;
      const { days, hours, minutes, seconds } = this.convertMs(delta);
      this.daysSpan.textContent = days;
      this.hoursSpan.textContent = hours;
      this.minutesSpan.textContent = minutes;
      this.secondsSpan.textContent = seconds;

      if (delta < 1000) {
        clearInterval(intervalId);
      }
    }, 1000);
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

//Вішаємо слухача на клік кнопки "Start" та передаємо в колбек метод таймера (обов'язкого прив'язуємо контекст через метод bind)
btnStart.addEventListener('click', timer.updateMarkup.bind(timer));
