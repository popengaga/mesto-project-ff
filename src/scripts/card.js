const cardTemplate = document.querySelector('#card-template');


function createCard(cardData, deleteCardFunction, likeCardFunction, openFullImageFunction ) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.description;
  cardTitle.textContent = cardData.name;
  

  cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {
    deleteCardFunction(evt);
  });
  

  cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
    likeCardFunction(evt);
  });


  cardImage.addEventListener('click', () => {
    openFullImageFunction(cardImage.src, cardImage.alt, cardTitle.textContent);
  });


  return cardElement;
};

const likeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};


const deleteCard = (evt) => {
  const parent = evt.target.closest('.card');
  parent.remove();
};

const renderCard = (
  item,
  container,
  likeCard,
  deleteCard,
  openFullImageFunction,
  place = 'end',
) => {
  const cardElement = createCard(item, deleteCard, likeCard, openFullImageFunction);
  if (place === 'end') {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
};



export { renderCard, likeCard, deleteCard };