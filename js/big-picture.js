const bigPicture = document.querySelector('.big-picture');

const commentArea = bigPicture.querySelector('.social__comments');
commentArea.removeChild(commentArea.querySelector('li'));
commentArea.removeChild(commentArea.querySelector('li'));
/*
4.6. Все комментарии к изображению выводятся в блок .social__comments.
    Сразу после открытия изображения в полноэкранном режиме отображается не более 5 комментариев. Количество показанных комментариев и общее число
    комментариев отображается в блоке .social__comment-count.

4.7. Отображение дополнительных комментариев происходит при нажатии на кнопку .comments-loader.
    При нажатии на кнопку отображается не более 5 новых комментариев.
    При изменении количества показанных комментариев число показанных комментариев в блоке .social__comment-count также изменяется.
*/

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

    const onCommentsLoader = function () {
      createCommentsList();
    };
    const createCommentsList = function () {
      let childrenCount = commentArea.querySelectorAll('li').length;
      if (picture.comments.length !== 0) {
        for (let i = 0; childrenCount + i < picture.comments.length && i < 5; i++) {
          commentArea.append(createCommentBlock(picture.comments[childrenCount + i]));
        }
      }
      childrenCount = commentArea.querySelectorAll('li').length;

      const aboutComments = bigPicture.querySelector('.social__comment-count');
      let textAboutComments = aboutComments.innerHTML;
      aboutComments.innerHTML = childrenCount + textAboutComments.substring(textAboutComments.indexOf(' '));

      const commentsLoader = bigPicture.querySelector('.comments-loader');

      if (childrenCount >= picture.comments.length) {
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener('click', onCommentsLoader);
      } else {
        commentsLoader.addEventListener('click', onCommentsLoader);
        commentsLoader.classList.remove('hidden');
      }
    };

    createCommentsList();

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
