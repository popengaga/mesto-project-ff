const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
  headers: {
    authorization: '15e1d291-12dc-45be-a7ab-abfb0ecb8133',
    'Content-Type': 'application/json',
  },
};


const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const getInitialCards = async () => {
  return fetch(config.baseUrl + '/cards', {
    headers: config.headers,
  }).then((res) => checkResponse(res));
};


const getUserInfo = async () => {
  return fetch(config.baseUrl + '/users/me', {
    headers: config.headers,
  }).then((res) => checkResponse(res));
};


const getInitialInfo = async () => {
  return Promise.all([getUserInfo(), getInitialCards()]);
};


const updateUserProfile = async (userProfileData) => {
    return fetch(config.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: userProfileData.name,
        about: userProfileData.about,
      }),
    }).then((res) => checkResponse(res));
  };


const postNewCard = async (cardData) => {
  return fetch(config.baseUrl + '/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then((res) => checkResponse(res));
};


const putLike = async (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then((res) => checkResponse(res));
};


const deleteLike = async (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => checkResponse(res));
};


const deleteCard = async (cardId) => {
  return fetch(config.baseUrl + `/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => checkResponse(res));
};


const updateUserAvatar = async (avatarLink) => {
  return fetch(config.baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => checkResponse(res));
};

export {
  getInitialCards,
  getUserInfo,
  getInitialInfo,
  updateUserProfile,
  postNewCard,
  putLike,
  deleteLike,
  deleteCard,
  updateUserAvatar,
};