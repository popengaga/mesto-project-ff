const openPopup = (element) => {
  element.classList.add('popup_is-animated');
  setTimeout(() => {
    element.classList.add('popup_is-opened');
  }, 1); 
  document.addEventListener('keydown', closeEsc);
};


const closePopup = (element) => {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
};


const closeEsc = (evt) => {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_is-opened');
    closePopup(currentPopup);
  }
};


const closeOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};


export { openPopup, closePopup, closeOverlay};