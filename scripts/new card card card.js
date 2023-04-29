const popupPhotoCloseButton = document.querySelector('.popup__close-button_type_photo');
const popupPhotoElement = document.querySelector('.popup_type_photo');

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate () {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
    }

  createCard () {
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

  _closePhotoPopup() {
    closePopup(popupPhotoElement);
  }

  _setEventListeners () {
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._openPhotoPopup()
    })

    popupPhotoCloseButton.addEventListener ('click', () => {
      this._closePhotoPopup()
    })
  }
}

const cardsSection = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://images.unsplash.com/photo-1627327719562-f1f61e8364fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Владивосток',
    link: 'https://images.unsplash.com/photo-1604371601849-2fe991a86d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1634&q=80'
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1634206813058-44ccf5b33e50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80'
  },
  {
    name: 'Урал',
    link: 'https://images.unsplash.com/photo-1542091607-0545b109d5e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80'
  },
  {
    name: 'Гора Эльбрус',
    link: 'https://images.unsplash.com/photo-1638989420853-a6437f7a0d2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1552735855-557bdba3961a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80'
  }
];

initialCards.forEach((item) => {
  const card = new Card(item, '.card-template');
  const cardElement = card.createCard();
  cardsSection.append(cardElement);
})

function renderCard(element) {
  const cardNew = new Card (element, '.card-template')
  const cardElementNew = cardNew.createCard();
  cardsSection.prepend(cardElementNew);
}