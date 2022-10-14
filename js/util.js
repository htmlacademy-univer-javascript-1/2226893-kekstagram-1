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

export {getRandom, getRandomArrayElement};
