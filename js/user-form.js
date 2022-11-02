import { isEscapeKey } from "./util.js";
/*
  1.1. Загрузка нового изображения:
    - изменение масштаба изображения;
    - применение одного из заранее заготовленных эффектов;
    - выбор глубины эффекта с помощью ползунка;
    - добавление текстового комментария;
    - добавление хэш-тегов.
*/

const uploadOpenElement = document.querySelector('#upload-file');
const uploadCloseElement = document.querySelector('#upload-cancel');

const onUploadEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

function openUpload () {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadEscapeKeydown);
};

function closeUpload () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onUploadEscapeKeydown);
};

uploadOpenElement.addEventListener('click', function () {
  openUpload();
});

uploadCloseElement.addEventListener('click', function () {
  closeUpload();
});

/*
2.1. Масштаб:

При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value;
Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50%, после нажатия на «+», значение должно стать равным 75%.
  Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;
При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться соответствующий стиль CSS, который
  с помощью трансформации scale задаёт масштаб. Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано
  transform: scale(0.75).
*/
