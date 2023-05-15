import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';
const iFrame = document.querySelector('iframe');

//Ініціалізація бібліотеки '@vimeo/player'

const player = new Player(iFrame);

//Зберігаємо дані із localStorage у змінну savedTime. Якщо localStorage порожній - приймаємо 0 і програвач почне програвання відео з початку.

let savedTime = localStorage.getItem(STORAGE_KEY) || 0;

//Встановлюємо програвачу початкову позицію для програвання у секундах, яка зберігається у змінній savedTime

player.setCurrentTime(savedTime);

//Додавання у програвач слухача події 'timeupdate'. Виконуємо callback-функцію із затримкою в 1 секунду за допомогою throttle

player.on('timeupdate', throttle(onPlay, 1000));

//Функція, що зберігає поточний час програвання в localStorage. Використав метод Math.round для округлення секунд до цілого

function onPlay(evt) {
  localStorage.setItem(STORAGE_KEY, Math.round(evt.seconds));
}
