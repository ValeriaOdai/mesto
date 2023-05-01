export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick
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
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;

    return this._element;
  }

  _handleCardLike() {
    this._likeIconElement.classList.toggle('element__like-icon_status_on');
  }

  _handleCardDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardPhoto = this._element.querySelector('.element__photo');

    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
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
