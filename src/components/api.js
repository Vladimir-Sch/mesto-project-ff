const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-37",
  headers: {
  authorization: "72d3334a-9eda-428f-8943-f2c882aca294",
  "Content-Type": "application/json"
  }
};

function checkResponse(res) {
  if(res.ok) {
      return res.json();
  }
      return Promise.reject(`Ошибка: ${res.status}`);
}

function getUserInfo() { 
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
})
  .then((res) => checkResponse(res))
}

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
})
  .then((res) => checkResponse(res))
}

function updateUserInfo(newName, about) {
  return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
          name: newName,
          about: about
      })
  })
  .then((res) => checkResponse(res))
}

function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, { 
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
          name: name,
          link: link
      })
  }).then((res) => checkResponse(res))
}

function deleteNewCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers
  })
  .then((res) => checkResponse(res))
}

function toggleLike (cardId, isLiked) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? "PUT" : "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res))
};

function updateAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
          avatar: avatar
      })
  })
  .then((res) => checkResponse(res))
};

export {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  deleteNewCard,
  toggleLike,
  updateAvatar
};