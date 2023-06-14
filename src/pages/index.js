import "./index.css"

import {
  validationConfig,
  profileEditButton,
  nameInput,
  jobInput,
  cardsAddButton,
  cardDeleteButton,
  cardNameInput,
  cardLinkInput
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

const api = new Api({
  url: 'nomoreparties.co/v1/cohort-68',
  headers: {
          authorization:'b25b72bc-51ef-48ad-9d2c-047b0075abab',
        }
})

let userId = null;

api.receiveUserInfo().then ((info) => {
  //console.log('userinfo ---->', info)
  userInfo.setUserInfo(info);
  userInfo.setAvatar(info);
  userId = info._id
  //console.log('userId ->>>>', userId)
})
.catch((err) => {
  console.log(err); 
}); 

api.receiveCardsInfo().then ((data) => {
    console.log('cards data====>', data)
    const cardsFromApi = data;
    cardsFromApi.forEach((data) => {
      section.addItem(addCard(data));
  })
  })
  .catch((err) => {
    console.log(err); 
  }); 



// function deleteCardApi (card, cardId) {
//   api.deleteCard(cardId)
//   .then(() => {
//     card.deleteCardElement();
//     popupDeleteConfirmation.closePopup();
//   })
// }





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
  },
  (id) => {
    api.deleteLike(id)
    .then((data) => {
      card.handleCardLike(data)
    })
  },
  (element, elementId) => {
    //popupDeleteConfirmation.setEventListeners(card, cardId)
    popupDeleteConfirmation.openPopup(element, elementId)
  },
  userId)
  const cardElement = card.createCard();
  return cardElement
}

const popupDeleteConfirmation = new PopupWithConfirmation('.popup_type_confirm-delete', (element, elementId) => {
  api.deleteCard(elementId)
  .then(() => {
    element.remove();
  })
})

popupDeleteConfirmation.setEventListeners();

  // (id) => {
  //   api.deleteCard(id)
  //   .then(() => {
  //     card.deleteCardElement();
  //   })
  // },



// function handleCardLike() {
//   const isLiked = card.isLiked()
// }

const section = new Section({
  items: [],
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

const userInfo = new UserInfo('.profile__name', '.profile__subtitle', '.profile__avatar');

const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileSubmit);

function handleProfileSubmit() {
  api.editProfileInfo({
    name: nameInput.value,
    about: jobInput.value
  }).then((data) => {
    console.log('сабмитим профиль', data)
    userInfo.setUserInfo(data);
  }).catch((err) => {
    console.log(err); 
  }); 
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
  api.createNewCard({
    name: cardNameInput.value,
    link: cardLinkInput.value    
  }).then((data) => {
    console.log('карточка и ее дата ->>>>', data);
    section.addItem(addCard(data));
  }).catch((err) => {
    console.log(err); 
  }); 
}

cardPopup.setEventListeners();

cardsAddButton.addEventListener('click', () => {
  formValidators['AddCardForm'].resetValidation();
  cardPopup.openPopup();
});


