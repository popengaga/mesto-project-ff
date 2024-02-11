const cardTemplate = document.querySelector('#card-template');

function removeCard(event) {
  const card = event.target.closest('.card');
    if (card) {
      card.remove();
      console.log('Карточка удалена');
    }
}

function createCard(cardData, removeHadler) {
  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.alt;
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeHadler);
  return cardElement
}

const placesList = document.querySelector('.places__list');

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, removeCard);
  placesList.appendChild(cardElement);
});
