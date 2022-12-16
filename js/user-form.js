import { isEscapeKey, showAlert } from './util.js';
import { validator } from './form-validator.js';
import { onSmallerButton, onBiggerButton } from './scale-photo.js';
import { changeEffect, removeFilter } from './photo-effects.js';
import { sendData } from './api.js';

const uploadOpenElement = document.querySelector('#upload-file');
const uploadCloseElement = document.querySelector('#upload-cancel');

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');

const form = document.querySelector('.img-upload__form');

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
  smallerButton.addEventListener('click', onSmallerButton);
  biggerButton.addEventListener('click', onBiggerButton);
  form.querySelector('.effect-level__slider').classList.add('hidden');
  form.addEventListener('change', changeEffect);
}

function closeUpload () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onUploadEscapeKeydown);
  document.querySelector('#upload-file').value = '';
  smallerButton.removeEventListener('click', onSmallerButton);
  biggerButton.removeEventListener('click', onBiggerButton);
  form.removeEventListener('change', changeEffect);

  removeFilter();
}

uploadOpenElement.addEventListener('click', () => {
  openUpload();
});

uploadCloseElement.addEventListener('click', () => {
  closeUpload();
});

const setUserFormSubmit = function (onSuccess) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = validator();
    //временно верно
    //const isValid = true;
    if (isValid) {
      //blockSubmitButton();
      sendData(
        () => {
          onSuccess('успешно');
          //unblockSubmitButton();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          //unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    } else {
      showAlert('Поле ХэшТег заполнено неверно. Попробуйте ещё раз');
    }
  });
};

export {setUserFormSubmit};
