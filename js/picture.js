import {showBigPicture} from './big-picture.js';
import { getRandomArrayElements, debounce } from './util.js';

const NUMBER_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;

const filterButtons = document.querySelector('.img-filters__form');
const defaultFilterButton = filterButtons.querySelector('#filter-default');
const randomFilterButton = filterButtons.querySelector('#filter-random');
const discussedFilterButton = filterButtons.querySelector('#filter-discussed');

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const picturesBlock = document.querySelector('.pictures');

let currentPhotosList = [], newPhotosList;

const renderPhoto = function (photo) {
  const photoElement = templatePicture.cloneNode(true);
  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  showBigPicture(photoElement, photo);
  fragment.append(photoElement);
  currentPhotosList.push(photoElement);
};

const removePhotos = function () {
  currentPhotosList.forEach((photo) => picturesBlock.removeChild(photo));
  currentPhotosList = [];
};

const renderPhotos = function () {
  removePhotos();
  newPhotosList.forEach((photo) => renderPhoto(photo));
  picturesBlock.append(fragment);
};

const addDefaultFilterClass = () => {
  defaultFilterButton.classList.add('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');
};

const addRandomFilterClass = () => {
  defaultFilterButton.classList.remove('img-filters__button--active');
  randomFilterButton.classList.add('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');
};

const addDiscussedFilterClass = () => {
  defaultFilterButton.classList.remove('img-filters__button--active');
  randomFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.add('img-filters__button--active');
};

const changeFilter = function (photos, db) {
  filterButtons.addEventListener('click', (evt) => {
    newPhotosList = [...photos];
    switch (evt.target.id) {
      case ('filter-default'):
        addDefaultFilterClass();
        break;
      case ('filter-random'):
        addRandomFilterClass();
        newPhotosList = getRandomArrayElements(newPhotosList, NUMBER_RANDOM_PHOTOS);

        break;
      case ('filter-discussed'):
        addDiscussedFilterClass();
        newPhotosList.sort((a, b) => b.comments.length - a.comments.length);
        break;
    }
    db();
  });
};

const firstRender = function (photos) {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  newPhotosList = [...photos];

  renderPhotos(photos);
  changeFilter(photos, debounce(
    () => renderPhotos(newPhotosList),
    RERENDER_DELAY,
  ));
};

export {firstRender};
