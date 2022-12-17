function getRandom (min, max) {
  if (max < min) {
    const temp = min;
    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (Math.abs(max - min) + 1)) + min;
}

const checkLength = (str,  maxLength) => str.length <= maxLength;
checkLength('qweefdcs', 10);

const getRandomArrayElement = (elements) => elements[getRandom(0, elements.length - 1)];

const getRandomArrayElements = (array, count) => {
  const res = [];
  for (let i = 0; i < count; i++) {
    const element = array[getRandom(0, array.length - 1)];
    res.push(element);
    array.splice(array.indexOf(element), 1);
  }
  return res;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

//сообщение об ошибке
const ALERT_SHOW_TIME = 5000;
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'gold';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandom, getRandomArrayElement, isEscapeKey, showAlert, getRandomArrayElements, debounce};
