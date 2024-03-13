
import './pages/index.css';
import {initialCards} from './scripts/cards';
import {renderCard } from './scripts/card';
import {openPopup, closePopup, closeOverlay} from './scripts/modal';


const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileForm = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardForm = document.forms['new-place'];
const popupImageElement = document.querySelector('.popup_type_image');
const popupImage = popupImageElement.querySelector('.popup__image');
const popupCaption = popupImageElement.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list'); 


const openImagePopup = (imageURL, imageAlt, title) => {
  popupImage.src = imageURL;
  popupImage.alt = imageAlt;
  popupCaption.textContent = title;
  openPopup(popupImageElement);
};


const likeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};


const deleteCard = (evt) => {
  const parent = evt.target.closest('.card');
  parent.remove();
};


const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupProfileForm.name.value;
  profileDescription.textContent = popupProfileForm.description.value;
  closePopup(popupProfile);
};


const fillProfilePopup = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};


popupImageElement.addEventListener('click', (evt) => {
  closeOverlay(evt);
});


profileEditButton.addEventListener('click', () => {
  fillProfilePopup(
    popupProfileForm,
    profileTitle.textContent,
    profileDescription.textContent,
  );
  openPopup(popupProfile);
});


popupProfileForm.addEventListener('submit', handleProfileFormSubmit);


popupProfile.addEventListener('click', (evt) => {
  closeOverlay(evt);
});


newCardButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});


popupNewCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = popupNewCardForm.elements['place-name'].value;
  const link = popupNewCardForm.elements.link.value;
  const description = name;
  const newCard = {
    name,
    link,
    description,
  };
  renderCard(
    newCard,
    placesList,
    likeCard,
    deleteCard,
    openImagePopup,
    'start',
  );
  closePopup(popupNewCard);
  popupNewCardForm.reset();
});


popupNewCard.addEventListener('click', (evt) => {
  closeOverlay(evt);
});


document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    closePopup(evt.target.parentNode.parentNode);
  }
});


initialCards.forEach((card) =>
  renderCard(card, placesList, likeCard, deleteCard, openImagePopup),
);