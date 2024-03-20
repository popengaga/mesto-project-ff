
import './pages/index.css';
import {renderCard, likeCard, deleteCard  } from './scripts/card';
import {openPopup, closePopup, closeOverlay} from './scripts/modal';
import { clearValidation, enableValidation } from './scripts/validation';
import { getInitialInfo, postNewCard, updateUserProfile, updateUserAvatar } from './scripts/api';

const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarForm = document.forms['edit-avatar'];
const avatarEditButton = document.querySelector('.profile__image-container');
const profileAvatar = document.querySelector('.profile__image');
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


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};


const fillProfileInfo = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
};

const renderInitialCards = (initialCards, userInfo) => {
  initialCards.forEach((card) => {
    renderCard(
      card,
      userInfo,
      placesList,
      likeCard,
      deleteCard,
      openImagePopup,
    );
  });
};

const openImagePopup = (imageURL, imageAlt, title) => {
  popupImage.src = imageURL;
  popupImage.alt = imageAlt;
  popupCaption.textContent = title;
  openPopup(popupImageElement);
};

const renderLoading = (isLoading, button) => {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
};


const handleProfileFormSubmit = async (evt) => {
  evt.preventDefault();
  renderLoading(true, popupProfileForm.querySelector('.popup__button'));
  updateUserProfile({
    name: popupProfileForm.name.value,
    about: popupProfileForm.description.value,
  })
    .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(true, popupProfileForm.querySelector('.popup__button'));
    });
};


const fillProfilePopup = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};


popupImageElement.addEventListener('click', (evt) => {
  closeOverlay(evt);
});


profileEditButton.addEventListener('click', () => {
  clearValidation(popupProfile, validationConfig);
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
  popupNewCardForm.reset();
  clearValidation(popupNewCard, validationConfig);
  openPopup(popupNewCard);
});


popupNewCardForm.addEventListener('submit', async(evt) => {
  evt.preventDefault();
  const name = popupNewCardForm.elements['place-name'].value;
  const link = popupNewCardForm.elements.link.value;
  const userInfo = { name: profileTitle.textContent };
  postNewCard({ name, link })
    .then((newCard) => {
      renderCard(
        newCard,
        userInfo,
        placesList,
        likeCard,
        deleteCard,
        openImagePopup,
        'start',
      );
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    });
});


popupNewCard.addEventListener('click', (evt) => {
  closeOverlay(evt);
});

const handleAvatarFormSubmit = async (evt) => {
  evt.preventDefault();
  renderLoading(true, popupAvatarForm.querySelector('.popup__button'));
  updateUserAvatar(popupAvatarForm.link.value)
    .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
      closePopup(popupAvatar);
      clearValidation(popupAvatarForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupAvatarForm.querySelector('.popup__button'));
    });
};
avatarEditButton.addEventListener('click', (evt) => {
  clearValidation(popupAvatarForm, validationConfig);
  popupAvatarForm.reset();
  openPopup(popupAvatar);
});

popupAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

popupAvatar.addEventListener('click', (evt) => {
  closeOverlay(evt);
});


const closeButtons = document.querySelectorAll('.popup__close');


closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


getInitialInfo()
  .then((result) => {
    const userInfo = result[0];
    const initialCards = result[1];
    fillProfileInfo(userInfo);
    renderInitialCards(initialCards, userInfo);
  })
  .catch((err) => {
    console.log(err);
  });


enableValidation(validationConfig);
