export let test = console.log('test');
console.log('API is ready');
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '4ff7d2c7-9861-4749-9278-f343d6181450',
    'Content-Type': 'application/json'
}
}

export const getUserInfo = () => {
return fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers

}).then(res => res.json())
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(res => res.json())};

export const editUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
  }).then(res => res.json())
};

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then(res => res.json()) 
}
  export const deleteCardRequest = (cardId) => {
    return fetch (`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    }).then(res => res.json())
  }
  export const addLike = (cardId) => {
    return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers

    }).then(res => res.json())
  }

  export const deleteLike = (cardID) => {
    return fetch (`${config.baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: config.headers
    }) .then(res => res.json())
  };