const bigPicture = document.querySelector('.big-picture');

const commentArea = bigPicture.querySelector('.social__comments');
commentArea.removeChild(commentArea.querySelector('li'));
commentArea.removeChild(commentArea.querySelector('li'));

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

const removeCommentsList = function () {
  const children = commentArea.querySelectorAll('li');
  if (children.length > 0) {
    for (let i = children.length - 1 ; i >= 0; i--) {
      commentArea.removeChild(children[i]);
    }
  }
};

const showBigPicture = function (element, picture) {
  element.addEventListener('click', () => {
    document.body.classList.add('modal-open');

    bigPicture.querySelector('.big-picture__img').children[0].src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;

    let childrenCount = commentArea.querySelectorAll('li').length;
    const commentsLoader = bigPicture.querySelector('.comments-loader');

    const createCommentsList = function () {
      if (picture.comments.length !== 0) {
        for (let i = 0; childrenCount + i < picture.comments.length && i < 5; i++) {
          commentArea.append(createCommentBlock(picture.comments[childrenCount + i]));
        }
      }
      childrenCount = commentArea.querySelectorAll('li').length;

      const aboutComments = bigPicture.querySelector('.social__comment-count');
      const textAboutComments = aboutComments.innerHTML;
      aboutComments.innerHTML = childrenCount + textAboutComments.substring(textAboutComments.indexOf(' '));

    };

    const onCommentsLoader = function () {
      createCommentsList();
      if (childrenCount >= picture.comments.length) {
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener('click', onCommentsLoader);
      } else {
        commentsLoader.addEventListener('click', onCommentsLoader);
        commentsLoader.classList.remove('hidden');
      }
    };

    const displayComments = function () {
      createCommentsList();

      if (childrenCount >= picture.comments.length) {
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener('click', onCommentsLoader);
      } else {
        commentsLoader.addEventListener('click', onCommentsLoader);
        commentsLoader.classList.remove('hidden');
      }
    };
    displayComments();

    bigPicture.classList.remove('hidden');
  });
};

const button = bigPicture.querySelector('.cancel');
button.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeCommentsList();
});

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    removeCommentsList();
  }
});

export {showBigPicture};
