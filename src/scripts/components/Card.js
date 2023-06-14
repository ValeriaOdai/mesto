export default class Card {
  constructor(data, templateSelector, handleCardClick, handleLike, handleRemoveLike, openPopupWithConfirmation, userId) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick
    this._id = data._id;
    this._handleLike = handleLike;
    this._handleRemoveLike = handleRemoveLike;
    this._likes = data.likes;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._openPopupWithConfirmation = openPopupWithConfirmation;
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
    this._likeIconElement = this._element.querySelector('.element__like-icon');
    this._likesNumber = this._element.querySelector('.element__like-number');
    this._likesNumber.textContent = this._likes.length;
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this.isLiked();
    this.showDeleteButton();
    this._setEventListeners();

    this._element.querySelector('.element__name').textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;

    return this._element;
  }

  showDeleteButton() {
    if (this._ownerId === this._userId) {
      this._deleteButton.style.display = 'block'
    } else {
      this._deleteButton.style.display = 'none'
    }
  }

  isLiked() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._likeIconElement.classList.add('element__like-icon_status_on')
      }
    })
  }

  handleCardLike(data) {
    this._likes = data.likes;
    this._likesNumber.textContent = this._likes.length;
    this._likeIconElement.classList.toggle('element__like-icon_status_on');
  }

  deleteCardElement() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardPhoto = this._element.querySelector('.element__photo');

    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })

    this._likeIconElement.addEventListener('click', () => {
      if (this._likeIconElement.classList.contains('element__like-icon_status_on')) {
        this._handleRemoveLike(this._id)
      } else {
        this._handleLike(this._id)
      }
    });

    this._deleteButton.addEventListener('click', () => {
      this._openPopupWithConfirmation(this._element, this._id);
    })
  }

}

