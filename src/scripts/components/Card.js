export default class Card {
  constructor(data, templateSelector, handleCardClick, handleCardDelete, userId, handleLike, handleRemoveLike) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick
    this._id = data._id;
    this._handleCardDelete = handleCardDelete;
    //новое
    this._handleLike = handleLike;
    this._handleRemoveLike = handleRemoveLike;
    this._likes = data.likes;
    this._userId = userId;
    
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
    //новое
    this._likeIconElement = this._element.querySelector('.element__like-icon');
    this._likesNumber = this._element.querySelector('.element__like-number');
    this._likesNumber.textContent = this._likes.length;
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this.isLiked();
    //наверху новое
    this._setEventListeners();

    this._element.querySelector('.element__name').textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;

    return this._element;
  }

  // showDeleteButton() {
  //   if (this._userId === this._id) {
  //     this._element.classList.add('element__delete-button');
  //   } else {
  //     this._element.classList.remove('element__delete-button');
  //   }
  // }

  //делаем кнопку лайк

  isLiked() {
    this._likes.forEach((like) => {
      if (like._id === this._id) {
        this.likeIconElement.classList.add('element__like-icon_status_on')
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
  }

  _setEventListeners() {
    this._cardPhoto = this._element.querySelector('.element__photo');

    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })

    //this._likeIconElement = this._element.querySelector('.element__like-icon');
    this._likeIconElement.addEventListener('click', () => {
      if (this._likeIconElement.classList.contains('element__like-icon_status_on')) {
        this._handleRemoveLike(this._id)
      } else {
        this._handleLike(this._id)
      }
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleCardDelete(this._id);
    })
  }
 
}

