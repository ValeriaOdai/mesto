export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers.authorization;
  }

  receiveUserInfo() {
    return fetch(`https://${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleResponse);
  }

  receiveCardsInfo() {
    return fetch(`https://mesto.${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleResponse);
  }

  ////НОВАЯ ЧАСТЬ

  deleteCard(cardId) {
    return fetch(`https://mesto.${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
      .then(this._handleResponse);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}