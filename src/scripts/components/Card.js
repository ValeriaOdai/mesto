export default class Card {
  constructor(data, templateSelector, handleCardClick, handleCardDelete) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick
    this._id = data._id;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // showDeleteButton() {
  //   if (this._userId === this._id) {
  //     this._element.classList.add('element__delete-button');
  //   } else {
  //     this._element.classList.remove('element__delete-button');
  //   }
  // }

  _handleCardLike() {
    this._likeIconElement.classList.toggle('element__like-icon_status_on');
  }

  deleteCardElement() {
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
      this._handleCardDelete(this._id);
    })
  }
 
  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__name').textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;

    return this._element;
  }

}

