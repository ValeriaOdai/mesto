import {
  initialCards,
  validationConfig,
  profileEditButton,
  profileFormElement,
  nameInput,
  jobInput,
  cardsAddButton,
  cardFormElement
}
  from "../scripts/utils/constants.js";

import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js"
import FormValidator from "../scripts/components/FormValidator.js"
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

const validationProfileForm = new FormValidator(validationConfig, profileFormElement)
validationProfileForm.enableValidation();

const validationCardForm = new FormValidator(validationConfig, cardFormElement)
validationCardForm.enableValidation();

function addCard(item) {
  const card = new Card(item, '.card-template', handleCardClick);
  const cardElement = card.createCard();
  return cardElement
}

const section = new Section({
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






