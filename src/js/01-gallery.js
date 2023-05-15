// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

// Імпорт бібліотеки simplelightbox
import SimpleLightbox from 'simplelightbox';

// Імпорт додаткових стилів для бібліотеки simplelightbox
import 'simplelightbox/dist/simple-lightbox.min.css';

// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.

const list = document.querySelector('.gallery');

// Додавання інлайнового стилю до списку галереї зображень
list.style.listStyle = 'none';

const markup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}"/></a></li>`
  )
  .join('');

list.insertAdjacentHTML('afterbegin', markup);

// Об'єкт налаштувань для функції бібліотеки "SimpleLightbox".
// Опція captionPosition має значення 'bottom' за замовчуванням.

const options = {
  captionsData: 'alt',
  captionDelay: 250,
};

const lightbox = new SimpleLightbox('.gallery a', options);
