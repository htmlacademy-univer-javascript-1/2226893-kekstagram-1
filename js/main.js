import { getData } from './api.js';
import { renderPhotos } from './picture.js';
import './user-form.js';

getData((photos) => {
  console.log(photos);
  renderPhotos(photos);
});
