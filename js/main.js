import { getData } from './api.js';
import { firstRender } from './picture.js';
import { setUserFormSubmit } from './user-form.js';

getData((photos) => {
  firstRender(photos);
});

setUserFormSubmit();
