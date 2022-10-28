import {createPhotoDescriptions} from'./data.js';
import {showBigPicture} from './big-picture.js';

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const photoDescriptions = createPhotoDescriptions();

for (let i = 0; i < photoDescriptions.length; i++) {
  const photoElement = templatePicture.cloneNode(true);
  photoElement.querySelector('img').src = photoDescriptions[i].url;
  photoElement.querySelector('.picture__likes').textContent = photoDescriptions[i].likes;
  photoElement.querySelector('.picture__comments').textContent = photoDescriptions[i].comments.length;
  showBigPicture(photoElement, photoDescriptions[i]);
  fragment.append(photoElement);
}

document.querySelector('.pictures').append(fragment);
