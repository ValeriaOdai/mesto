import "./index.css"

import {
  validationConfig,
  profileEditButton,
  nameInput,
  jobInput,
  cardsAddButton,
  cardNameInput,
  cardLinkInput,
  avatarLinkInput,
  avatarChangeButton
}
  from "../scripts/utils/constants.js";

import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js"
import FormValidator from "../scripts/components/FormValidator.js"
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation";

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

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'b25b72bc-51ef-48ad-9d2c-047b0075abab',
    'Content-Type': 'application/json'
  }
})

let userId = null;

Promise.all([
  api.receiveUserInfo(),
  api.receiveCardsInfo()
])
.then(([info, initialCards]) => {
  userInfo.setUserInfo(info);
  userInfo.setAvatar(info);
  userId = info._id
  initialCards.forEach((data) => {
    section.addItem(addCard(data));
})
})
.catch((err) => {
  console.log(err);
})

function addCard(item) {
  const card = new Card(
    item,
    '.card-template',
    handleCardClick,
    (id) => {
      api.likeCard(id)
        .then((data) => {
          card.handleCardLike(data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    (id) => {
      api.deleteLike(id)
        .then((data) => {
          card.handleCardLike(data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    (card, cardId) => {
      popupDeleteConfirmation.openPopup(card, cardId);
      console.log('кард ---->', card);
      console.log('карда айди ---->', cardId)
    },
    userId)
  const cardElement = card.createCard();
  return cardElement
}

const popupDeleteConfirmation = new PopupWithConfirmation('.popup_type_confirm-delete', handleCardDelete);

function handleCardDelete (element, elementId) {
  api.deleteCard(elementId)
    .then(() => {
      element.deleteCardElement();
      popupDeleteConfirmation.closePopup();
    })
    .catch((err) => {
      console.log(err);
    });
}

popupDeleteConfirmation.setEventListeners();

const section = new Section(renderCards,'.elements')

function renderCards(cardList) {
  section.addItem(addCard(cardList))
}

const userInfo = new UserInfo('.profile__name', '.profile__subtitle', '.profile__avatar');

const popupWithImage = new PopupWithImage('.popup_type_photo');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.openPopup(name, link);
}

const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileSubmit);

function handleProfileSubmit() {
  profilePopup.renderLoading(true)
  api.editProfileInfo({
    name: nameInput.value,
    about: jobInput.value
  }).then((data) => {
    userInfo.setUserInfo(data);
    profilePopup.closePopup();
  }).catch((err) => {
    console.log(err);
  })
    .finally(() => {
      profilePopup.renderLoading(false);
      ;
    })
}

profilePopup.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userInfo;
  formValidators['EditProfileForm'].resetValidation();
  profilePopup.openPopup();
})

const cardPopup = new PopupWithForm('.popup_type_card', handleCardSubmit)

function handleCardSubmit() {
  cardPopup.renderLoading(true)
  api.createNewCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  }).then((data) => {
    section.addItem(addCard(data));
    cardPopup.closePopup();
  }).catch((err) => {
    console.log(err);
  })
    .finally(() => {
      cardPopup.renderLoading(false)
    })
}

cardPopup.setEventListeners();

cardsAddButton.addEventListener('click', () => {
  formValidators['AddCardForm'].resetValidation();
  cardPopup.openPopup();
});

const avatarPopup = new PopupWithForm('.popup_type_avatar', handleAvatarSubmit)

function handleAvatarSubmit() {
  avatarPopup.renderLoading(true)
  api.changeAvatar({
    avatar: avatarLinkInput.value
  }).then((data) => {
    userInfo.setAvatar(data);
    avatarPopup.closePopup
  }).catch((err) => {
    console.log(err);
  })
    .finally(() => {
      avatarPopup.renderLoading(false)
    })
}
avatarPopup.setEventListeners();

avatarChangeButton.addEventListener('click', () => {
  formValidators['ChangeAvatarForm'].resetValidation();
  avatarPopup.openPopup();
})