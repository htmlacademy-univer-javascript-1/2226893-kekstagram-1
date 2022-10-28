const bigPicture = document.querySelector('.big-picture');

const createCommentBlock = function (comment) {
  const item = document.createElement('li');
  item.classList.add('social__comment');

  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  avatar.width = '35';
  avatar.height = '35';
  item.append(avatar);

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;
  item.append(text);

  return item;
};

const showBigPicture = function (element, picture) {
  element.addEventListener('click', () => {
    document.body.classList.add('modal-open');

    bigPicture.querySelector('.big-picture__img').children[0].src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;

    const commentArea = bigPicture.querySelector('.social__comments');
    if (picture.comments.length !== 0) {
      for (let i = 0; i < picture.comments.length; i++) {
        commentArea.append(createCommentBlock(picture.comments[i]));
      }
    }
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    bigPicture.classList.remove('hidden');
  });
};

const button = bigPicture.querySelector('.cancel');
button.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

export {showBigPicture};
