

const cardsAddButton = document.querySelector('.profile__add-button');
const cardFormElement = document.querySelector('.popup__content_type_card');
const popupCardsElement = document.querySelector('.popup_type_card');
const popupCardsCloseButton = popupCardsElement.querySelector('.popup__close-button_type_cards');
const cardsSection = document.querySelector('.elements');


class Card {
  constructor (data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = document.querySelector(templateSelector).content;
  }

  _getTemplate() {
    const cardElement = this._templateSelector.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = this._alt;
   
    return this._element;
  }

  // renderCard(cardData) {
  //   //const card = new Card(element);
  //   const cardElement = createCard(cardData);
  //   cardsSection.prepend(cardElement);
  //   console.log('рендере');
  // }


  _handleCardDelete (event) {
    event.target.closest('.element').remove();
  }

  _handleCardLike(event) {
    const likeIconElement = event.target
    likeIconElement.classList.toggle('element__like-icon_status_on');
  }


  _setEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', this._handleCardDelete);
    this._element.querySelector('.element__like-icon').addEventListener('click', this._handleCardLike);
    cardsAddButton.addEventListener('click', this._openCardsPopup);
    cardFormElement.addEventListener('submit', this.submitCard);
    popupCardsCloseButton.addEventListener('click', this._closeCardsPopup);
  }


  _openCardsPopup () {
    openPopup(popupCardsElement);
    resetValidation(cardFormElement, validationConfig);
  }

  _closeCardsPopup () {
    closePopup(popupCardsElement);
  }

  // submitCard(evt) {
  //   evt.preventDefault();
  //   const card = { name: cardNameInput.value, link: cardImageInput.value };
  //   this._renderCard(card);
  //   closeCardsPopup();
  //   evt.target.reset();
  //   console.log('сабмите');
  // }
}

// initialCards.forEach(function (item) {
//   const card = new Card(item); 
//   const cardElement = card.createCard();
//   cardsSection.append(cardElement);
// });