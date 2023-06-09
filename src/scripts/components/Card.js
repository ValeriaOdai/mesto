export default class Card {
  constructor(data, templateSelector, handleCardClick, api, userId) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick
    this._id = data.id;
    this._api = api; 
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
    this._setEventListeners();

    this._element.querySelector('.element__name').textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;

    return this._element;
  }

  showDeleteButton() {
    if (this._userId === this._id) {
      this._element.classList.add('element__delete-button');
    } else {
      this._element.classList.remove('element__delete-button');
    }
  }

  _handleCardLike() {
    this._likeIconElement.classList.toggle('element__like-icon_status_on');
  }

  // _deleteElement() {
  //   if (this._element) {
  //     this._handleCardDelete(this._element);
  //   }
  // }
  _handleCardDelete() {
    if (this._element) {
      this._api.deleteCard(this._id).then(() => {
        console.log('удалено')
        this._element.remove();
      }).catch((err) => {
        console.log(err); 
      })
    }
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
 ///тестовая часть 

}

