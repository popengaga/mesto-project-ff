function removeCard(event) {
  const card = event.target.closest('.card');
    if (card) {
      card.remove();
      console.log('Карточка удалена');
    }
}

function addCard(cardData) {
  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);
  return cardElement
}

const placesList = document.querySelector('.places__list');

initialCards.forEach((cardData) => {
  const cardElement = addCard(cardData);
  placesList.appendChild(cardElement);
});
