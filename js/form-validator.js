const form = document.querySelector('#upload-select-image');

const tags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');

const onFocusEscapeKeydown = (evt) => {
  evt.stopPropagation();
};
tags.onfocus = () => {
  tags.addEventListener('keydown', onFocusEscapeKeydown);
}
tags.onblur = () => {
  tags.removeEventListener('keydown', onFocusEscapeKeydown);
}

comment.onfocus = () => {
  comment.addEventListener('keydown', onFocusEscapeKeydown);
}
comment.onblur = () => {
  comment.removeEventListener('keydown', onFocusEscapeKeydown);
}

const checkTags = function (str) {
  const tags = str.split(' ');

  if (tags.length > 5) {
    console.log("length");
    return false;
  }
  else {
    const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

    for (let i = 0; i < tags.length; i++) {
      if (!regex.test(tags[i])) {
        return false;
      }
    }

    for (let i = 0; i < tags.length - 1; i++) {
      for (let j = i + 1; j < tags.length; j++) {
        if (tags[i].substring(1).toLowerCase() === tags[j].substring(1).toLowerCase()) {
          console.log("same");
          return false;
        }
      }
    }

    return true;
  }
};

const pristine = new Pristine(form);

const isValid = pristine.validate();

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (isValid && checkTags(tags.value)) {
    console.log('OK');
  } else {
    console.log('Not OK');
  }
});
