import {createPhotoDescriptions} from'./data.js';

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
console.log(templatePicture);

const fragment = document.createDocumentFragment();

let photoDescriptions = createPhotoDescriptions();

for (let i = 0; i < photoDescriptions.length; i++) {
  let photoElement = templatePicture.cloneNode(true);
  photoElement.querySelector('img').src = photoDescriptions[i].url;
  photoElement.querySelector('.picture__likes').textContent = photoDescriptions[i].likes;
  photoElement.querySelector('.picture__comments').textContent = photoDescriptions[i].comments.length;
  fragment.append(photoElement);
}

document.querySelector('.pictures').append(fragment);
