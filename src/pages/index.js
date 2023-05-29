import "./index.css"

import {
  initialCards,
  validationConfig,
  profileEditButton,
  nameInput,
  jobInput,
  cardsAddButton,
}
  from "../scripts/utils/constants.js";

import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js"
import FormValidator from "../scripts/components/FormValidator.js"
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { 
  receiveUserInfo,
receiveCardsInfo
 } from "../scripts/utils/api.js"



receiveCardsInfo().then((res) => {
  if (res.ok) {
    return res.json()
  } else {
    //.....
  }
})
.then ((data) => {
  const cardsFromApi = data;
  cardsFromApi.forEach((data) => {
    section.addItem(addCard(data));
})
})

// const validationProfileForm = new FormValidator(validationConfig, profileFormElement)
// validationProfileForm.enableValidation();

// const validationCardForm = new FormValidator(validationConfig, cardFormElement)
// validationCardForm.enableValidation();

const formValidators = {}

// Включение валидации
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

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

receiveUserInfo().then((res) => {
  if (res.ok) {
    return res.json()
  } else {
    //.....
  }
})
.then ((res) => {
 console.log('res >', res);
userInfo.setUserInfo(res);
})


const profilePopup = new PopupWithForm('.popup_type_profile', (data) => {
  userInfo.setUserInfo(data);
});
profilePopup.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userInfo;
  formValidators['EditProfileForm'].resetValidation();
  profilePopup.openPopup();
})

const cardPopup = new PopupWithForm('.popup_type_card', (data) => {
  section.addItem(addCard(data));
  console.log(data);
})
cardPopup.setEventListeners();

cardsAddButton.addEventListener('click', () => {
  formValidators['AddCardForm'].resetValidation();
  cardPopup.openPopup();
});






