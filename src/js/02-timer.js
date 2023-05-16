import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Об'єкт налаштувань для функції бібліотеки "flatpickr"
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

// Ініціалізація бібліотеки "flatpickr" на елементі input
const fp = flatpickr('#datetime-picker', options);
