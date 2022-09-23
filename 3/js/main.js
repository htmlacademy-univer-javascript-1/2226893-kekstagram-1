function getRandom (min, max) {
  if (max < min) {
    const temp = min;
    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (Math.abs(max - min) + 1)) + min;
}
getRandom(0, 10);

const checkLength = (str,  maxLength) => str.length <= maxLength;
checkLength('qweefdcs', 10);
