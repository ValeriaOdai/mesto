const popupSection = document.querySelector('.popup')
const profileEditButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup_type_profile');
const cardsAddButton = document.querySelector('.profile__add-button');
const popupCardsElement = document.querySelector('.popup_type_card');
const popupCloseButton = popupElement.querySelector('.popup__close-button_type_profile');
const popupCardsCloseButton = popupCardsElement.querySelector('.popup__close-button_type_cards');
const popupSubmitButton = popupElement.querySelector('.popup__submit');
let formElement = document.querySelector('.popup__content_type_profile');
let formCardElement = document.querySelector('.popup__content_type_card');
let nameInput = formElement.querySelector('.popup__info_type_name');
let jobInput = formElement.querySelector('.popup__info_type_occupation');
let profileNameValue = document.querySelector('.profile__name');
let profileSubtitleValue = document.querySelector('.profile__subtitle')
const cardsSection = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
let cardNameInput = document.querySelector('.popup__info_type_place-name');
let cardImageInput = document.querySelector('.popup__info_type_place-link');
const photoInput = document.querySelector('.popup__photo');
const photoCaptionInput = document.querySelector('.popup__caption');
const popupPhotoElement = document.querySelector('.popup_type_photo');
const popupPhotoCloseButton = document.querySelector('.popup__close-button_type_photo');


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

function createCard(data) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__name').textContent = data.name;
  cardElement.querySelector('.element__photo').src = data.link;
  cardElement.querySelector('.element__photo').alt = data.name;
  setEventListeners(cardElement);
  cardElement.querySelector('.element__photo').addEventListener('click', () => handleCardExpand(data));
  return cardElement;
};

function renderCard(item) {
  const cardElement = createCard(item);
  cardsSection.prepend(cardElement);
}

initialCards.forEach(function (item) {
  const card = createCard(item);
  cardsSection.append(card);
});


function openProfilePopup() {
  nameInput.value = profileNameValue.textContent;
  jobInput.value = profileSubtitleValue.textContent;
  popupElement.classList.add('popup_opened');
}

function openCardsPopup() {
  popupCardsElement.classList.add('popup_opened');
}

function openPhotoPopup() {
  popupPhotoElement.classList.add('popup_opened');
}

function closeProfilePopup() {
  popupElement.classList.remove('popup_opened');
}

function closeCardsPopup() {
  popupCardsElement.classList.remove('popup_opened');
}

function closePhotoPopup() {
  popupPhotoElement.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameValue.textContent = nameInput.value;
  profileSubtitleValue.textContent = jobInput.value;
  closeProfilePopup();
}

function handleCardExpand(data) {
  photoInput.src = data.link;
  photoCaptionInput.textContent = data.name;
  openPhotoPopup();
}

function handleCardsFormSubmit(evt) {
  evt.preventDefault();
  const item = { name: cardNameInput.value, link: cardImageInput.value };
  renderCard(item);
  closeCardsPopup();
  evt.target.reset();
}

function setEventListeners(cardElement) {
  cardElement.querySelector('.element__delete-button').addEventListener('click', handleCardDelete);
  cardElement.querySelector('.element__like-icon').addEventListener('click', handleCardLike);
}

function handleCardDelete(event) {
  event.target.closest('.element').remove();
}

function handleCardLike(event) {
  event.target.closest('.element__like-icon').classList.toggle('element__like-icon_status_on');
}


profileEditButton.addEventListener('click', openProfilePopup);
formElement.addEventListener('submit', handleProfileFormSubmit);
popupCloseButton.addEventListener('click', closeProfilePopup);


cardsAddButton.addEventListener('click', openCardsPopup);
formCardElement.addEventListener('submit', handleCardsFormSubmit);
popupCardsCloseButton.addEventListener('click', closeCardsPopup);

popupPhotoCloseButton.addEventListener('click', closePhotoPopup);





















