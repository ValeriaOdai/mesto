import { openPopup, photoInput, photoCaptionInput, popupPhotoElement } from "./index.js"

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__photo').src = this._link;

    return this._element;
  }

  _openPhotoPopup() {
    photoInput.src = this._link;
    photoInput.alt = this._name;
    photoCaptionInput.textContent = this._name;
    openPopup(popupPhotoElement);
  }

  _handleCardLike() {
    this._likeIconElement.classList.toggle('element__like-icon_status_on');
  }

  _handleCardDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._openPhotoPopup()
    })

    this._likeIconElement = this._element.querySelector('.element__like-icon');
    this._likeIconElement.addEventListener('click', () => {
      this._handleCardLike()
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleCardDelete();
    })

  }
}
