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






const popupWithImage = new PopupWithImage('.popup_type_photo');
popupWithImage.setEventListeners();


const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
profilePopup.setEventListeners();

const userInfo = new UserInfo('.popup__info_type_name', '.popup__info_type_occupation'); 

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo({
    inputName: data.InputName, 
    inputInfo: data.inputInfo});
  console.log('работает')
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
  profilePopup.openPopup();
  validationProfileForm.resetValidation();
}

profileEditButton.addEventListener('click', openProfilePopup);

function fillinOpenedForm({profileName, profileInfo}) {
  nameInput.value = profileName;
  jobInput.value = profileInfo;
}

profileEditButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  fillinOpenedForm ({
    profileName: info.profileName,
    profileInfo: info.profileInfo
  });
});

// function openProfilePopup() {
//   nameInput.value = profileNameValue.textContent;
//   jobInput.value = profileSubtitleValue.textContent;
//   openPopup(popupEditProfileElement);
//   validationProfileForm.resetValidation();
// };



// profileEditButton.addEventListener('click', () => {
//   const { inputName, inputInfo } = userInfo.getUserInfo();
//   profilePopup.setInputValues( { inputName, inputInfo });
//   nameInput.value = profileNameValue.textContent;
//   jobInput.value = profileSubtitleValue.textContent;
//   profilePopup.openPopup();
//   validationProfileForm.resetValidation();
// });

// function handleProfileFormOpen 

// function handleUserFormOpen() {
// profilePopup.setInputValues(userInfo.getUserInfo());
// nameInput.value = profileNameValue.textContent;
// jobInput.value = profileSubtitleValue.textContent;
// profilePopup.openPopup();
// validationProfileForm.resetValidation();
// }





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




// function openPopup(element) {
//   element.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByEscKey);
// };

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEscKey);
// };

// function openProfilePopup() {
//   nameInput.value = profileNameValue.textContent;
//   jobInput.value = profileSubtitleValue.textContent;
//   openPopup(popupEditProfileElement);
//   validationProfileForm.resetValidation();
// };

// function openCardsPopup() {
//   openPopup(popupCardsElement);
//   validationCardForm.resetValidation();
// };

// function closePopupByEscKey(evt) {
//   if (evt.key === 'Escape') {
//     const popupWindow = document.querySelector('.popup_opened');
//     closePopup(popupWindow);
//   }
// }



function handleCardsFormSubmit(evt) {
  evt.preventDefault();
  const item = { name: cardNameInput.value, link: cardImageInput.value };
  cardsSection.prepend(addCard(item));
  closePopup(popupCardsElement);
  evt.target.reset();
}

// function handleCardClick(name, link) {
//   photoInput.src = this._link;
//   photoInput.alt = this._name;
//   photoCaptionInput.textContent = this._name;
//   openPopup(popupPhotoElement);
// }

function handleCardClick(name, link) {
  popupWithImage.openPopup(name, link);
}


//profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// cardsAddButton.addEventListener('click', openCardsPopup);
cardFormElement.addEventListener('submit', handleCardsFormSubmit);

// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopup(popup)
//     }
//     if (evt.target.classList.contains('popup__close-button')) {
//       closePopup(popup)
//     }
//   })
// })