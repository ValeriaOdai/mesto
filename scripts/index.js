const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfileElement = document.querySelector('.popup_type_profile');
const popupEditProfileCloseButton = popupEditProfileElement.querySelector('.popup__close-button_type_profile');
const profileFormElement = document.querySelector('.popup__content_type_profile');
const nameInput = profileFormElement.querySelector('.popup__info_type_name');
const jobInput = profileFormElement.querySelector('.popup__info_type_occupation');
const profileNameValue = document.querySelector('.profile__name');
const profileSubtitleValue = document.querySelector('.profile__subtitle');

const cardsAddButton = document.querySelector('.profile__add-button');
const popupCardsElement = document.querySelector('.popup_type_card');
const popupCardsCloseButton = popupCardsElement.querySelector('.popup__close-button_type_cards');

const cardsSection = document.querySelector('.elements');

const cardFormElement = document.querySelector('.popup__content_type_card');
const cardTemplate = document.querySelector('#card-template').content;
const cardNameInput = document.querySelector('.popup__info_type_place-name');
const cardImageInput = document.querySelector('.popup__info_type_place-link');
const photoInput = document.querySelector('.popup__photo');
const photoCaptionInput = document.querySelector('.popup__caption');
const popupPhotoElement = document.querySelector('.popup_type_photo');
const popupPhotoCloseButton = document.querySelector('.popup__close-button_type_photo');


function createCard(data) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardPhotoElement = cardElement.querySelector('.element__photo');
  cardElement.querySelector('.element__name').textContent = data.name;
  cardPhotoElement.src = data.link;
  cardPhotoElement.alt = data.name;
  setEventListeners(cardElement);
  cardPhotoElement.addEventListener('click', () => openPhotoPopup(data));
  return cardElement;
};

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsSection.prepend(cardElement);
}

initialCards.forEach(function (item) {
  const card = createCard(item);
  cardsSection.append(card);
});

function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscKey);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function closePopupByClickOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function openProfilePopup() {
  nameInput.value = profileNameValue.textContent;
  jobInput.value = profileSubtitleValue.textContent;
  openPopup(popupEditProfileElement);
  resetValidation(profileFormElement, validationConfig);
};

function openCardsPopup() {
  openPopup(popupCardsElement);
};

function openPhotoPopup(data) {
  photoInput.src = data.link;
  photoInput.alt = data.name;
  photoCaptionInput.textContent = data.name;
  openPopup(popupPhotoElement);
}

function closeProfilePopup() {
  closePopup(popupEditProfileElement);
}

function closeCardsPopup() {
  closePopup(popupCardsElement);
}

function closePhotoPopup() {
  closePopup(popupPhotoElement);
}

function closePopupByEscKey(evt) {
  if (evt.key === 'Escape') {
    const popupWindow = document.querySelector('.popup_opened');
    closePopup(popupWindow);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameValue.textContent = nameInput.value;
  profileSubtitleValue.textContent = jobInput.value;
  closeProfilePopup();
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
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
popupEditProfileCloseButton.addEventListener('click', closeProfilePopup);
popupEditProfileElement.addEventListener('click', closePopupByClickOnOverlay);

cardsAddButton.addEventListener('click', openCardsPopup);
cardFormElement.addEventListener('submit', handleCardsFormSubmit);
popupCardsCloseButton.addEventListener('click', closeCardsPopup);
popupCardsElement.addEventListener('click', closePopupByClickOnOverlay);

popupPhotoCloseButton.addEventListener('click', closePhotoPopup);
popupPhotoElement.addEventListener('click', closePopupByClickOnOverlay);