import { getData } from './api.js';
import { renderPhotos } from './picture.js';
import { setUserFormSubmit } from './user-form.js';

getData((photos) => {
  renderPhotos(photos);
});

setUserFormSubmit(console.log);
