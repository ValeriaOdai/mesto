import { initialCards, validationConfig } from "./constants.js";
import Card from "./Card.js";
import Section from "./Section.js"

import FormValidator from "./FormValidator.js"
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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

const cardNameInput = document.querySelector('.popup__info_type_place-name');
const cardImageInput = document.querySelector('.popup__info_type_place-link');
const photoInput = document.querySelector('.popup__photo');
const photoCaptionInput = document.querySelector('.popup__caption');
const popupPhotoElement = document.querySelector('.popup_type_photo');
const popupPhotoCloseButton = document.querySelector('.popup__close-button_type_photo');

const popups = document.querySelectorAll('.popup')

const validationProfileForm = new FormValidator(validationConfig, profileFormElement)
validationProfileForm.enableValidation();

const validationCardForm = new FormValidator(validationConfig, cardFormElement)
validationCardForm.enableValidation();

function addCard(item) {
  const card = new Card(item, '.card-template', handleCardClick);
  const cardElement = card.createCard();
  return cardElement
  }
  
  const section = new Section ({
    items: initialCards, 
    renderer: (item) =>
        section.addItem(addCard(item)),
      }, 
      '.elements');
  section.renderItems();

const popupWithImage = new PopupWithImage('.popup_type_photo');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.openPopup(name, link);
}

const userInfo = new UserInfo('.profile__name', '.profile__subtitle'); 

const profilePopup = new PopupWithForm('.popup_type_profile', (data) => {
  userInfo.setUserInfo(data);
});
profilePopup.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userInfo;
  validationProfileForm.resetValidation();
  profilePopup.openPopup();
})

const cardPopup = new PopupWithForm('.popup_type_card', (data) => {
section.addItem(addCard(data));
console.log(data);
})
cardPopup.setEventListeners();

cardsAddButton.addEventListener('click', () => {
  validationCardForm.resetValidation();
  cardPopup.openPopup();
});






