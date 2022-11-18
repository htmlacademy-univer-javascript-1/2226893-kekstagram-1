import { showAlert } from "./util.js";

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch((err) => {
      showAlert('Не удалось загрузить данные с сервера. Перезагрузите страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {};

export {getData, sendData};
