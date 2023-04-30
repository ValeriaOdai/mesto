import { initialCards, validationConfig } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js"


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
const cardPhotoElement = document.querySelector('.element__photo');
const cardNameInput = document.querySelector('.popup__info_type_place-name');
const cardImageInput = document.querySelector('.popup__info_type_place-link');
const photoInput = document.querySelector('.popup__photo');
const photoCaptionInput = document.querySelector('.popup__caption');
const popupPhotoElement = document.querySelector('.popup_type_photo');
const popupPhotoCloseButton = document.querySelector('.popup__close-button_type_photo');

const validationProfileForm = new FormValidator(validationConfig, profileFormElement)
validationProfileForm.enableValidation();

const validationCardForm = new FormValidator(validationConfig, cardFormElement)
validationCardForm.enableValidation();

initialCards.forEach((item) => {
  const card = new Card(item, '.card-template');
  const cardElement = card.createCard();
  cardsSection.append(cardElement);
})

function renderCard(element) {
  const cardNew = new Card(element, '.card-template')
  const cardElementNew = cardNew.createCard();
  cardsSection.prepend(cardElementNew);
}

function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscKey);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscKey);
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
  validationProfileForm.resetValidation();
};

function openCardsPopup() {
  openPopup(popupCardsElement);
  validationCardForm.resetValidation();
};

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

export { openPopup, photoInput, photoCaptionInput, popupPhotoElement }

