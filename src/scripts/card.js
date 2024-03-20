import { putLike, deleteLike, deleteCard as deleteCardFromServer } from './api';


const cardTemplate = document.querySelector('#card-template').content;


function createCard(cardData, userInfo, deleteCardFunction, likeCardFunction, openFullImageFunction ) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.description;
  cardTitle.textContent = cardData.name;
  const cardLikeCount = cardElement.querySelector('.card__like-count');

  cardElement.id = cardData._id;
  cardElement.dataset.ownerId = cardData.owner._id;
  
  

  let amountOfLikes = 0;
  cardData.likes.forEach((like) => {
    if (like.name === cardData.owner.name) {
      cardLikeButton.classList.add('card__like-button_is-active');
    }
    amountOfLikes += 1;
  });
  cardLikeCount.textContent = amountOfLikes;

  if (cardData.owner.name === userInfo.name) {
    cardDeleteButton.addEventListener('click', (evt) => {
      deleteCardFunction(evt);
    });
  } else {
    cardDeleteButton.remove();
  }

  cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
    likeCardFunction(evt);
  });


  cardImage.addEventListener('click', () => {
    openFullImageFunction(cardImage.src, cardImage.alt, cardTitle.textContent);
  });


  return cardElement;
};


const likeCard = async (evt) => {
  let currentLikes = evt.target.parentNode.querySelector('.card__like-count');

  if (evt.target.classList.contains('card__like-button_is-active')) {
    deleteLike(evt.target.closest('.card').id)
      .then((updatedCard) => {
        evt.target.classList.remove('card__like-button_is-active');
        currentLikes.textContent = updatedCard.likes.reduce(
          (accum, nextVal) => accum + 1,
          0,
        );
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(evt.target.closest('.card').id)
      .then((updatedCard) => {
        evt.target.classList.add('card__like-button_is-active');
        currentLikes.textContent = updatedCard.likes.reduce(
          (accum, nextVal) => accum + 1,
          0,
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
};


const deleteCard = (evt) => {
  const parent = evt.target.closest('.card');
  deleteCardFromServer(parent.id)
  .then((result) => {
    parent.remove();
  })
  .catch((err) => {
    console.log(err);
  });
};


const renderCard = (
  item,
  userInfo,
  container,
  likeCard,
  deleteCard,
  openFullImageFunction,
  place = 'end',
) => {

  const cardElement = createCard(
    item,
    userInfo,
    deleteCard,
    likeCard,
    openFullImageFunction,
  );
  if (place === 'end') {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
};


export { renderCard, likeCard, deleteCard };