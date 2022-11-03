import { isEscapeKey } from "./util.js";
import "./form-validator.js"

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
  document.querySelector('#upload-file').value = '';
};

uploadOpenElement.addEventListener('click', function () {
  openUpload();
});

uploadCloseElement.addEventListener('click', function () {
  closeUpload();
});
