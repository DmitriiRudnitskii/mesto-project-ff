export let test = console.log('test');
console.log('API is ready');
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '4ff7d2c7-9861-4749-9278-f343d6181450',
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