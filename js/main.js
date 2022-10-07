const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

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

const createComment = () => ({
  id: getRandom(0, 1000),
  avatar: `img/avatar-${getRandom(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const existPhotoID = [];
const getPhotoID = () => {
  existPhotoID.push(existPhotoID.length);
  return existPhotoID.length;
};
const createPhotoDescription = () => ({
  id: getPhotoID(),
  url: `photos/${existPhotoID.length}.jpg`,
  description: 'I hope it works',
  likes: getRandom(15, 200),
  comments: Array.from({length: getRandom(0, 5)}, createComment),
});

const PHOTO_DESCRIPTION_COUNT = 25;
Array.from({length: PHOTO_DESCRIPTION_COUNT}, createPhotoDescription);
