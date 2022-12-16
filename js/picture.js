import {showBigPicture} from './big-picture.js';

const renderPhotos = function (photos) {
  const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photos.length; i++) {
    const photoElement = templatePicture.cloneNode(true);
    photoElement.querySelector('img').src = photos[i].url;
    photoElement.querySelector('.picture__likes').textContent = photos[i].likes;
    photoElement.querySelector('.picture__comments').textContent = photos[i].comments.length;
    showBigPicture(photoElement, photos[i]);
    fragment.append(photoElement);
  }
  document.querySelector('.pictures').append(fragment);

};

export {renderPhotos};
