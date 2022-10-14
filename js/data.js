import {getRandom, getRandomArrayElement} from './util.js';

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
const createPhotoDescriptions = () => Array.from({length: PHOTO_DESCRIPTION_COUNT}, createPhotoDescription);

export {createPhotoDescriptions};
