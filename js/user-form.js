import { isEscapeKey } from './util.js';
import { validator } from './form-validator.js';
import { onSmallerButton, onBiggerButton, resetScale } from './scale-photo.js';
import { changeEffect, removeFilter } from './photo-effects.js';
import { sendData } from './api.js';

const uploadOpenElement = document.querySelector('#upload-file');
const uploadCloseElement = document.querySelector('#upload-cancel');

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');

const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit')

let wasMessage = false;

const onUploadEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && !wasMessage) {
    evt.preventDefault();
    closeUpload();
  }
  wasMessage = false;
};

function resetForm () {
  removeFilter();
  // поле загрузки фотографии, стилизованное под букву «О» в логотипе, очищается.
  form.reset();
  resetScale();
}

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

  resetForm();
}

function displayMessage (isSuccess) {
  wasMessage = true;
  const messageTemplate = document.querySelector(`#${isSuccess ? 'success' : 'error'}`).content.querySelector('section');
  const message = messageTemplate.cloneNode(true);
  const button = message.querySelector('button');

  document.body.append(message);

  const removeMessage = () => {
    message.remove();
  };

  const onEscapeKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage();
    }
  };

  button.addEventListener('click', removeMessage);
  document.addEventListener('keydown', onEscapeKeydown);
  document.onclick = (evt) => removeMessage();


}

uploadOpenElement.addEventListener('click', () => {
  openUpload();
});

uploadCloseElement.addEventListener('click', () => {
  closeUpload();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const setUserFormSubmit = function (onSuccess) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = validator();

    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          closeUpload();
          displayMessage(isValid);
        },
        () => {
          displayMessage(isValid);
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    } else {
      displayMessage(isValid);
    }
  });
};

export {setUserFormSubmit};
