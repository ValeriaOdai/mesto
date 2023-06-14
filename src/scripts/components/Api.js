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

  editProfileInfo(info) {
    return fetch(`https://mesto.${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(this._handleResponse);
  }

  createNewCard(info) {
    return fetch(`https://mesto.${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(this._handleResponse);
  }

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

  likeCard(cardId) {
    return fetch(`https://mesto.${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleResponse);
  }

  deleteLike(cardId) {
    return fetch(`https://mesto.${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleResponse);
  }

  changeAvatar(info) {
    return fetch(`https://mesto.${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
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